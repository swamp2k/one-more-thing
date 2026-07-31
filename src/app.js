import { GAME_META, INVENTORY, THREADS } from './game-data.js';
import {
  STORAGE_KEY,
  chooseStoryOption,
  completeComparison,
  completeSourceCheck,
  createInitialState,
  getProgress,
  getThreadRows,
  hydrateState,
  inferTraits,
  resolveNode,
  setComparisonPriority,
  sortedComparisonItems,
  toggleSourceReveal,
  visibleFeedItems
} from './engine.js';

const app = document.querySelector('#app');
let state = loadState();

function loadState() {
  try { return hydrateState(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { return createInitialState(); }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function setState(next) {
  state = next;
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function shell(content) {
  return `
    <div class="app-shell">
      <header class="topbar">
        <div><div class="wordmark">ONE MORE THING</div><div class="tagline">${esc(GAME_META.subtitle)}</div></div>
        <button class="icon-button" data-action="open-about" aria-label="About this build">?</button>
      </header>
      <div class="progress-wrap" aria-label="Rabbit hole progress"><div class="progress-bar" style="width:${getProgress(state)}%"></div></div>
      <main class="main-content">${content}</main>
      ${state.activeNode ? '' : nav()}
    </div>`;
}

function nav() {
  const tabs = [['feed','Feed','⌁'],['threads','Threads','≡'],['home','Home','⌂'],['me','You','◌']];
  return `<nav class="bottom-nav" aria-label="Main navigation">${tabs.map(([id,label,icon]) => `
    <button class="nav-button ${state.view === id ? 'active' : ''}" data-view="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>
  `).join('')}</nav>`;
}

function renderFeed() {
  const items = visibleFeedItems(state);
  const welcome = state.history.length === 0
    ? `<section class="hero-card"><div class="kicker">TODAY'S PLAN</div><h1>Check one thing.</h1><p>This should take about thirty seconds.</p></section>`
    : `<section class="section-heading"><div><div class="kicker">YOUR FEED</div><h1>Things that require absolutely no attention.</h1></div><span class="count-pill">${items.length}</span></section>`;
  const cards = items.length ? items.map((item,index) => `
    <button class="feed-card ${index === 0 ? 'featured' : ''}" data-open-node="${item.node}" data-thread="${item.thread}" data-testid="feed-${item.id}">
      <div class="feed-meta"><span>${esc(item.eyebrow)}</span><span>${THREADS[item.thread]?.icon || '·'}</span></div>
      <h2>${esc(item.title)}</h2><p>${esc(item.text)}</p><div class="card-action">Open thread <span>→</span></div>
    </button>`).join('') : `<div class="empty-state"><strong>Nothing urgent.</strong><p>This is probably a software bug.</p></div>`;
  const recent = state.history.slice(-3).reverse();
  return `${welcome}<div class="feed-stack">${cards}</div>${recent.length ? `<section class="history-strip"><div class="kicker">RECENT DAMAGE</div>${recent.map((entry) => `<div class="history-row">${esc(entry.text)}</div>`).join('')}</section>` : ''}`;
}

function renderThreads() {
  const rows = getThreadRows(state);
  return `<section class="section-heading"><div><div class="kicker">RABBIT HOLES</div><h1>Threads</h1></div><span class="count-pill">${rows.filter((row) => row.status !== 'locked').length}</span></section>
    <div class="thread-list">${rows.map((row) => `<div class="thread-row ${row.status === 'locked' ? 'locked' : ''}"><div class="thread-icon">${row.icon}</div><div class="thread-copy"><strong>${esc(row.title)}</strong><span>${row.status === 'locked' ? 'Not yet your problem' : esc(row.status)}</span></div><span class="status-dot ${row.status}"></span></div>`).join('')}</div>`;
}

function renderHome() {
  const items = state.inventory.map((id) => ({ id, ...INVENTORY[id] })).filter((item) => item.label);
  return `<section class="home-scene"><div class="kicker">YOUR HOME</div><h1>A physical save file.</h1><p>Every bad decision eventually needs shelf space.</p>
    <div class="shelf"><div class="shelf-object phone-object"><span>OLD PHONE</span></div><div class="shelf-object box-object"><span>IMPORTANT</span></div><div class="shelf-object router-object"><span>ROUTER</span></div></div></section>
    <section class="inventory-section"><div class="kicker">ACCUMULATED EVIDENCE</div>${items.length ? `<div class="inventory-grid">${items.map((item) => `<article class="inventory-card"><strong>${esc(item.label)}</strong><p>${esc(item.note)}</p></article>`).join('')}</div>` : `<div class="empty-state compact"><strong>The useful junk has not started yet.</strong><p>Give it time.</p></div>`}</section>`;
}

function renderMe() {
  return `<section class="profile-card"><div class="kicker">BASED ON THE EVIDENCE</div><h1>You, apparently.</h1><p>The game is building a model of your priorities from what you actually do, not what you claim to value.</p><div class="trait-list">${inferTraits(state.prefs).map((trait) => `<div class="trait">${esc(trait)}</div>`).join('')}</div></section>
  <section class="profile-actions"><button class="secondary-button" data-action="reset-game">Reset this timeline</button><p class="microcopy">Local save only. No account. No cloud. No one to blame.</p></section>`;
}

function renderStory(node) {
  return `<section class="story-screen" data-testid="story-${node.id}"><button class="back-button" data-action="close-story">← Feed</button><div class="story-location">${esc(node.location)}</div><h1>${esc(node.title)}</h1><div class="story-body">${node.body.map((p) => `<p>${esc(p)}</p>`).join('')}</div><div class="choice-stack">${node.choices.map((choice,index) => `<button class="choice-button" data-story-choice="${index}"><span>${esc(choice.label)}</span><span>→</span></button>`).join('')}</div></section>`;
}

function meter(value) {
  return `<span class="meter" aria-label="${value} of 5">${[1,2,3,4,5].map((n) => `<i class="${n <= value ? 'on' : ''}"></i>`).join('')}</span>`;
}

function renderComparison(node) {
  const selectedPriority = state.comparePriority[node.id] || node.priorities[0].id;
  const items = sortedComparisonItems(node, selectedPriority);
  return `<section class="story-screen compare-screen" data-testid="compare-${node.id}"><button class="back-button" data-action="close-story">← Feed</button><div class="story-location">RESEARCH MODE</div><h1>${esc(node.title)}</h1><p class="compare-intro">${esc(node.intro)}</p>
    <div class="priority-block"><span class="field-label">WHAT MATTERS MOST RIGHT NOW?</span><div class="chip-row">${node.priorities.map((p) => `<button class="chip ${selectedPriority === p.id ? 'selected' : ''}" data-priority="${p.id}">${esc(p.label)}</button>`).join('')}</div></div>
    <div class="comparison-list">${items.map((item,index) => `<article class="comparison-card ${index === 0 ? 'leader' : ''}"><div class="comparison-rank">${index === 0 ? 'CURRENT WINNER' : `#${index + 1}`}</div><h2>${esc(item.name)}</h2><p class="eyebrow-copy">${esc(item.eyebrow)}</p><div class="score-row"><span>${esc(node.priorities.find((p) => p.id === selectedPriority)?.label)}</span>${meter(item.stats[selectedPriority])}</div><ul>${item.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul><p class="comparison-note">${esc(item.note)}</p><button class="select-button" data-compare-choice="${item.id}">Make this the current answer</button></article>`).join('')}</div></section>`;
}

function renderSourceCheck(node) {
  return `<section class="story-screen source-screen" data-testid="source-${node.id}"><button class="back-button" data-action="close-story">← Feed</button><div class="story-location">SOURCE CHECK</div><h1>${esc(node.title)}</h1><p class="compare-intro">${esc(node.intro)}</p><div class="source-list">${node.sources.map((source) => {
    const revealed = state.sourceReveals[`${node.id}:${source.id}`];
    return `<article class="source-card ${revealed ? 'revealed' : ''}"><blockquote>“${esc(source.quote)}”</blockquote><div class="source-author">— ${esc(source.author)}</div>${revealed ? `<div class="source-context">${esc(source.context)}</div>` : ''}<div class="source-actions"><button class="text-button" data-reveal-source="${source.id}">${revealed ? 'Hide context' : 'Who said this?'}</button><button class="select-button" data-source-choice="${source.id}">Trust this source</button></div></article>`;
  }).join('')}</div></section>`;
}

function renderAbout() {
  return `<section class="story-screen about-screen"><button class="back-button" data-action="close-story">← Back</button><div class="story-location">VERTICAL SLICE v${GAME_META.version}</div><h1>One More Thing</h1><div class="story-body"><p>A mobile-first rabbit-hole adventure about curiosity, distraction and the belief that one more comparison will finally settle it.</p><p>This build is intentionally small: one connected chain, three topic domains, persistent choices, source checking, comparisons, inventory and a preference model.</p><p>No AI. No account. No gems. No energy timer. Civilization survives another day.</p></div><button class="choice-button" data-action="close-story"><span>Continue making questionable decisions</span><span>→</span></button></section>`;
}

function render() {
  if (state.activeNode === 'about') { app.innerHTML = shell(renderAbout()); bindEvents(); return; }
  const node = resolveNode(state.activeNode);
  if (node) {
    const content = node.kind === 'compare' ? renderComparison(node) : node.kind === 'source' ? renderSourceCheck(node) : renderStory(node);
    app.innerHTML = shell(content); bindEvents(); return;
  }
  const views = { feed: renderFeed, threads: renderThreads, home: renderHome, me: renderMe };
  app.innerHTML = shell((views[state.view] || renderFeed)()); bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => setState({ ...state, view: button.dataset.view, activeNode: null })));
  document.querySelectorAll('[data-open-node]').forEach((button) => button.addEventListener('click', () => setState({ ...state, activeNode: button.dataset.openNode, unlockedThreads: [...new Set([...state.unlockedThreads, button.dataset.thread].filter(Boolean))] })));
  document.querySelectorAll('[data-story-choice]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(chooseStoryOption(state, node.id, Number(button.dataset.storyChoice))); }));
  document.querySelectorAll('[data-priority]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(setComparisonPriority(state, node.id, button.dataset.priority)); }));
  document.querySelectorAll('[data-compare-choice]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(completeComparison(state, node.id, button.dataset.compareChoice)); }));
  document.querySelectorAll('[data-reveal-source]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(toggleSourceReveal(state, node.id, button.dataset.revealSource)); }));
  document.querySelectorAll('[data-source-choice]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(completeSourceCheck(state, node.id, button.dataset.sourceChoice)); }));
  document.querySelectorAll('[data-action="close-story"]').forEach((button) => button.addEventListener('click', () => setState({ ...state, activeNode: null, view: 'feed' })));
  document.querySelectorAll('[data-action="open-about"]').forEach((button) => button.addEventListener('click', () => setState({ ...state, activeNode: 'about' })));
  document.querySelectorAll('[data-action="reset-game"]').forEach((button) => button.addEventListener('click', () => { if (window.confirm('Erase this timeline and begin again?')) { localStorage.removeItem(STORAGE_KEY); setState(createInitialState()); } }));
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
render();

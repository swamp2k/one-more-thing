import {
  GAME_META,
  INVENTORY,
  PEOPLE,
  STORAGE_KEY,
  THREADS,
  chooseStoryOption,
  completeComparison,
  completeEvidence,
  completeSourceCheck,
  createInitialState,
  getPeopleRows,
  getProgress,
  getThreadRows,
  hydrateState,
  inferTraits,
  resolveNode,
  setComparisonPriority,
  sortedComparisonItems,
  toggleEvidenceReveal,
  toggleSourceReveal,
  visibleFeedItems
} from './runtime.js';
import { ensureOpeningState, visibleOpeningFeedItems } from './opening.js';

const app = document.querySelector('#app');
let state = loadState();
saveState();

function loadState() {
  try { return ensureOpeningState(hydrateState(JSON.parse(localStorage.getItem(STORAGE_KEY)))); }
  catch { return ensureOpeningState(createInitialState()); }
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
  const tabs = [
    ['feed', 'Feed', '⌁'],
    ['threads', 'Threads', '≡'],
    ['people', 'People', '◎'],
    ['home', 'Home', '⌂'],
    ['me', 'You', '◌']
  ];
  return `<nav class="bottom-nav" aria-label="Main navigation">${tabs.map(([id, label, icon]) => `
    <button class="nav-button ${state.view === id ? 'active' : ''}" data-view="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>
  `).join('')}</nav>`;
}

function renderFeed() {
  const items = visibleOpeningFeedItems(state) || visibleFeedItems(state);
  const welcome = state.history.length === 0
    ? `<section class="hero-card"><div class="kicker">TODAY'S PLAN</div><h1>Check one thing.</h1><p>This should take about thirty seconds.</p></section>`
    : `<section class="section-heading"><div><div class="kicker">YOUR FEED</div><h1>Things that require absolutely no attention.</h1></div><span class="count-pill">${items.length}</span></section>`;
  const networkNote = state.peopleFlags?.started && !state.peopleFlags?.completed
    ? `<section class="network-note"><strong>People have started remembering what you said.</strong><span>Favours, promises and competence now have follow-up dates.</span></section>`
    : state.worldFlags?.started && !state.worldFlags?.completed
      ? `<section class="network-note"><strong>Old Threads have started returning.</strong><span>Prices move. Rain happens. Previous owners leave cables behind.</span></section>`
      : state.completedRun && !state.expansionFlags?.completed
        ? `<section class="network-note"><strong>Several unrelated problems are now available.</strong><span>The word “unrelated” is provisional.</span></section>`
        : '';
  const cards = items.length ? items.map((item, index) => `
    <button class="feed-card ${index === 0 ? 'featured' : ''}" data-open-node="${item.node}" data-thread="${item.thread}" data-testid="feed-${item.id}">
      <div class="feed-meta"><span>${esc(item.eyebrow)}</span><span>${THREADS[item.thread]?.icon || '·'}</span></div>
      <h2>${esc(item.title)}</h2><p>${esc(item.text)}</p><div class="card-action">Open thread <span>→</span></div>
    </button>`).join('') : `<div class="empty-state"><strong>Nothing urgent.</strong><p>This is probably a software bug.</p></div>`;
  const recent = state.history.slice(-3).reverse();
  return `${welcome}${networkNote}<div class="feed-stack">${cards}</div>${recent.length ? `<section class="history-strip"><div class="kicker">RECENT DAMAGE</div>${recent.map((entry) => `<div class="history-row">${esc(entry.text)}</div>`).join('')}</section>` : ''}`;
}

function renderThreads() {
  const rows = getThreadRows(state);
  return `<section class="section-heading"><div><div class="kicker">RABBIT HOLES</div><h1>Threads</h1></div><span class="count-pill">${rows.filter((row) => row.status !== 'locked').length}</span></section>
    <div class="thread-list">${rows.map((row) => `<div class="thread-row ${row.status === 'locked' ? 'locked' : ''}"><div class="thread-icon">${row.icon}</div><div class="thread-copy"><strong>${esc(row.title)}</strong><span>${row.status === 'locked' ? 'Not yet your problem' : esc(row.status)}</span></div><span class="status-dot ${row.status}"></span></div>`).join('')}</div>`;
}

function relationshipMeter(score) {
  const normalized = Math.max(0, Math.min(6, score + 2));
  return `<span class="relationship-meter" aria-label="Relationship score ${score}">${[0, 1, 2, 3, 4, 5].map((index) => `<i class="${index < normalized ? 'on' : ''}"></i>`).join('')}</span>`;
}

function renderPeople() {
  const rows = getPeopleRows(state);
  const pending = Object.entries(state.scheduledEvents || {})
    .filter(([id, dueAt]) => !state.completedNodes.includes(id) && Number.isFinite(dueAt))
    .length;
  return `<section class="section-heading"><div><div class="kicker">PEOPLE WHO NOW HAVE CONTEXT</div><h1>People</h1></div><span class="count-pill">${rows.length}</span></section>
    ${rows.length ? `<div class="people-list">${rows.map((person) => `<article class="person-card">
      <div class="person-avatar">${esc(person.initials)}</div>
      <div class="person-main"><div class="person-heading"><div><h2>${esc(person.name)}</h2><span>${esc(person.role)}</span></div><strong>${esc(person.relationship)}</strong></div>
      <p>${esc(person.note)}</p><div class="relationship-row">${relationshipMeter(person.score)}<span>${person.score >= 0 ? '+' : ''}${person.score}</span></div></div>
    </article>`).join('')}</div>` : `<div class="empty-state"><strong>Nobody has implicated themselves yet.</strong><p>This is temporary. The neighbours have tools.</p></div>`}
    <section class="people-summary"><div><strong>${pending}</strong><span>promises or follow-ups pending</span></div><p>A relationship score is not friendship XP. It records trust, warmth, boundaries and whether you actually appeared on Saturday.</p></section>`;
}

function homeObjects() {
  const objects = [
    { when: true, className: 'phone-object', label: 'OLD PHONE' },
    { when: state.inventory.includes('roof-drone-photos'), className: 'photo-object', label: 'ROOF' },
    { when: state.inventory.includes('labelled-soil-kit'), className: 'soil-object', label: 'A / B / C' },
    { when: state.inventory.includes('repair-cafe-token'), className: 'token-object', label: 'HELPER' },
    { when: state.inventory.includes('archive-exhibit-card'), className: 'card-object', label: 'ARCHIVE' },
    { when: state.inventory.includes('community-favour-map'), className: 'map-object', label: 'SATURDAY' }
  ].filter((item) => item.when);
  return objects.slice(-5).map((item) => `<div class="shelf-object ${item.className}"><span>${item.label}</span></div>`).join('');
}

function renderHome() {
  const items = state.inventory.map((id) => ({ id, ...INVENTORY[id] })).filter((item) => item.label);
  return `<section class="home-scene"><div class="kicker">YOUR HOME</div><h1>A physical save file.</h1><p>Every bad decision eventually needs shelf space.</p>
    <div class="shelf">${homeObjects()}</div></section>
    <section class="inventory-section"><div class="kicker">ACCUMULATED EVIDENCE</div>${items.length ? `<div class="inventory-grid">${items.map((item) => `<article class="inventory-card"><strong>${esc(item.label)}</strong><p>${esc(item.note)}</p></article>`).join('')}</div>` : `<div class="empty-state compact"><strong>The useful junk has not started yet.</strong><p>Give it time.</p></div>`}</section>`;
}

function renderMe() {
  return `<section class="profile-card"><div class="kicker">BASED ON THE EVIDENCE</div><h1>You, apparently.</h1><p>The game is building a model of your priorities from what you actually do, not what you claim to value.</p><div class="trait-list">${inferTraits(state.prefs).map((trait) => `<div class="trait">${esc(trait)}</div>`).join('')}</div></section>
  <section class="profile-actions"><button class="secondary-button" data-action="reset-game">Reset this timeline</button><p class="microcopy">Local save only. No account. No cloud. No one to blame.</p></section>`;
}

function renderStory(node) {
  return `<section class="story-screen" data-testid="story-${node.id}"><button class="back-button" data-action="close-story">← Feed</button><div class="story-location">${esc(node.location)}</div><h1>${esc(node.title)}</h1><div class="story-body">${node.body.map((p) => `<p>${esc(p)}</p>`).join('')}</div><div class="choice-stack">${node.choices.map((choice, index) => `<button class="choice-button" data-story-choice="${index}"><span>${esc(choice.label)}</span><span>→</span></button>`).join('')}</div></section>`;
}

function renderConversation(node) {
  return `<section class="story-screen conversation-screen" data-testid="conversation-${node.id}"><button class="back-button" data-action="close-story">← Feed</button><div class="story-location">MESSAGES</div><h1>${esc(node.title)}</h1>
    <div class="message-thread">${node.messages.map((message) => {
      const person = PEOPLE[message.from];
      return `<article class="message-bubble"><div class="message-avatar">${esc(person?.initials || '?')}</div><div><strong>${esc(person?.name || 'Unknown')}</strong><p>${esc(message.text)}</p></div></article>`;
    }).join('')}</div>
    <div class="choice-stack reply-stack">${node.choices.map((choice, index) => `<button class="choice-button" data-story-choice="${index}"><span>${esc(choice.label)}</span><span>↗</span></button>`).join('')}</div>
  </section>`;
}

function meter(value) {
  return `<span class="meter" aria-label="${value} of 5">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= value ? 'on' : ''}"></i>`).join('')}</span>`;
}

function renderComparison(node) {
  const selectedPriority = state.comparePriority[node.id] || node.priorities[0].id;
  const items = sortedComparisonItems(node, selectedPriority);
  return `<section class="story-screen compare-screen" data-testid="compare-${node.id}"><button class="back-button" data-action="close-story">← Feed</button><div class="story-location">RESEARCH MODE</div><h1>${esc(node.title)}</h1><p class="compare-intro">${esc(node.intro)}</p>
    <div class="priority-block"><span class="field-label">WHAT MATTERS MOST RIGHT NOW?</span><div class="chip-row">${node.priorities.map((p) => `<button class="chip ${selectedPriority === p.id ? 'selected' : ''}" data-priority="${p.id}">${esc(p.label)}</button>`).join('')}</div></div>
    <div class="comparison-list">${items.map((item, index) => `<article class="comparison-card ${index === 0 ? 'leader' : ''}"><div class="comparison-rank">${index === 0 ? 'CURRENT WINNER' : `#${index + 1}`}</div><h2>${esc(item.name)}</h2><p class="eyebrow-copy">${esc(item.eyebrow)}</p><div class="score-row"><span>${esc(node.priorities.find((p) => p.id === selectedPriority)?.label)}</span>${meter(item.stats[selectedPriority])}</div><ul>${item.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul><p class="comparison-note">${esc(item.note)}</p><button class="select-button" data-compare-choice="${item.id}">Make this the current answer</button></article>`).join('')}</div></section>`;
}

function renderSourceCheck(node) {
  return `<section class="story-screen source-screen" data-testid="source-${node.id}"><button class="back-button" data-action="close-story">← Feed</button><div class="story-location">SOURCE CHECK</div><h1>${esc(node.title)}</h1><p class="compare-intro">${esc(node.intro)}</p><div class="source-list">${node.sources.map((source) => {
    const revealed = state.sourceReveals[`${node.id}:${source.id}`];
    return `<article class="source-card ${revealed ? 'revealed' : ''}"><blockquote>“${esc(source.quote)}”</blockquote><div class="source-author">— ${esc(source.author)}</div>${revealed ? `<div class="source-context">${esc(source.context)}</div>` : ''}<div class="source-actions"><button class="text-button" data-reveal-source="${source.id}">${revealed ? 'Hide context' : 'Who said this?'}</button><button class="select-button" data-source-choice="${source.id}">Trust this source</button></div></article>`;
  }).join('')}</div></section>`;
}

function renderEvidence(node) {
  const revealed = node.clues.filter((clue) => state.evidenceReveals[`${node.id}:${clue.id}`]).length;
  return `<section class="story-screen evidence-screen" data-testid="evidence-${node.id}"><button class="back-button" data-action="close-story">← Feed</button><div class="story-location">EVIDENCE BOARD</div><h1>${esc(node.title)}</h1><p class="compare-intro">${esc(node.intro)}</p>
    <div class="evidence-count">${revealed}/${node.clues.length} observations inspected</div>
    <div class="clue-grid">${node.clues.map((clue) => {
      const open = state.evidenceReveals[`${node.id}:${clue.id}`];
      return `<button class="clue-card ${open ? 'open' : ''}" data-evidence-clue="${clue.id}"><span class="clue-label">${esc(clue.label)}</span><span class="clue-detail">${open ? esc(clue.detail) : 'Tap to inspect'}</span></button>`;
    }).join('')}</div>
    <div class="hypothesis-block"><span class="field-label">BEST EXPLANATION</span>${node.hypotheses.map((hypothesis) => `<button class="hypothesis-button" data-evidence-choice="${hypothesis.id}"><strong>${esc(hypothesis.label)}</strong></button>`).join('')}</div>
  </section>`;
}

function renderAbout() {
  return `<section class="story-screen about-screen"><button class="back-button" data-action="close-story">← Back</button><div class="story-location">VERTICAL SLICE v${GAME_META.version}</div><h1>One More Thing</h1><div class="story-body"><p>A mobile-first rabbit-hole adventure about curiosity, distraction and the belief that one more comparison will finally settle it.</p><p>Every new timeline begins with one persistent random problem. The world now also contains people who remember answers, schedule follow-ups and adjust how much they trust your future promises.</p><p>v0.4 adds Niels, Maja, Ada and Leif as recurring people with delayed consequences. The underlying stories remain authored and deterministic; no AI is required.</p><p>No account. No gems. No energy timer. Civilization survives another day.</p></div><button class="choice-button" data-action="close-story"><span>Continue making questionable commitments</span><span>→</span></button></section>`;
}

function render() {
  if (state.activeNode === 'about') { app.innerHTML = shell(renderAbout()); bindEvents(); return; }
  const node = resolveNode(state.activeNode);
  if (node) {
    const renderers = {
      compare: renderComparison,
      source: renderSourceCheck,
      evidence: renderEvidence,
      conversation: renderConversation,
      story: renderStory
    };
    app.innerHTML = shell((renderers[node.kind] || renderStory)(node));
    bindEvents();
    return;
  }
  const views = { feed: renderFeed, threads: renderThreads, people: renderPeople, home: renderHome, me: renderMe };
  app.innerHTML = shell((views[state.view] || renderFeed)());
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => setState({ ...state, view: button.dataset.view, activeNode: null })));
  document.querySelectorAll('[data-open-node]').forEach((button) => button.addEventListener('click', () => setState({ ...state, activeNode: button.dataset.openNode, unlockedThreads: [...new Set([...state.unlockedThreads, button.dataset.thread].filter(Boolean))] })));
  document.querySelectorAll('[data-story-choice]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(chooseStoryOption(state, node.id, Number(button.dataset.storyChoice))); }));
  document.querySelectorAll('[data-priority]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(setComparisonPriority(state, node.id, button.dataset.priority)); }));
  document.querySelectorAll('[data-compare-choice]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(completeComparison(state, node.id, button.dataset.compareChoice)); }));
  document.querySelectorAll('[data-reveal-source]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(toggleSourceReveal(state, node.id, button.dataset.revealSource)); }));
  document.querySelectorAll('[data-source-choice]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(completeSourceCheck(state, node.id, button.dataset.sourceChoice)); }));
  document.querySelectorAll('[data-evidence-clue]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(toggleEvidenceReveal(state, node.id, button.dataset.evidenceClue)); }));
  document.querySelectorAll('[data-evidence-choice]').forEach((button) => button.addEventListener('click', () => { const node = resolveNode(state.activeNode); setState(completeEvidence(state, node.id, button.dataset.evidenceChoice)); }));
  document.querySelectorAll('[data-action="close-story"]').forEach((button) => button.addEventListener('click', () => setState({ ...state, activeNode: null, view: 'feed' })));
  document.querySelectorAll('[data-action="open-about"]').forEach((button) => button.addEventListener('click', () => setState({ ...state, activeNode: 'about' })));
  document.querySelectorAll('[data-action="reset-game"]').forEach((button) => button.addEventListener('click', () => {
    if (window.confirm('Erase this timeline and begin again?')) {
      localStorage.removeItem(STORAGE_KEY);
      setState(ensureOpeningState(createInitialState()));
    }
  }));
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
render();

import { COMPARISONS, FEED_ITEMS, GAME_META, SOURCE_CHECKS, STORY_NODES, THREADS } from './game-data.js';

export const STORAGE_KEY = 'one-more-thing-save-v1';

export function createInitialState() {
  return {
    version: 1,
    view: 'feed',
    activeNode: null,
    completedNodes: [],
    unlockedThreads: ['phone'],
    inventory: [],
    prefs: {},
    flags: {},
    history: [],
    comparePriority: {},
    sourceReveals: {},
    completedRun: false,
    startedAt: Date.now()
  };
}

export function hydrateState(raw) {
  const base = createInitialState();
  if (!raw || raw.version !== 1) return base;
  return {
    ...base,
    ...raw,
    prefs: { ...base.prefs, ...(raw.prefs || {}) },
    flags: { ...base.flags, ...(raw.flags || {}) },
    comparePriority: { ...base.comparePriority, ...(raw.comparePriority || {}) },
    sourceReveals: { ...base.sourceReveals, ...(raw.sourceReveals || {}) }
  };
}

export function resolveNode(nodeId) {
  if (!nodeId) return null;
  if (nodeId.startsWith('compare:')) {
    const id = nodeId.split(':')[1];
    return COMPARISONS[id] ? { kind: 'compare', id, ...COMPARISONS[id] } : null;
  }
  if (nodeId.startsWith('source:')) {
    const id = nodeId.split(':')[1];
    return SOURCE_CHECKS[id] ? { kind: 'source', id, ...SOURCE_CHECKS[id] } : null;
  }
  return STORY_NODES[nodeId] ? { kind: 'story', id: nodeId, ...STORY_NODES[nodeId] } : null;
}

export function applyPreference(prefs, delta = {}) {
  const next = { ...prefs };
  for (const [key, amount] of Object.entries(delta)) next[key] = (next[key] || 0) + amount;
  return next;
}

function unique(values) { return [...new Set(values)]; }

export function chooseStoryOption(state, nodeId, optionIndex) {
  const node = STORY_NODES[nodeId];
  if (!node) throw new Error(`Unknown story node: ${nodeId}`);
  const option = node.choices[optionIndex];
  if (!option) throw new Error(`Unknown option ${optionIndex} for ${nodeId}`);

  const flags = { ...state.flags };
  if (node.thread === 'phone') flags.phoneStarted = true;
  if (nodeId.startsWith('ending-')) flags.ending = nodeId;
  const destination = option.next ? resolveNode(option.next) : null;

  return {
    ...state,
    completedNodes: unique([...state.completedNodes, nodeId]),
    unlockedThreads: unique([
      ...state.unlockedThreads,
      ...(option.unlockThreads || []),
      ...(destination?.thread ? [destination.thread] : [])
    ]),
    inventory: unique([...state.inventory, ...(option.inventory || [])]),
    prefs: applyPreference(state.prefs, option.prefs),
    history: option.history ? [...state.history, { at: Date.now(), text: option.history }] : state.history,
    flags,
    completedRun: state.completedRun || Boolean(option.completeRun),
    activeNode: option.close ? null : option.next || null,
    view: option.close ? 'feed' : state.view
  };
}

export function completeComparison(state, comparisonId, itemId) {
  const comparison = COMPARISONS[comparisonId];
  if (!comparison) throw new Error(`Unknown comparison: ${comparisonId}`);
  const item = comparison.items.find((candidate) => candidate.id === itemId);
  if (!item) throw new Error(`Unknown comparison item: ${itemId}`);

  const flags = { ...state.flags };
  if (comparisonId === 'phone') flags.phoneCompared = true;
  if (comparisonId === 'bike') flags.bikeCompared = true;

  const next = comparisonId === 'phone' ? 'phone-after-compare' : 'bike-after-compare';
  const prefKey = state.comparePriority[comparisonId] || comparison.priorities[0].id;

  return {
    ...state,
    flags,
    completedNodes: unique([...state.completedNodes, `compare:${comparisonId}`]),
    prefs: applyPreference(state.prefs, { [prefKey]: 1 }),
    history: [...state.history, { at: Date.now(), text: `Picked ${item.name} as the current comparison winner.` }],
    activeNode: next
  };
}

export function completeSourceCheck(state, checkId, sourceId) {
  const check = SOURCE_CHECKS[checkId];
  if (!check) throw new Error(`Unknown source check: ${checkId}`);
  const source = check.sources.find((candidate) => candidate.id === sourceId);
  if (!source) throw new Error(`Unknown source: ${sourceId}`);

  const best = Math.max(...check.sources.map((candidate) => candidate.reliability));
  const choseBest = source.reliability === best;

  return {
    ...state,
    completedNodes: unique([...state.completedNodes, `source:${checkId}`]),
    prefs: applyPreference(state.prefs, choseBest ? { skepticism: 2, researchDepth: 1 } : { vibes: 1 }),
    history: [...state.history, {
      at: Date.now(),
      text: choseBest ? 'Trusted the source with actual relevant testing.' : 'Trusted a weaker source. Confidence remained impressively high.'
    }],
    activeNode: checkId === 'passenger' ? 'passenger-after-source' : null
  };
}

export function setComparisonPriority(state, comparisonId, priorityId) {
  return { ...state, comparePriority: { ...state.comparePriority, [comparisonId]: priorityId } };
}

export function toggleSourceReveal(state, checkId, sourceId) {
  const key = `${checkId}:${sourceId}`;
  return { ...state, sourceReveals: { ...state.sourceReveals, [key]: !state.sourceReveals[key] } };
}

export function visibleFeedItems(state) { return FEED_ITEMS.filter((item) => item.when(state)); }

export function threadStatus(state, threadId) {
  if (!state.unlockedThreads.includes(threadId)) return 'locked';
  const related = state.completedNodes.filter((id) => {
    if (id === `compare:${threadId}` || id === `source:${threadId}`) return true;
    return STORY_NODES[id]?.thread === threadId;
  });
  const active = resolveNode(state.activeNode);
  if (active?.thread === threadId) return 'active';
  if (related.length > 0) return 'parked';
  return 'new';
}

export function getThreadRows(state) {
  return Object.entries(THREADS).map(([id, thread]) => ({ id, ...thread, status: threadStatus(state, id) }));
}

export function scoreComparisonItem(item, priorityId) { return item.stats[priorityId] ?? 0; }

export function sortedComparisonItems(comparison, priorityId) {
  return [...comparison.items].sort((a, b) => scoreComparisonItem(b, priorityId) - scoreComparisonItem(a, priorityId));
}

export function inferTraits(prefs) {
  const rules = [
    ['researchDepth', 2, 'Can turn “quick check” into methodology'],
    ['sunlight', 2, 'Believes screens should remain visible on Earth'],
    ['passenger', 2, 'Remembers other humans exist'],
    ['skepticism', 2, 'Distrusts reviews with suspiciously clean conclusions'],
    ['cableHoarding', 2, 'Keeper of cables, destroyer of drawer space'],
    ['chaos', 2, 'Introduces volatile topics into stable environments'],
    ['focus', 2, 'Has demonstrated focus under laboratory conditions'],
    ['restraint', 2, 'Capable of not buying things, apparently'],
    ['selfDeception', 2, 'Uses “just looking” as a technical term'],
    ['tinker', 2, 'Will attempt a €7 fix before a €700 purchase'],
    ['character', 2, 'Can be manipulated by satisfying engine noises'],
    ['practical', 2, 'Eventually returns to the original problem']
  ];
  const traits = rules.filter(([key, threshold]) => (prefs[key] || 0) >= threshold).map(([, , label]) => label);
  return traits.length ? traits.slice(0, 5) : ['Insufficient evidence. This will not last.'];
}

export function getProgress(state) {
  const core = ['phone-start', 'compare:phone', 'bike-tip', 'compare:bike', 'pizzeria-arrival', 'bike-inspection', 'final-decision'];
  const done = core.filter((id) => state.completedNodes.includes(id)).length;
  return Math.round((done / core.length) * 100);
}

export function resetState() { return createInitialState(); }

export { GAME_META };

import {
  GAME_META as BASE_GAME_META,
  INVENTORY as BASE_INVENTORY,
  STORY_NODES as BASE_STORY_NODES,
  THREADS as BASE_THREADS
} from './game-data.js';
import {
  STORAGE_KEY,
  chooseStoryOption as chooseBaseStoryOption,
  completeComparison as completeBaseComparison,
  completeSourceCheck,
  createInitialState as createBaseInitialState,
  getProgress as getBaseProgress,
  hydrateState as hydrateBaseState,
  inferTraits as inferBaseTraits,
  resolveNode as resolveBaseNode,
  setComparisonPriority,
  sortedComparisonItems,
  toggleSourceReveal,
  visibleFeedItems as visibleBaseFeedItems
} from './engine.js';
import {
  EVIDENCE_CHECKS,
  EXPANSION_COMPARISONS,
  EXPANSION_FEED_ITEMS,
  EXPANSION_INVENTORY,
  EXPANSION_STORY_NODES,
  EXPANSION_THREADS
} from './expansion-data.js';

export { STORAGE_KEY, completeSourceCheck, setComparisonPriority, sortedComparisonItems, toggleSourceReveal };

export const GAME_META = { ...BASE_GAME_META, version: '0.2.0' };
export const THREADS = { ...BASE_THREADS, ...EXPANSION_THREADS };
export const INVENTORY = { ...BASE_INVENTORY, ...EXPANSION_INVENTORY };

function unique(values) { return [...new Set(values)]; }

function destinationThread(nodeId) {
  return resolveNode(nodeId)?.thread || null;
}

export function createInitialState() {
  return {
    ...createBaseInitialState(),
    evidenceReveals: {},
    evidenceResults: {},
    expansionFlags: { started: false, completed: false }
  };
}

export function hydrateState(raw) {
  const base = hydrateBaseState(raw);
  return {
    ...base,
    evidenceReveals: { ...(raw?.evidenceReveals || {}) },
    evidenceResults: { ...(raw?.evidenceResults || {}) },
    expansionFlags: {
      started: Boolean(raw?.expansionFlags?.started),
      completed: Boolean(raw?.expansionFlags?.completed)
    }
  };
}

export function resolveNode(nodeId) {
  const base = resolveBaseNode(nodeId);
  if (base) return base;
  if (!nodeId) return null;

  if (nodeId.startsWith('compare:')) {
    const id = nodeId.split(':')[1];
    return EXPANSION_COMPARISONS[id] ? { kind: 'compare', id, ...EXPANSION_COMPARISONS[id] } : null;
  }

  if (nodeId.startsWith('evidence:')) {
    const id = nodeId.split(':')[1];
    return EVIDENCE_CHECKS[id] ? { kind: 'evidence', id, ...EVIDENCE_CHECKS[id] } : null;
  }

  return EXPANSION_STORY_NODES[nodeId]
    ? { kind: 'story', id: nodeId, ...EXPANSION_STORY_NODES[nodeId] }
    : null;
}

function applyPreference(prefs, delta = {}) {
  const next = { ...prefs };
  for (const [key, amount] of Object.entries(delta || {})) next[key] = (next[key] || 0) + amount;
  return next;
}

export function chooseStoryOption(state, nodeId, optionIndex) {
  if (BASE_STORY_NODES[nodeId]) return chooseBaseStoryOption(state, nodeId, optionIndex);

  const node = EXPANSION_STORY_NODES[nodeId];
  if (!node) throw new Error(`Unknown story node: ${nodeId}`);
  const option = node.choices[optionIndex];
  if (!option) throw new Error(`Unknown option ${optionIndex} for ${nodeId}`);

  const destination = destinationThread(option.next);
  return {
    ...state,
    completedNodes: unique([...state.completedNodes, nodeId]),
    unlockedThreads: unique([
      ...state.unlockedThreads,
      node.thread,
      ...(option.unlockThreads || []),
      ...(destination ? [destination] : [])
    ]),
    inventory: unique([...state.inventory, ...(option.inventory || [])]),
    prefs: applyPreference(state.prefs, option.prefs),
    history: option.history ? [...state.history, { at: Date.now(), text: option.history }] : state.history,
    expansionFlags: {
      started: true,
      completed: state.expansionFlags?.completed || Boolean(option.completeExpansion)
    },
    activeNode: option.close ? null : option.next || null,
    view: option.close ? 'feed' : state.view
  };
}

export function completeComparison(state, comparisonId, itemId) {
  const comparison = EXPANSION_COMPARISONS[comparisonId];
  if (!comparison) return completeBaseComparison(state, comparisonId, itemId);

  const item = comparison.items.find((candidate) => candidate.id === itemId);
  if (!item) throw new Error(`Unknown comparison item: ${itemId}`);
  const priority = state.comparePriority[comparisonId] || comparison.priorities[0].id;
  const nextThread = destinationThread(comparison.next);

  return {
    ...state,
    completedNodes: unique([...state.completedNodes, `compare:${comparisonId}`]),
    unlockedThreads: unique([...state.unlockedThreads, comparison.thread, ...(nextThread ? [nextThread] : [])]),
    prefs: applyPreference(state.prefs, { [priority]: 1 }),
    history: [...state.history, { at: Date.now(), text: `Picked ${item.name} as the current ${comparisonId} answer.` }],
    flags: { ...state.flags, [`${comparisonId}Compared`]: true },
    expansionFlags: { ...state.expansionFlags, started: true },
    activeNode: comparison.next
  };
}

export function toggleEvidenceReveal(state, checkId, clueId) {
  const key = `${checkId}:${clueId}`;
  return {
    ...state,
    evidenceReveals: { ...state.evidenceReveals, [key]: !state.evidenceReveals[key] },
    expansionFlags: { ...state.expansionFlags, started: true }
  };
}

export function completeEvidence(state, checkId, hypothesisId) {
  const check = EVIDENCE_CHECKS[checkId];
  if (!check) throw new Error(`Unknown evidence check: ${checkId}`);
  const hypothesis = check.hypotheses.find((candidate) => candidate.id === hypothesisId);
  if (!hypothesis) throw new Error(`Unknown hypothesis: ${hypothesisId}`);

  const correct = hypothesisId === check.best;
  const nextThread = destinationThread(check.next);
  const revealedCount = check.clues.filter((clue) => state.evidenceReveals[`${checkId}:${clue.id}`]).length;

  return {
    ...state,
    completedNodes: unique([...state.completedNodes, `evidence:${checkId}`]),
    unlockedThreads: unique([...state.unlockedThreads, check.thread, ...(nextThread ? [nextThread] : [])]),
    prefs: applyPreference(state.prefs, correct
      ? { observation: 2, evidenceBased: 1, researchDepth: revealedCount >= 3 ? 1 : 0 }
      : { vibes: 1, confidence: 1 }),
    history: [...state.history, {
      at: Date.now(),
      text: correct
        ? `Solved the ${checkId} evidence board with an explanation that matched the observations.`
        : `Selected a weaker ${checkId} theory. The world remained annoyingly evidence-based.`
    }],
    evidenceResults: { ...state.evidenceResults, [checkId]: { hypothesisId, correct, revealedCount } },
    expansionFlags: { ...state.expansionFlags, started: true },
    activeNode: check.next
  };
}

export function visibleFeedItems(state) {
  return [
    ...visibleBaseFeedItems(state),
    ...EXPANSION_FEED_ITEMS.filter((item) => item.when(state))
  ];
}

function nodeBelongsToThread(nodeId, threadId) {
  if (nodeId === `compare:${threadId}` || nodeId === `evidence:${threadId}` || nodeId === `source:${threadId}`) return true;
  return BASE_STORY_NODES[nodeId]?.thread === threadId || EXPANSION_STORY_NODES[nodeId]?.thread === threadId;
}

export function threadStatus(state, threadId) {
  if (!state.unlockedThreads.includes(threadId)) return 'locked';
  const active = resolveNode(state.activeNode);
  if (active?.thread === threadId) return 'active';
  if (state.completedNodes.some((id) => nodeBelongsToThread(id, threadId))) return 'parked';
  return 'new';
}

export function getThreadRows(state) {
  return Object.entries(THREADS).map(([id, thread]) => ({ id, ...thread, status: threadStatus(state, id) }));
}

export function inferTraits(prefs) {
  const expansionRules = [
    ['observation', 2, 'Collects evidence before blaming wildlife'],
    ['planning', 2, 'Can turn leisure into programme management'],
    ['crossReference', 2, 'Connects problems that were happier apart'],
    ['evidenceBased', 2, 'Owns measurements and uses them irresponsibly'],
    ['synthesis', 2, 'Can make five rabbit holes share one map'],
    ['experiment', 2, 'Will use household textiles as scientific apparatus'],
    ['gearFirst', 2, 'Prefers buying optics before forming a question'],
    ['curiosity', 3, 'Has never met a closed tab they respected']
  ];
  const expansionTraits = expansionRules
    .filter(([key, threshold]) => (prefs[key] || 0) >= threshold)
    .map(([, , label]) => label);
  const baseTraits = inferBaseTraits(prefs).filter((trait) => !trait.startsWith('Insufficient evidence'));
  const traits = unique([...expansionTraits, ...baseTraits]);
  return traits.length ? traits.slice(0, 6) : ['Insufficient evidence. This will not last.'];
}

export function getProgress(state) {
  if (!state.expansionFlags?.started) return getBaseProgress(state);
  const milestones = [
    'bird-start', 'evidence:bird', 'holiday-start', 'compare:holiday',
    'pc-start', 'compare:pc', 'pool-start', 'compare:pool',
    'lawn-start', 'evidence:lawn', 'localhistory-start', 'network-finale'
  ];
  const done = milestones.filter((id) => state.completedNodes.includes(id)).length;
  return state.expansionFlags.completed ? 100 : Math.round((done / milestones.length) * 100);
}

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
import {
  WORLD_COMPARISONS,
  WORLD_EVIDENCE_CHECKS,
  WORLD_FEED_ITEMS,
  WORLD_INVENTORY,
  WORLD_STORY_NODES,
  WORLD_THREADS
} from './world-data.js';
import {
  PEOPLE,
  PEOPLE_CONVERSATIONS,
  PEOPLE_FEED_ITEMS,
  PEOPLE_INVENTORY
} from './people-data.js';

export { STORAGE_KEY, completeSourceCheck, setComparisonPriority, sortedComparisonItems, toggleSourceReveal };
export { PEOPLE };

export const GAME_META = { ...BASE_GAME_META, version: '0.4.0' };
export const THREADS = { ...BASE_THREADS, ...EXPANSION_THREADS, ...WORLD_THREADS };
export const INVENTORY = {
  ...BASE_INVENTORY,
  ...EXPANSION_INVENTORY,
  ...WORLD_INVENTORY,
  ...PEOPLE_INVENTORY
};

const ALL_COMPARISONS = { ...EXPANSION_COMPARISONS, ...WORLD_COMPARISONS };
const ALL_EVIDENCE = { ...EVIDENCE_CHECKS, ...WORLD_EVIDENCE_CHECKS };
const ALL_STORY_NODES = { ...EXPANSION_STORY_NODES, ...WORLD_STORY_NODES };

function unique(values) { return [...new Set(values)]; }

function destinationThread(nodeId) {
  return resolveNode(nodeId)?.thread || null;
}

function applyPreference(prefs, delta = {}) {
  const next = { ...prefs };
  for (const [key, amount] of Object.entries(delta || {})) next[key] = (next[key] || 0) + amount;
  return next;
}

function applyRelations(relationships, delta = {}) {
  const next = { ...relationships };
  for (const [personId, amount] of Object.entries(delta || {})) {
    next[personId] = (next[personId] || 0) + amount;
  }
  return next;
}

function applySchedules(scheduledEvents, schedules = [], completedCount) {
  const next = { ...scheduledEvents };
  for (const schedule of schedules || []) {
    const delay = Math.max(1, Number(schedule.after) || 1);
    next[schedule.id] = completedCount + delay;
  }
  return next;
}

function hasAnyCompleted(state, nodeIds) {
  return nodeIds.some((id) => state.completedNodes.includes(id));
}

export function createInitialState() {
  return {
    ...createBaseInitialState(),
    evidenceReveals: {},
    evidenceResults: {},
    expansionFlags: { started: false, completed: false },
    worldFlags: { started: false, completed: false },
    peopleFlags: { started: false, completed: false },
    relationships: {},
    metPeople: [],
    scheduledEvents: {}
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
    },
    worldFlags: {
      started: Boolean(raw?.worldFlags?.started),
      completed: Boolean(raw?.worldFlags?.completed)
    },
    peopleFlags: {
      started: Boolean(raw?.peopleFlags?.started),
      completed: Boolean(raw?.peopleFlags?.completed)
    },
    relationships: { ...(raw?.relationships || {}) },
    metPeople: unique(raw?.metPeople || []),
    scheduledEvents: { ...(raw?.scheduledEvents || {}) }
  };
}

export function resolveNode(nodeId) {
  const base = resolveBaseNode(nodeId);
  if (base) return base;
  if (!nodeId) return null;

  if (nodeId.startsWith('compare:')) {
    const id = nodeId.split(':')[1];
    return ALL_COMPARISONS[id] ? { kind: 'compare', id, ...ALL_COMPARISONS[id] } : null;
  }

  if (nodeId.startsWith('evidence:')) {
    const id = nodeId.split(':')[1];
    return ALL_EVIDENCE[id] ? { kind: 'evidence', id, ...ALL_EVIDENCE[id] } : null;
  }

  if (PEOPLE_CONVERSATIONS[nodeId]) {
    return { kind: 'conversation', id: nodeId, ...PEOPLE_CONVERSATIONS[nodeId] };
  }

  return ALL_STORY_NODES[nodeId]
    ? { kind: 'story', id: nodeId, ...ALL_STORY_NODES[nodeId] }
    : null;
}

export function chooseStoryOption(state, nodeId, optionIndex) {
  if (BASE_STORY_NODES[nodeId]) return chooseBaseStoryOption(state, nodeId, optionIndex);

  const peopleNode = PEOPLE_CONVERSATIONS[nodeId];
  const node = peopleNode || ALL_STORY_NODES[nodeId];
  if (!node) throw new Error(`Unknown story node: ${nodeId}`);
  const option = node.choices[optionIndex];
  if (!option) throw new Error(`Unknown option ${optionIndex} for ${nodeId}`);

  const destination = destinationThread(option.next);
  const isExpansionNode = Boolean(EXPANSION_STORY_NODES[nodeId]);
  const isWorldNode = Boolean(WORLD_STORY_NODES[nodeId]);
  const isPeopleNode = Boolean(peopleNode);
  const completedNodes = unique([...state.completedNodes, nodeId]);
  const encounteredPeople = unique([
    ...state.metPeople,
    ...(node.person ? [node.person] : []),
    ...(node.people || []),
    ...(option.meetPeople || [])
  ]);

  return {
    ...state,
    completedNodes,
    unlockedThreads: unique([
      ...state.unlockedThreads,
      node.thread,
      ...(option.unlockThreads || []),
      ...(destination ? [destination] : [])
    ]),
    inventory: unique([...state.inventory, ...(option.inventory || [])]),
    prefs: applyPreference(state.prefs, option.prefs),
    relationships: applyRelations(state.relationships, option.relation),
    metPeople: encounteredPeople,
    scheduledEvents: applySchedules(state.scheduledEvents, option.schedule, completedNodes.length),
    history: option.history ? [...state.history, { at: Date.now(), text: option.history }] : state.history,
    flags: { ...state.flags, ...(option.setFlags || {}) },
    expansionFlags: {
      started: state.expansionFlags?.started || isExpansionNode,
      completed: state.expansionFlags?.completed || Boolean(option.completeExpansion)
    },
    worldFlags: {
      started: state.worldFlags?.started || isWorldNode,
      completed: state.worldFlags?.completed || Boolean(option.completeWorld)
    },
    peopleFlags: {
      started: state.peopleFlags?.started || isPeopleNode,
      completed: state.peopleFlags?.completed || Boolean(option.completePeople)
    },
    activeNode: option.close ? null : option.next || null,
    view: option.close ? 'feed' : state.view
  };
}

export function completeComparison(state, comparisonId, itemId) {
  const comparison = ALL_COMPARISONS[comparisonId];
  if (!comparison) return completeBaseComparison(state, comparisonId, itemId);

  const item = comparison.items.find((candidate) => candidate.id === itemId);
  if (!item) throw new Error(`Unknown comparison item: ${itemId}`);
  const priority = state.comparePriority[comparisonId] || comparison.priorities[0].id;
  const nextThread = destinationThread(comparison.next);
  const isWorldComparison = Boolean(WORLD_COMPARISONS[comparisonId]);

  return {
    ...state,
    completedNodes: unique([...state.completedNodes, `compare:${comparisonId}`]),
    unlockedThreads: unique([...state.unlockedThreads, comparison.thread, ...(nextThread ? [nextThread] : [])]),
    prefs: applyPreference(state.prefs, { [priority]: 1 }),
    history: [...state.history, { at: Date.now(), text: `Picked ${item.name} as the current ${comparisonId} answer.` }],
    flags: { ...state.flags, [`${comparisonId}Compared`]: true },
    expansionFlags: { ...state.expansionFlags, started: state.expansionFlags?.started || !isWorldComparison },
    worldFlags: { ...state.worldFlags, started: state.worldFlags?.started || isWorldComparison },
    activeNode: comparison.next
  };
}

export function toggleEvidenceReveal(state, checkId, clueId) {
  const key = `${checkId}:${clueId}`;
  const isWorldEvidence = Boolean(WORLD_EVIDENCE_CHECKS[checkId]);
  return {
    ...state,
    evidenceReveals: { ...state.evidenceReveals, [key]: !state.evidenceReveals[key] },
    expansionFlags: { ...state.expansionFlags, started: state.expansionFlags?.started || !isWorldEvidence },
    worldFlags: { ...state.worldFlags, started: state.worldFlags?.started || isWorldEvidence }
  };
}

export function completeEvidence(state, checkId, hypothesisId) {
  const check = ALL_EVIDENCE[checkId];
  if (!check) throw new Error(`Unknown evidence check: ${checkId}`);
  const hypothesis = check.hypotheses.find((candidate) => candidate.id === hypothesisId);
  if (!hypothesis) throw new Error(`Unknown hypothesis: ${hypothesisId}`);

  const correct = hypothesisId === check.best;
  const nextThread = destinationThread(check.next);
  const revealedCount = check.clues.filter((clue) => state.evidenceReveals[`${checkId}:${clue.id}`]).length;
  const isWorldEvidence = Boolean(WORLD_EVIDENCE_CHECKS[checkId]);

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
    expansionFlags: { ...state.expansionFlags, started: state.expansionFlags?.started || !isWorldEvidence },
    worldFlags: { ...state.worldFlags, started: state.worldFlags?.started || isWorldEvidence },
    activeNode: check.next
  };
}

function peopleFeedItemVisible(state, item) {
  if (item.id === 'people-coalition-feed' && (state.metPeople?.length || 0) < 4) return false;
  return item.when(state);
}

export function visibleFeedItems(state) {
  return [
    ...visibleBaseFeedItems(state),
    ...EXPANSION_FEED_ITEMS.filter((item) => item.when(state)),
    ...WORLD_FEED_ITEMS.filter((item) => item.when(state)),
    ...PEOPLE_FEED_ITEMS.filter((item) => peopleFeedItemVisible(state, item))
  ];
}

function nodeBelongsToThread(nodeId, threadId) {
  if (nodeId === `compare:${threadId}` || nodeId === `evidence:${threadId}` || nodeId === `source:${threadId}`) return true;
  return BASE_STORY_NODES[nodeId]?.thread === threadId
    || ALL_STORY_NODES[nodeId]?.thread === threadId
    || PEOPLE_CONVERSATIONS[nodeId]?.thread === threadId;
}

export function threadStatus(state, threadId) {
  if (!state.unlockedThreads.includes(threadId)) return 'locked';
  const active = resolveNode(state.activeNode);
  if (active?.thread === threadId) return 'active';

  const hasHistory = state.completedNodes.some((id) => nodeBelongsToThread(id, threadId));
  const hasLiveUpdate = visibleFeedItems(state).some((item) => item.thread === threadId);
  if (hasHistory && hasLiveUpdate) return 'resurfaced';
  if (hasHistory) return 'parked';
  return 'new';
}

export function getThreadRows(state) {
  return Object.entries(THREADS).map(([id, thread]) => ({ id, ...thread, status: threadStatus(state, id) }));
}

function relationshipLabel(score) {
  if (score >= 6) return 'Co-conspirator';
  if (score >= 3) return 'Trusted';
  if (score >= 1) return 'Warm';
  if (score <= -3) return 'Avoiding eye contact';
  if (score <= -1) return 'Cautious';
  return 'Known';
}

export function getPeopleRows(state) {
  return Object.entries(PEOPLE)
    .filter(([id]) => state.metPeople.includes(id))
    .map(([id, person]) => {
      const score = state.relationships[id] || 0;
      return { id, ...person, score, relationship: relationshipLabel(score) };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
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
  const worldRules = [
    ['archival', 2, 'Can turn one old name into municipal archive traffic'],
    ['knobFirst', 2, 'Operates the largest control before reading labels'],
    ['patience', 2, 'Can troubleshoot a sound without replacing the house'],
    ['humility', 1, 'Has survived at least one espionage misdiagnosis'],
    ['procedure', 1, 'Occasionally attempts the administratively correct path']
  ];
  const peopleRules = [
    ['keepsPromises', 2, 'Has been observed arriving after saying they would'],
    ['helpful', 2, 'Will repair someone else’s problem before their own'],
    ['honesty', 2, 'Admits mistakes when receipts make denial inefficient'],
    ['boundaries', 2, 'Can identify where neighbourliness becomes logistics'],
    ['community', 2, 'Has accidentally become part of the local infrastructure'],
    ['coordination', 2, 'Can turn favours into an operating plan']
  ];
  const extraTraits = [...expansionRules, ...worldRules, ...peopleRules]
    .filter(([key, threshold]) => (prefs[key] || 0) >= threshold)
    .map(([, , label]) => label);
  const baseTraits = inferBaseTraits(prefs).filter((trait) => !trait.startsWith('Insufficient evidence'));
  const traits = unique([...extraTraits, ...baseTraits]);
  return traits.length ? traits.slice(0, 6) : ['Insufficient evidence. This will not last.'];
}

export function getProgress(state) {
  if (state.peopleFlags?.started) {
    const milestones = [
      state.completedNodes.includes('niels-ladder'),
      hasAnyCompleted(state, ['niels-roof-photo', 'niels-ladder-return', 'niels-pool-stakes']),
      state.completedNodes.includes('maja-soil'),
      hasAnyCompleted(state, ['maja-soil-kit', 'maja-receipt-verdict']),
      state.completedNodes.includes('ada-receiver'),
      hasAnyCompleted(state, ['ada-repair-saturday', 'ada-remote-diagnosis']),
      state.completedNodes.includes('leif-archive'),
      state.completedNodes.includes('leif-exhibit-opening'),
      state.completedNodes.includes('people-finale')
    ];
    const done = milestones.filter(Boolean).length;
    return state.peopleFlags.completed ? 100 : Math.round((done / milestones.length) * 100);
  }

  if (state.worldFlags?.started) {
    const milestones = [
      'hum-start', 'evidence:hum', 'parcel-start', 'parcel-receiver',
      'radio-notebook', 'compare:weather', 'previous-owner', 'world-finale'
    ];
    const done = milestones.filter((id) => state.completedNodes.includes(id)).length;
    return state.worldFlags.completed ? 100 : Math.round((done / milestones.length) * 100);
  }

  if (!state.expansionFlags?.started) return getBaseProgress(state);
  const milestones = [
    'bird-start', 'evidence:bird', 'holiday-start', 'compare:holiday',
    'pc-start', 'compare:pc', 'pool-start', 'compare:pool',
    'lawn-start', 'evidence:lawn', 'localhistory-start', 'network-finale'
  ];
  const done = milestones.filter((id) => state.completedNodes.includes(id)).length;
  return state.expansionFlags.completed ? 100 : Math.round((done / milestones.length) * 100);
}

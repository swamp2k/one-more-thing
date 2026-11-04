import test from 'node:test';
import assert from 'node:assert/strict';
import {
  chooseStoryOption,
  completeComparison,
  completeEvidence,
  createInitialState,
  getProgress,
  getThreadRows,
  hydrateState,
  resolveNode,
  toggleEvidenceReveal,
  visibleFeedItems
} from '../src/runtime.js';
import {
  EVIDENCE_CHECKS,
  EXPANSION_COMPARISONS,
  EXPANSION_STORY_NODES,
  EXPANSION_THREADS
} from '../src/expansion-data.js';

test('existing version-one saves gain expansion state without losing progress', () => {
  const state = hydrateState({
    version: 1,
    completedRun: true,
    completedNodes: ['phone-start'],
    unlockedThreads: ['phone', 'bike']
  });
  assert.equal(state.completedRun, true);
  assert.equal(state.completedNodes.includes('phone-start'), true);
  assert.equal(state.expansionFlags.started, false);
  assert.deepEqual(state.evidenceReveals, {});
});

test('finishing the original run exposes five new topic entrances', () => {
  const state = createInitialState();
  state.completedRun = true;
  const ids = visibleFeedItems(state).map((item) => item.id);
  for (const id of ['bird-window', 'holiday-tab', 'pc-protest', 'pool-chalk', 'lawn-borders']) {
    assert.equal(ids.includes(id), true, `${id} should be visible`);
  }
});

test('bird evidence board records observations and advances to the crossroad', () => {
  let state = createInitialState();
  state.completedRun = true;
  state = toggleEvidenceReveal(state, 'bird', 'morning');
  state = toggleEvidenceReveal(state, 'bird', 'pause');
  state = completeEvidence(state, 'bird', 'reflection');
  assert.equal(state.evidenceResults.bird.correct, true);
  assert.equal(state.activeNode, 'bird-after-evidence');
  assert.equal(state.unlockedThreads.includes('bird'), true);
});

test('holiday, PC and pool comparisons use the shared comparison engine', () => {
  let state = createInitialState();
  for (const [id, expectedNext] of [
    ['holiday', 'holiday-after-compare'],
    ['pc', 'pc-after-compare'],
    ['pool', 'pool-after-compare']
  ]) {
    const item = EXPANSION_COMPARISONS[id].items[0];
    state = completeComparison(state, id, item.id);
    assert.equal(state.activeNode, expectedNext);
    assert.equal(state.completedNodes.includes(`compare:${id}`), true);
  }
});

test('pool and lawn routes cross into soil and local history', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'pool-after-compare', 0);
  assert.equal(state.activeNode, 'lawn-start');
  state = chooseStoryOption(state, 'lawn-start', 0);
  assert.equal(state.activeNode, 'evidence:lawn');
  state = completeEvidence(state, 'lawn', 'compaction');
  state = chooseStoryOption(state, 'lawn-after-evidence', 0);
  state = chooseStoryOption(state, 'soil-test', 0);
  assert.equal(state.activeNode, 'localhistory-start');
  assert.equal(state.unlockedThreads.includes('localhistory'), true);
});

test('every expansion story destination resolves', () => {
  for (const [nodeId, node] of Object.entries(EXPANSION_STORY_NODES)) {
    for (const choice of node.choices) {
      if (!choice.next) continue;
      assert.ok(resolveNode(choice.next), `${nodeId} points to missing ${choice.next}`);
    }
  }
  for (const [id, comparison] of Object.entries(EXPANSION_COMPARISONS)) {
    assert.ok(resolveNode(comparison.next), `comparison ${id} points to missing ${comparison.next}`);
  }
  for (const [id, check] of Object.entries(EVIDENCE_CHECKS)) {
    assert.ok(resolveNode(check.next), `evidence ${id} points to missing ${check.next}`);
  }
});

test('all expansion threads are represented in the combined thread list', () => {
  const state = createInitialState();
  const ids = getThreadRows(state).map((row) => row.id);
  for (const id of Object.keys(EXPANSION_THREADS)) assert.equal(ids.includes(id), true);
});

test('expansion progress reaches 100 only after the network finale closes', () => {
  let state = createInitialState();
  state.expansionFlags.started = true;
  assert.equal(getProgress(state), 0);
  state = chooseStoryOption(state, 'network-finale', 0);
  state = chooseStoryOption(state, 'ending-expansion', 0);
  assert.equal(state.expansionFlags.completed, true);
  assert.equal(getProgress(state), 100);
});

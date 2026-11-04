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
  threadStatus,
  toggleEvidenceReveal,
  visibleFeedItems
} from '../src/runtime.js';
import {
  WORLD_COMPARISONS,
  WORLD_EVIDENCE_CHECKS,
  WORLD_STORY_NODES,
  WORLD_THREADS
} from '../src/world-data.js';

test('v0.2 saves migrate into world state without losing earlier progress', () => {
  const state = hydrateState({
    version: 1,
    completedRun: true,
    completedNodes: ['ending-expansion'],
    unlockedThreads: ['phone', 'bird'],
    expansionFlags: { started: true, completed: true }
  });
  assert.equal(state.expansionFlags.completed, true);
  assert.equal(state.completedNodes.includes('ending-expansion'), true);
  assert.deepEqual(state.worldFlags, { started: false, completed: false });
});

test('an active expansion exposes the hum and parcel entrances', () => {
  const state = createInitialState();
  state.completedRun = true;
  state.expansionFlags.started = true;
  const ids = visibleFeedItems(state).map((item) => item.id);
  assert.equal(ids.includes('night-hum'), true);
  assert.equal(ids.includes('old-parcel'), true);
});

test('hum evidence identifies the forgotten transformer', () => {
  let state = createInitialState();
  state.expansionFlags.started = true;
  state = toggleEvidenceReveal(state, 'hum', 'wall');
  state = toggleEvidenceReveal(state, 'hum', 'breaker');
  state = toggleEvidenceReveal(state, 'hum', 'touch');
  state = completeEvidence(state, 'hum', 'transformer');
  assert.equal(state.evidenceResults.hum.correct, true);
  assert.equal(state.activeNode, 'hum-after-evidence');
  assert.equal(state.worldFlags.started, true);
});

test('parcel and radio paths converge on weather comparison', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'parcel-start', 0);
  state = chooseStoryOption(state, 'parcel-call-sender', 0);
  state = chooseStoryOption(state, 'parcel-receiver', 0);
  state = chooseStoryOption(state, 'radio-attic', 0);
  state = chooseStoryOption(state, 'radio-notebook', 0);
  assert.equal(state.activeNode, 'compare:weather');
  state = completeComparison(state, 'weather', 'barometer-log');
  assert.equal(state.activeNode, 'weather-after-compare');
  assert.equal(state.completedNodes.includes('compare:weather'), true);
});

test('completed threads become resurfaced when a live consequence appears', () => {
  const state = createInitialState();
  state.completedRun = true;
  state.expansionFlags.started = true;
  state.unlockedThreads.push('bird');
  state.completedNodes.push('bird-start', 'bird-after-evidence');
  assert.equal(threadStatus(state, 'bird'), 'resurfaced');
  assert.equal(visibleFeedItems(state).some((item) => item.id === 'bird-return-feed'), true);
});

test('all world story, comparison and evidence destinations resolve', () => {
  for (const [nodeId, node] of Object.entries(WORLD_STORY_NODES)) {
    for (const choice of node.choices) {
      if (!choice.next) continue;
      assert.ok(resolveNode(choice.next), `${nodeId} points to missing ${choice.next}`);
    }
  }
  for (const [id, comparison] of Object.entries(WORLD_COMPARISONS)) {
    assert.ok(resolveNode(comparison.next), `comparison ${id} points to missing ${comparison.next}`);
  }
  for (const [id, check] of Object.entries(WORLD_EVIDENCE_CHECKS)) {
    assert.ok(resolveNode(check.next), `evidence ${id} points to missing ${check.next}`);
  }
});

test('all world threads appear in the combined thread list', () => {
  const ids = getThreadRows(createInitialState()).map((row) => row.id);
  for (const id of Object.keys(WORLD_THREADS)) assert.equal(ids.includes(id), true);
});

test('world progress reaches 100 when the world-memory ending closes', () => {
  let state = createInitialState();
  state.worldFlags.started = true;
  assert.equal(getProgress(state), 0);
  state = chooseStoryOption(state, 'world-finale', 0);
  state = chooseStoryOption(state, 'ending-world', 0);
  assert.equal(state.worldFlags.completed, true);
  assert.equal(getProgress(state), 100);
});

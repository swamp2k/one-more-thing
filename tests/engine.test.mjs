import test from 'node:test';
import assert from 'node:assert/strict';
import {
  chooseStoryOption,
  completeComparison,
  completeSourceCheck,
  createInitialState,
  getProgress,
  inferTraits,
  resolveNode,
  setComparisonPriority,
  visibleFeedItems
} from '../src/engine.js';
import { STORY_NODES } from '../src/game-data.js';

test('new game starts with one phone feed trigger', () => {
  const state = createInitialState();
  const feed = visibleFeedItems(state);
  assert.equal(feed[0].id, 'phone-itch');
  assert.equal(state.unlockedThreads.includes('phone'), true);
});

test('phone comparison records priority and advances into marketplace branch', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'phone-start', 0);
  state = setComparisonPriority(state, 'phone', 'weight');
  state = completeComparison(state, 'phone', 'vapor-70');
  assert.equal(state.flags.phoneCompared, true);
  assert.equal(state.prefs.weight, 1);
  assert.equal(state.activeNode, 'phone-after-compare');
  state = chooseStoryOption(state, 'phone-after-compare', 0);
  assert.equal(state.unlockedThreads.includes('bike'), true);
  assert.equal(state.activeNode, 'bike-tip');
});

test('best passenger source rewards skepticism and continues the rabbit hole', () => {
  let state = createInitialState();
  state.unlockedThreads.push('passenger');
  state.activeNode = 'source:passenger';
  state = completeSourceCheck(state, 'passenger', 'reviewer');
  assert.equal(state.prefs.skepticism, 2);
  assert.equal(state.activeNode, 'passenger-after-source');
});

test('inventory is deduplicated when the legendary socket is obtained twice', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'socket-drawer', 0);
  state.activeNode = 'socket-drawer';
  state = chooseStoryOption(state, 'socket-drawer', 0);
  assert.equal(state.inventory.filter((item) => item === '10mm-socket').length, 1);
});

test('ending completes the run and leaves useful personality evidence', () => {
  let state = createInitialState();
  state.activeNode = 'final-decision';
  state = chooseStoryOption(state, 'final-decision', 1);
  state = chooseStoryOption(state, 'ending-walk', 0);
  assert.equal(state.completedRun, true);
  assert.ok(inferTraits(state.prefs).some((trait) => trait.includes('not buying')));
});

test('progress is monotonic across core milestones', () => {
  let state = createInitialState();
  const start = getProgress(state);
  state.completedNodes.push('phone-start', 'compare:phone', 'bike-tip');
  assert.ok(getProgress(state) > start);
});

test('every authored story destination resolves', () => {
  for (const [nodeId, node] of Object.entries(STORY_NODES)) {
    for (const choice of node.choices) {
      if (choice.next) assert.ok(resolveNode(choice.next), `${nodeId} points to missing ${choice.next}`);
    }
  }
});

test('mystery cable detour still unlocks the pizzeria thread', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'mystery-cable', 0);
  assert.equal(state.activeNode, 'pizzeria-arrival');
  assert.equal(state.unlockedThreads.includes('pizza'), true);
});

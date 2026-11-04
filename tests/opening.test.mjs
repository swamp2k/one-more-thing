import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState } from '../src/runtime.js';
import {
  OPENING_FEED_IDS,
  ensureOpeningState,
  isPristineTimeline,
  pickOpeningFeedId,
  visibleOpeningFeedItems
} from '../src/opening.js';

test('every opening can be selected deterministically', () => {
  for (let index = 0; index < OPENING_FEED_IDS.length; index += 1) {
    const random = () => (index + 0.5) / OPENING_FEED_IDS.length;
    assert.equal(pickOpeningFeedId(random), OPENING_FEED_IDS[index]);
  }
});

test('a new timeline exposes exactly one randomized opening', () => {
  const state = ensureOpeningState(createInitialState(), () => 0.7);
  const items = visibleOpeningFeedItems(state);

  assert.equal(isPristineTimeline(state), true);
  assert.equal(items.length, 1);
  assert.equal(items[0].id, state.openingFeedId);
  assert.deepEqual(state.unlockedThreads, [items[0].thread]);
});

test('the selected opening survives reload-style hydration', () => {
  const state = ensureOpeningState(createInitialState(), () => 0.01);
  const rerolled = ensureOpeningState(structuredClone(state), () => 0.99);

  assert.equal(rerolled.openingFeedId, state.openingFeedId);
  assert.deepEqual(visibleOpeningFeedItems(rerolled), visibleOpeningFeedItems(state));
});

test('an existing progressed save is never assigned a new opening', () => {
  const state = createInitialState();
  state.completedNodes.push('phone-start');
  const migrated = ensureOpeningState(state, () => 0.99);

  assert.equal(migrated.openingFeedId, undefined);
  assert.equal(visibleOpeningFeedItems(migrated), null);
});

test('invalid random values are safely clamped', () => {
  assert.equal(pickOpeningFeedId(() => Number.NaN), OPENING_FEED_IDS[0]);
  assert.equal(pickOpeningFeedId(() => -5), OPENING_FEED_IDS[0]);
  assert.equal(pickOpeningFeedId(() => 5), OPENING_FEED_IDS.at(-1));
});

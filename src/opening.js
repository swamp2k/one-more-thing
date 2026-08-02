import { FEED_ITEMS } from './game-data.js';
import { EXPANSION_FEED_ITEMS } from './expansion-data.js';
import { WORLD_FEED_ITEMS } from './world-data.js';

export const OPENING_FEED_IDS = [
  'phone-itch',
  'bird-window',
  'holiday-tab',
  'pc-protest',
  'pool-chalk',
  'lawn-borders',
  'night-hum',
  'old-parcel'
];

const ALL_FEED_ITEMS = [
  ...FEED_ITEMS,
  ...EXPANSION_FEED_ITEMS,
  ...WORLD_FEED_ITEMS
];

const OPENING_ITEMS = OPENING_FEED_IDS
  .map((id) => ALL_FEED_ITEMS.find((item) => item.id === id))
  .filter(Boolean);

function normalizedRandom(random) {
  const value = Number(random());
  if (!Number.isFinite(value)) return 0;
  return Math.min(1 - Number.EPSILON, Math.max(0, value));
}

export function pickOpeningFeedId(random = Math.random) {
  const index = Math.floor(normalizedRandom(random) * OPENING_ITEMS.length);
  return OPENING_ITEMS[index]?.id || 'phone-itch';
}

export function isPristineTimeline(state) {
  return Boolean(state)
    && !state.activeNode
    && !state.completedRun
    && !state.expansionFlags?.started
    && !state.worldFlags?.started
    && (state.completedNodes?.length || 0) === 0
    && (state.history?.length || 0) === 0
    && (state.inventory?.length || 0) === 0;
}

export function ensureOpeningState(state, random = Math.random) {
  if (!isPristineTimeline(state) || state.openingFeedId) return state;

  const openingFeedId = pickOpeningFeedId(random);
  const opening = OPENING_ITEMS.find((item) => item.id === openingFeedId);

  return {
    ...state,
    openingFeedId,
    unlockedThreads: opening ? [opening.thread] : state.unlockedThreads
  };
}

export function visibleOpeningFeedItems(state) {
  if (!isPristineTimeline(state) || !state.openingFeedId) return null;
  const opening = OPENING_ITEMS.find((item) => item.id === state.openingFeedId);
  return opening ? [opening] : null;
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FEED_ITEMS,
  STORY_NODES
} from '../src/game-data.js';
import {
  EXPANSION_COMPARISONS,
  EXPANSION_FEED_ITEMS,
  EXPANSION_STORY_NODES,
  EVIDENCE_CHECKS
} from '../src/expansion-data.js';
import {
  WORLD_COMPARISONS,
  WORLD_EVIDENCE_CHECKS,
  WORLD_FEED_ITEMS,
  WORLD_STORY_NODES
} from '../src/world-data.js';
import {
  INVENTORY,
  THREADS,
  resolveNode
} from '../src/runtime.js';

const stories = { ...STORY_NODES, ...EXPANSION_STORY_NODES, ...WORLD_STORY_NODES };
const comparisons = { ...EXPANSION_COMPARISONS, ...WORLD_COMPARISONS };
const evidenceChecks = { ...EVIDENCE_CHECKS, ...WORLD_EVIDENCE_CHECKS };
const feedItems = [...FEED_ITEMS, ...EXPANSION_FEED_ITEMS, ...WORLD_FEED_ITEMS];

test('every feed item points to a real Thread and resolvable node', () => {
  for (const item of feedItems) {
    assert.ok(THREADS[item.thread], `feed ${item.id} references missing Thread ${item.thread}`);
    assert.ok(resolveNode(item.node), `feed ${item.id} points to missing node ${item.node}`);
  }
});

test('every authored reward and explicit Thread unlock exists', () => {
  for (const [nodeId, node] of Object.entries(stories)) {
    assert.ok(THREADS[node.thread], `${nodeId} references missing Thread ${node.thread}`);
    for (const choice of node.choices) {
      for (const itemId of choice.inventory || []) {
        assert.ok(INVENTORY[itemId], `${nodeId} rewards missing inventory item ${itemId}`);
      }
      for (const threadId of choice.unlockThreads || []) {
        assert.ok(THREADS[threadId], `${nodeId} unlocks missing Thread ${threadId}`);
      }
    }
  }
});

test('comparison content has complete priority scores and valid Threads', () => {
  for (const [comparisonId, comparison] of Object.entries(comparisons)) {
    assert.ok(THREADS[comparison.thread], `comparison ${comparisonId} references missing Thread ${comparison.thread}`);
    for (const item of comparison.items) {
      for (const priority of comparison.priorities) {
        assert.equal(typeof item.stats[priority.id], 'number', `${comparisonId}/${item.id} lacks score ${priority.id}`);
      }
    }
  }
});

test('evidence checks have valid Threads, unique clues and a real best hypothesis', () => {
  for (const [checkId, check] of Object.entries(evidenceChecks)) {
    assert.ok(THREADS[check.thread], `evidence ${checkId} references missing Thread ${check.thread}`);
    assert.equal(new Set(check.clues.map((clue) => clue.id)).size, check.clues.length, `${checkId} has duplicate clue ids`);
    assert.equal(new Set(check.hypotheses.map((hypothesis) => hypothesis.id)).size, check.hypotheses.length, `${checkId} has duplicate hypothesis ids`);
    assert.ok(check.hypotheses.some((hypothesis) => hypothesis.id === check.best), `${checkId} best hypothesis does not exist`);
  }
});

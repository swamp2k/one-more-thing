import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PEOPLE,
  chooseStoryOption,
  createInitialState,
  getPeopleRows,
  getProgress,
  hydrateState,
  resolveNode,
  visibleFeedItems
} from '../src/runtime.js';
import {
  PEOPLE_CONVERSATIONS,
  PEOPLE_FEED_ITEMS,
  PEOPLE_INVENTORY
} from '../src/people-data.js';

function addCompleted(state, count, prefix = 'filler') {
  return {
    ...state,
    completedNodes: [
      ...state.completedNodes,
      ...Array.from({ length: count }, (_, index) => `${prefix}-${index}`)
    ]
  };
}

test('v0.3 saves migrate into empty people state without losing progress', () => {
  const state = hydrateState({
    version: 1,
    completedRun: true,
    completedNodes: ['phone-start'],
    unlockedThreads: ['phone', 'bike'],
    worldFlags: { started: true, completed: false }
  });

  assert.equal(state.completedRun, true);
  assert.equal(state.completedNodes.includes('phone-start'), true);
  assert.deepEqual(state.relationships, {});
  assert.deepEqual(state.metPeople, []);
  assert.deepEqual(state.scheduledEvents, {});
  assert.equal(state.peopleFlags.started, false);
});

test('a conversation records relationship, person and a delayed event', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'niels-ladder', 0);

  assert.equal(state.relationships.niels, 2);
  assert.equal(state.metPeople.includes('niels'), true);
  assert.equal(state.peopleFlags.started, true);
  assert.equal(state.scheduledEvents['niels-roof-photo'], 4);
  assert.equal(visibleFeedItems(state).some((item) => item.id === 'niels-roof-photo-feed'), false);

  state = addCompleted(state, 3);
  assert.equal(visibleFeedItems(state).some((item) => item.id === 'niels-roof-photo-feed'), true);
});

test('a promised repair-cafe visit becomes a later consequence', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'ada-receiver', 0);

  assert.equal(state.flags.adaPromise, 'attend');
  assert.equal(state.relationships.ada, 2);
  assert.equal(visibleFeedItems(state).some((item) => item.id === 'ada-repair-saturday-feed'), false);

  state = addCompleted(state, 4, 'other-rabbit-hole');
  assert.equal(visibleFeedItems(state).some((item) => item.id === 'ada-repair-saturday-feed'), true);

  state = chooseStoryOption(state, 'ada-repair-saturday', 2);
  assert.equal(state.flags.adaPromiseKept, false);
  assert.equal(state.relationships.ada, -1);
  assert.equal(state.history.at(-1).text.includes('Saturdays'), true);
});

test('keeping the repair-cafe promise creates reputation and inventory', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'ada-receiver', 0);
  state = addCompleted(state, 4);
  state = chooseStoryOption(state, 'ada-repair-saturday', 0);

  assert.equal(state.flags.adaPromiseKept, true);
  assert.equal(state.relationships.ada, 5);
  assert.equal(state.inventory.includes('repair-cafe-token'), true);
  assert.equal(state.inventory.includes('receiver-service-note'), true);
  assert.equal(state.scheduledEvents['ada-thanks'] > state.completedNodes.length, true);
});

test('people view exposes only encountered people and relationship labels', () => {
  let state = createInitialState();
  state = chooseStoryOption(state, 'niels-ladder', 0);
  state = chooseStoryOption(state, 'maja-soil', 1);

  const rows = getPeopleRows(state);
  assert.deepEqual(rows.map((row) => row.id).sort(), ['maja', 'niels']);
  assert.equal(rows.find((row) => row.id === 'niels').relationship, 'Warm');
  assert.equal(rows.find((row) => row.id === 'maja').relationship, 'Cautious');
});

test('the people coalition waits for all four people and completes v0.4', () => {
  let state = createInitialState();
  state.peopleFlags.started = true;
  state.metPeople = ['niels', 'maja', 'ada'];
  state.completedNodes = ['niels-ladder', 'niels-roof-photo', 'maja-soil', 'ada-receiver'];

  assert.equal(visibleFeedItems(state).some((item) => item.id === 'people-coalition-feed'), false);
  state.metPeople.push('leif');
  assert.equal(visibleFeedItems(state).some((item) => item.id === 'people-coalition-feed'), true);

  state = chooseStoryOption(state, 'people-finale', 0);
  assert.equal(state.peopleFlags.completed, true);
  assert.equal(state.inventory.includes('community-favour-map'), true);
  assert.equal(getProgress(state), 100);
});

test('every people conversation destination and scheduled follow-up resolves', () => {
  const feedByNode = new Map(PEOPLE_FEED_ITEMS.map((item) => [item.node, item]));

  for (const [nodeId, node] of Object.entries(PEOPLE_CONVERSATIONS)) {
    assert.ok(resolveNode(nodeId), `${nodeId} should resolve`);
    for (const personId of [node.person, ...(node.people || [])].filter(Boolean)) {
      assert.ok(PEOPLE[personId], `${nodeId} references missing person ${personId}`);
    }
    for (const choice of node.choices) {
      if (choice.next) assert.ok(resolveNode(choice.next), `${nodeId} points to missing ${choice.next}`);
      for (const itemId of choice.inventory || []) {
        assert.ok(PEOPLE_INVENTORY[itemId], `${nodeId} rewards missing item ${itemId}`);
      }
      for (const personId of Object.keys(choice.relation || {})) {
        assert.ok(PEOPLE[personId], `${nodeId} changes missing person ${personId}`);
      }
      for (const schedule of choice.schedule || []) {
        assert.ok(resolveNode(schedule.id), `${nodeId} schedules missing node ${schedule.id}`);
        assert.ok(feedByNode.has(schedule.id), `${nodeId} schedules ${schedule.id} without a feed item`);
      }
    }
  }
});

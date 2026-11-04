export const PEOPLE = {
  niels: {
    name: 'Niels',
    initials: 'NI',
    role: 'Neighbour, drone owner, supplier of aerial opinions',
    note: 'Capable, helpful and rarely slowed by formal permission.'
  },
  maja: {
    name: 'Maja',
    initials: 'MA',
    role: 'Garden-centre manager and soil realist',
    note: 'Can identify a drainage problem from a photograph of someone else’s shoes.'
  },
  ada: {
    name: 'Ada',
    initials: 'AD',
    role: 'Repair-café organiser and radio technician',
    note: 'Treats broken electronics as witnesses who need time to talk.'
  },
  leif: {
    name: 'Leif',
    initials: 'LE',
    role: 'Local archivist and enthusiastic context provider',
    note: 'Has never answered a historical question without producing a second folder.'
  }
};

export const PEOPLE_INVENTORY = {
  'roof-drone-photos': {
    label: 'Roof drone photos',
    note: 'High resolution evidence that looking upward creates maintenance.'
  },
  'returned-ladder-plus': {
    label: 'Returned ladder plus tape measure',
    note: 'The apology bundle. The tape measure is somehow nicer than yours.'
  },
  'pool-stake-layout': {
    label: 'Drone-aligned pool stakes',
    note: 'A pool plan upgraded from chalk to minor civil engineering.'
  },
  'labelled-soil-kit': {
    label: 'Maja’s labelled soil kit',
    note: 'Three bags, four labels and no permission to call all dirt the same.'
  },
  'repair-cafe-token': {
    label: 'Repair café helper token',
    note: 'Worth one coffee and several future requests for assistance.'
  },
  'receiver-service-note': {
    label: 'Receiver service note',
    note: 'Contains measurements, a hand-drawn capacitor and the phrase “not your thumb.”'
  },
  'archive-exhibit-card': {
    label: 'Local archive exhibit card',
    note: 'Your garden is now documented between cucumbers and municipal drainage.'
  },
  'community-favour-map': {
    label: 'Community favour map',
    note: 'A diagram of who knows what, who owes whom, and why Saturday is no longer empty.'
  }
};

export const PEOPLE_CONVERSATIONS = {
  'niels-ladder': {
    kind: 'conversation',
    thread: 'drone',
    person: 'niels',
    title: 'Niels has borrowed the ladder in the future perfect tense.',
    messages: [
      { from: 'niels', text: 'I may have borrowed your ladder pre-emptively.' },
      { from: 'niels', text: 'The drone found vegetation in your gutter. This is either useful or an invasion of privacy with excellent image quality.' }
    ],
    choices: [
      {
        label: 'Keep it for now. Send the roof photos.',
        close: true,
        relation: { niels: 2 },
        schedule: [{ id: 'niels-roof-photo', after: 3 }],
        setFlags: { nielsLadderAnswer: 'photos' },
        prefs: { collaboration: 1 },
        history: 'Loaned Niels a ladder and received future roof maintenance in return.'
      },
      {
        label: 'Bring it back before it learns your address.',
        close: true,
        relation: { niels: -1 },
        schedule: [{ id: 'niels-ladder-return', after: 2 }],
        setFlags: { nielsLadderAnswer: 'return' },
        prefs: { boundaries: 1 },
        history: 'Established that borrowing should normally occur before possession.'
      },
      {
        label: 'Only if you help stake out the pool properly.',
        close: true,
        relation: { niels: 1 },
        schedule: [{ id: 'niels-pool-stakes', after: 2 }],
        setFlags: { nielsLadderAnswer: 'trade' },
        unlockThreads: ['pool'],
        prefs: { barter: 1 },
        history: 'Converted an unauthorised ladder loan into garden surveying labour.'
      }
    ]
  },
  'niels-roof-photo': {
    kind: 'conversation',
    thread: 'drone',
    person: 'niels',
    title: 'The roof photos contain one unrequested close-up.',
    messages: [
      { from: 'niels', text: 'Gutter is easy. More interesting: the flashing beside the vent is lifting.' },
      { from: 'niels', text: 'Not emergency lifting. The kind that becomes emergency lifting during weather.' }
    ],
    choices: [
      {
        label: 'Mark it and deal with it before the next storm.',
        close: true,
        relation: { niels: 1 },
        inventory: ['roof-drone-photos'],
        prefs: { prevention: 2 },
        history: 'Accepted a roof problem while it was still politely inexpensive.'
      },
      {
        label: 'Add it to the list titled “later, structurally.”',
        close: true,
        relation: { niels: 0 },
        inventory: ['roof-drone-photos'],
        prefs: { strategicDelay: 1 },
        history: 'Filed roof flashing under a technically accurate future tense.'
      }
    ]
  },
  'niels-ladder-return': {
    kind: 'conversation',
    thread: 'drone',
    person: 'niels',
    title: 'The ladder returns with an accessory and remorse.',
    messages: [
      { from: 'niels', text: 'Ladder is back. I included a tape measure as an apology.' },
      { from: 'niels', text: 'It is not a bribe because I already borrowed the thing.' }
    ],
    choices: [
      {
        label: 'Accept the apology bundle.',
        close: true,
        relation: { niels: 1 },
        inventory: ['returned-ladder-plus'],
        prefs: { gracious: 1 },
        history: 'Accepted a calibrated apology from next door.'
      },
      {
        label: 'Return the tape measure. Keep the improved borrowing policy.',
        close: true,
        relation: { niels: 0 },
        prefs: { boundaries: 1 },
        history: 'Declined compensation and retained the new border agreement.'
      }
    ]
  },
  'niels-pool-stakes': {
    kind: 'conversation',
    thread: 'pool',
    person: 'niels',
    title: 'Niels has upgraded the pool outline beyond chalk.',
    messages: [
      { from: 'niels', text: 'I used the drone photo, the old garden map and four stakes.' },
      { from: 'niels', text: 'It is now square enough to cause planning permission anxiety.' }
    ],
    choices: [
      {
        label: 'Keep the layout. This is alarmingly useful.',
        close: true,
        relation: { niels: 2 },
        inventory: ['pool-stake-layout'],
        prefs: { synthesis: 1 },
        history: 'Received a pool layout produced by aerial evidence and neighbour momentum.'
      },
      {
        label: 'Move one stake two centimetres to remain involved.',
        close: true,
        relation: { niels: 1 },
        inventory: ['pool-stake-layout'],
        prefs: { control: 1 },
        history: 'Improved a correct pool plan by becoming visibly responsible for it.'
      }
    ]
  },
  'maja-soil': {
    kind: 'conversation',
    thread: 'lawn',
    person: 'maja',
    title: 'Maja has seen the garden-centre receipt.',
    messages: [
      { from: 'maja', text: 'You bought fertiliser before testing the rectangular dead area, didn’t you?' },
      { from: 'maja', text: 'No judgement. Some judgement. Mostly useful judgement.' }
    ],
    choices: [
      {
        label: 'Yes. The healthy grass is now extremely healthy.',
        close: true,
        relation: { maja: 2 },
        schedule: [{ id: 'maja-soil-kit', after: 3 }],
        setFlags: { majaAnswer: 'honest' },
        prefs: { honesty: 2 },
        history: 'Admitted to improving the lawn’s control group before diagnosing it.'
      },
      {
        label: 'The receipt lacks important emotional context.',
        close: true,
        relation: { maja: -1 },
        schedule: [{ id: 'maja-receipt-verdict', after: 2 }],
        setFlags: { majaAnswer: 'deflect' },
        prefs: { rhetoricalDefense: 1 },
        history: 'Attempted to cross-examine a fertiliser receipt.'
      },
      {
        label: 'Tell me exactly what samples you need.',
        close: true,
        relation: { maja: 1 },
        schedule: [{ id: 'maja-soil-kit', after: 2 }],
        setFlags: { majaAnswer: 'procedure' },
        prefs: { procedure: 1 },
        history: 'Requested a soil procedure before purchasing another alphabet of products.'
      }
    ]
  },
  'maja-soil-kit': {
    kind: 'conversation',
    thread: 'soil',
    person: 'maja',
    title: 'Three labelled bags are waiting by the door.',
    messages: [
      { from: 'maja', text: 'Bag A: healthy lawn. Bag B: rectangle. Bag C: underneath the rectangle.' },
      { from: 'maja', text: 'Do not combine them because “it all came from the garden.” I know how you people think.' }
    ],
    choices: [
      {
        label: 'Take the samples properly.',
        close: true,
        relation: { maja: 2 },
        inventory: ['labelled-soil-kit'],
        unlockThreads: ['soil'],
        prefs: { evidenceBased: 1 },
        history: 'Collected separate soil samples and resisted creating one representative dirt.'
      },
      {
        label: 'Put the bags somewhere safe for a highly specific future.',
        close: true,
        relation: { maja: 0 },
        inventory: ['labelled-soil-kit'],
        prefs: { drawerConfidence: 1 },
        history: 'Stored a soil test beside several other imminent procedures.'
      }
    ]
  },
  'maja-receipt-verdict': {
    kind: 'conversation',
    thread: 'lawn',
    person: 'maja',
    title: 'Maja has reconstructed the purchase from loyalty points.',
    messages: [
      { from: 'maja', text: 'The emotional context appears to be “discount on the second bag.”' },
      { from: 'maja', text: 'I can still help, but the receipt has been admitted into evidence.' }
    ],
    choices: [
      {
        label: 'Fine. Send the sample instructions.',
        close: true,
        relation: { maja: 1 },
        schedule: [{ id: 'maja-soil-kit', after: 1 }],
        prefs: { surrenderToEvidence: 1 },
        history: 'Lost an argument to a loyalty programme and advanced the investigation.'
      },
      {
        label: 'Double down and ask whether points expire.',
        close: true,
        relation: { maja: -1 },
        prefs: { chaos: 1 },
        history: 'Protected the fertiliser decision by changing the subject to loyalty accounting.'
      }
    ]
  },
  'ada-receiver': {
    kind: 'conversation',
    thread: 'radio',
    person: 'ada',
    title: 'Ada has offered the receiver a Saturday appointment.',
    messages: [
      { from: 'ada', text: 'Bring the old receiver to the repair café on Saturday.' },
      { from: 'ada', text: 'You can help at the table while I inspect it. This is how volunteering reproduces.' }
    ],
    choices: [
      {
        label: 'Promise to show up Saturday.',
        close: true,
        relation: { ada: 2 },
        schedule: [{ id: 'ada-repair-saturday', after: 4 }],
        setFlags: { adaPromise: 'attend' },
        prefs: { commitment: 1 },
        history: 'Made a Saturday promise in exchange for diagnostic competence.'
      },
      {
        label: 'Send photos and request remote diagnosis.',
        close: true,
        relation: { ada: 0 },
        schedule: [{ id: 'ada-remote-diagnosis', after: 2 }],
        setFlags: { adaPromise: 'remote' },
        prefs: { convenience: 1 },
        history: 'Requested electronics diagnosis through the medium of optimistic photography.'
      },
      {
        label: 'Decline before acquiring a volunteer shift.',
        close: true,
        relation: { ada: -1 },
        setFlags: { adaPromise: 'declined' },
        prefs: { boundaries: 1 },
        history: 'Protected Saturday from both repair and community.'
      }
    ]
  },
  'ada-repair-saturday': {
    kind: 'conversation',
    thread: 'radio',
    person: 'ada',
    title: 'Saturday has arrived and remembers the promise.',
    messages: [
      { from: 'ada', text: 'We are open. Your receiver has a space on the bench.' },
      { from: 'ada', text: 'Also a teenager’s speaker is making a noise normally associated with maritime distress.' }
    ],
    choices: [
      {
        label: 'Show up and help with the speaker first.',
        close: true,
        relation: { ada: 3 },
        inventory: ['repair-cafe-token', 'receiver-service-note'],
        schedule: [{ id: 'ada-thanks', after: 2 }],
        setFlags: { adaPromiseKept: true },
        prefs: { keepsPromises: 2, helpful: 2 },
        history: 'Kept the repair-café promise and repaired someone else’s problem before your own.'
      },
      {
        label: 'Show up, but guard the receiver bench with purpose.',
        close: true,
        relation: { ada: 1 },
        inventory: ['receiver-service-note'],
        schedule: [{ id: 'ada-thanks', after: 2 }],
        setFlags: { adaPromiseKept: true },
        prefs: { focus: 1 },
        history: 'Kept the appointment while declining spontaneous civic expansion.'
      },
      {
        label: 'Send an apology from the sofa.',
        close: true,
        relation: { ada: -3 },
        setFlags: { adaPromiseKept: false },
        prefs: { avoidance: 1 },
        history: 'Discovered that delayed consequences can occur on Saturdays.'
      }
    ]
  },
  'ada-remote-diagnosis': {
    kind: 'conversation',
    thread: 'radio',
    person: 'ada',
    title: 'Ada has reviewed the photographs.',
    messages: [
      { from: 'ada', text: 'Photo one is mostly your thumb.' },
      { from: 'ada', text: 'Photo two proves the receiver exists. Bring it Saturday if you want the third level of analysis.' }
    ],
    choices: [
      {
        label: 'Accept that remote repair has limits.',
        close: true,
        relation: { ada: 1 },
        schedule: [{ id: 'ada-repair-saturday', after: 2 }],
        setFlags: { adaPromise: 'attend-after-thumb' },
        prefs: { humility: 1 },
        history: 'Upgraded from photographic proof of existence to an actual repair appointment.'
      },
      {
        label: 'Send a third photo with less thumb.',
        close: true,
        relation: { ada: 0 },
        inventory: ['receiver-service-note'],
        prefs: { persistence: 1 },
        history: 'Improved remote diagnostics to include approximately one circuit board.'
      }
    ]
  },
  'ada-thanks': {
    kind: 'conversation',
    thread: 'radio',
    person: 'ada',
    title: 'The repair café has remembered your competence.',
    messages: [
      { from: 'ada', text: 'Thanks for Saturday. The speaker survived and the teenager has stopped shopping for a new one.' },
      { from: 'ada', text: 'I have put you on the list of people who can be asked things. Congratulations and apologies.' }
    ],
    choices: [
      {
        label: 'Accept the dangerous new status.',
        close: true,
        relation: { ada: 1 },
        prefs: { community: 1 },
        history: 'Became locally known as someone who might know how to help.'
      },
      {
        label: 'Clarify that one successful Saturday is not a profession.',
        close: true,
        relation: { ada: 0 },
        prefs: { boundaries: 1 },
        history: 'Issued a disclaimer after competence became discoverable.'
      }
    ]
  },
  'leif-archive': {
    kind: 'conversation',
    thread: 'localhistory',
    person: 'leif',
    title: 'Leif wants to exhibit the garden map.',
    messages: [
      { from: 'leif', text: 'The old greenhouse plan fills a gap in our neighbourhood display.' },
      { from: 'leif', text: 'May we use your overlay? I can remove the current address and most of the accidental pool annotations.' }
    ],
    choices: [
      {
        label: 'Share it, with the address removed.',
        close: true,
        relation: { leif: 2 },
        schedule: [{ id: 'leif-exhibit-opening', after: 4 }],
        setFlags: { leifPermission: 'redacted' },
        prefs: { community: 1, privacy: 1 },
        history: 'Contributed the garden map to local history without contributing the front door.'
      },
      {
        label: 'Share everything. Context fears the timid.',
        close: true,
        relation: { leif: 3 },
        schedule: [{ id: 'leif-exhibit-opening', after: 3 }],
        setFlags: { leifPermission: 'full' },
        prefs: { openness: 2 },
        history: 'Released the complete garden rabbit hole into municipal culture.'
      },
      {
        label: 'Decline. The lawn has suffered enough publicity.',
        close: true,
        relation: { leif: -1 },
        setFlags: { leifPermission: 'declined' },
        prefs: { privacy: 2 },
        history: 'Kept the greenhouse foundation out of the public record’s current edition.'
      }
    ]
  },
  'leif-exhibit-opening': {
    kind: 'conversation',
    thread: 'previousowner',
    person: 'leif',
    title: 'The exhibition has produced a living source.',
    messages: [
      { from: 'leif', text: 'A visitor recognised the call sign and the greenhouse stove.' },
      { from: 'leif', text: 'She says E. Madsen logged weather because ferry captains phoned him before deciding whether to sail.' }
    ],
    choices: [
      {
        label: 'Ask Leif to arrange a conversation.',
        close: true,
        relation: { leif: 2 },
        inventory: ['archive-exhibit-card'],
        unlockThreads: ['previousowner', 'holiday'],
        prefs: { archival: 1 },
        history: 'Turned a public exhibit into a new primary source and another appointment.'
      },
      {
        label: 'Take the win before history gains a phone number.',
        close: true,
        relation: { leif: 1 },
        inventory: ['archive-exhibit-card'],
        prefs: { restraint: 1 },
        history: 'Allowed a historical revelation to remain merely useful.'
      }
    ]
  },
  'people-finale': {
    kind: 'conversation',
    thread: 'localhistory',
    people: ['niels', 'maja', 'ada', 'leif'],
    title: 'Four people have independently scheduled the same Saturday.',
    messages: [
      { from: 'niels', text: 'I can check the roof vent and bring the drone.' },
      { from: 'maja', text: 'I want the three soil samples before anyone moves machinery.' },
      { from: 'ada', text: 'The receiver can log the weather report while we work.' },
      { from: 'leif', text: 'I have the old drainage plan. It is labelled “approximate,” which is historically honest.' }
    ],
    choices: [
      {
        label: 'Coordinate one useful morning and then feed everyone.',
        close: true,
        relation: { niels: 1, maja: 1, ada: 1, leif: 1 },
        inventory: ['community-favour-map'],
        prefs: { coordination: 2, community: 2 },
        completePeople: true,
        history: 'Converted four relationships and several rabbit holes into one useful morning.'
      },
      {
        label: 'Create a shared checklist with dependencies.',
        close: true,
        relation: { niels: 0, maja: 1, ada: 0, leif: 1 },
        inventory: ['community-favour-map'],
        prefs: { planning: 2, programmeManagement: 1 },
        completePeople: true,
        history: 'Responded to neighbourly help by inventing lightweight governance.'
      },
      {
        label: 'Attend quietly and let competent people self-organise.',
        close: true,
        relation: { niels: 1, maja: 1, ada: 1, leif: 1 },
        inventory: ['community-favour-map'],
        prefs: { trust: 2 },
        completePeople: true,
        history: 'Allowed a group of capable adults to operate without becoming their project manager.'
      }
    ]
  }
};

function due(state, eventId) {
  const target = state.scheduledEvents?.[eventId];
  return Number.isFinite(target) && state.completedNodes.length >= target;
}

function hasAny(state, nodeIds) {
  return nodeIds.some((id) => state.completedNodes.includes(id));
}

function completedPeopleFollowup(state) {
  return hasAny(state, [
    'niels-roof-photo', 'niels-ladder-return', 'niels-pool-stakes',
    'maja-soil-kit', 'maja-receipt-verdict',
    'ada-repair-saturday', 'ada-remote-diagnosis', 'ada-thanks',
    'leif-exhibit-opening'
  ]);
}

export const PEOPLE_FEED_ITEMS = [
  {
    id: 'niels-ladder-feed',
    thread: 'drone',
    eyebrow: 'NIELS · NOW',
    title: 'The neighbour has borrowed the ladder retroactively.',
    text: 'He also has aerial evidence concerning the gutter.',
    node: 'niels-ladder',
    when: (state) => state.completedNodes.length >= 1 && !state.completedNodes.includes('niels-ladder')
  },
  {
    id: 'niels-roof-photo-feed',
    thread: 'drone',
    eyebrow: 'NIELS · 3 PHOTOS',
    title: 'The roof inspection has found a future weather problem.',
    text: 'It is currently affordable and therefore emotionally easy to postpone.',
    node: 'niels-roof-photo',
    when: (state) => due(state, 'niels-roof-photo') && !state.completedNodes.includes('niels-roof-photo')
  },
  {
    id: 'niels-ladder-return-feed',
    thread: 'drone',
    eyebrow: 'AT THE DOOR',
    title: 'The ladder has returned with an apology accessory.',
    text: 'Niels maintains that a tape measure cannot legally be a bribe.',
    node: 'niels-ladder-return',
    when: (state) => due(state, 'niels-ladder-return') && !state.completedNodes.includes('niels-ladder-return')
  },
  {
    id: 'niels-pool-stakes-feed',
    thread: 'pool',
    eyebrow: 'GARDEN UPDATE',
    title: 'The pool outline is now staked and alarmingly square.',
    text: 'The neighbour has converted barter into surveying.',
    node: 'niels-pool-stakes',
    when: (state) => due(state, 'niels-pool-stakes') && !state.completedNodes.includes('niels-pool-stakes')
  },
  {
    id: 'maja-soil-feed',
    thread: 'lawn',
    eyebrow: 'MAJA · GARDEN CENTRE',
    title: 'Someone has reviewed the fertiliser receipt professionally.',
    text: 'The loyalty programme has become a source document.',
    node: 'maja-soil',
    when: (state) => hasAny(state, ['lawn-fertiliser', 'evidence:lawn', 'compare:pool']) && !state.completedNodes.includes('maja-soil')
  },
  {
    id: 'maja-soil-kit-feed',
    thread: 'soil',
    eyebrow: 'LEFT BY DOOR',
    title: 'Three labelled soil bags require procedural discipline.',
    text: 'Combining them would be efficient and scientifically criminal.',
    node: 'maja-soil-kit',
    when: (state) => due(state, 'maja-soil-kit') && !state.completedNodes.includes('maja-soil-kit')
  },
  {
    id: 'maja-receipt-verdict-feed',
    thread: 'lawn',
    eyebrow: 'MAJA · FOLLOW-UP',
    title: 'The emotional context of the fertiliser purchase has been found.',
    text: 'It was a discount on the second bag.',
    node: 'maja-receipt-verdict',
    when: (state) => due(state, 'maja-receipt-verdict') && !state.completedNodes.includes('maja-receipt-verdict')
  },
  {
    id: 'ada-receiver-feed',
    thread: 'radio',
    eyebrow: 'ADA · REPAIR CAFÉ',
    title: 'The old receiver has been offered a Saturday appointment.',
    text: 'The appointment includes a suspiciously small volunteer obligation.',
    node: 'ada-receiver',
    when: (state) => hasAny(state, ['parcel-receiver', 'evidence:hum', 'radio-notebook']) && !state.completedNodes.includes('ada-receiver')
  },
  {
    id: 'ada-repair-saturday-feed',
    thread: 'radio',
    eyebrow: 'PROMISE DUE',
    title: 'Saturday has arrived and remembers what you said.',
    text: 'The repair café is open. The sofa has submitted a competing proposal.',
    node: 'ada-repair-saturday',
    when: (state) => due(state, 'ada-repair-saturday') && !state.completedNodes.includes('ada-repair-saturday')
  },
  {
    id: 'ada-remote-diagnosis-feed',
    thread: 'radio',
    eyebrow: 'ADA · PHOTO REVIEW',
    title: 'Remote diagnosis has identified a thumb.',
    text: 'The receiver remains medically unassessed.',
    node: 'ada-remote-diagnosis',
    when: (state) => due(state, 'ada-remote-diagnosis') && !state.completedNodes.includes('ada-remote-diagnosis')
  },
  {
    id: 'ada-thanks-feed',
    thread: 'radio',
    eyebrow: 'ADA · TWO DAYS LATER',
    title: 'One helpful Saturday has become a local reputation.',
    text: 'Competence has escaped containment.',
    node: 'ada-thanks',
    when: (state) => due(state, 'ada-thanks') && !state.completedNodes.includes('ada-thanks')
  },
  {
    id: 'leif-archive-feed',
    thread: 'localhistory',
    eyebrow: 'LEIF · LOCAL ARCHIVE',
    title: 'The garden map has been requested for public display.',
    text: 'The pool annotations are currently part of the historical record.',
    node: 'leif-archive',
    when: (state) => hasAny(state, ['localhistory-start', 'old-map-overlay', 'previous-owner']) && !state.completedNodes.includes('leif-archive')
  },
  {
    id: 'leif-exhibit-opening-feed',
    thread: 'previousowner',
    eyebrow: 'EXHIBITION UPDATE',
    title: 'A visitor recognises the call sign and greenhouse stove.',
    text: 'Public history has generated a living source.',
    node: 'leif-exhibit-opening',
    when: (state) => due(state, 'leif-exhibit-opening') && !state.completedNodes.includes('leif-exhibit-opening')
  },
  {
    id: 'people-coalition-feed',
    thread: 'localhistory',
    eyebrow: 'GROUP CHAT · 4 PEOPLE',
    title: 'Everyone has independently selected the same Saturday.',
    text: 'The roof, soil, radio and old drainage plan are forming a committee.',
    node: 'people-finale',
    when: (state) => (state.metPeople?.length || 0) >= 3
      && completedPeopleFollowup(state)
      && !state.completedNodes.includes('people-finale')
  }
];

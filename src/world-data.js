export const WORLD_THREADS = {
  hum: { title: 'The low hum that only exists after bedtime', icon: '∿' },
  parcel: { title: 'The package addressed to somebody from 1987', icon: '▰' },
  radio: { title: 'The receiver that remembers more than the house', icon: '⌁' },
  weather: { title: 'Tomorrow’s weather, now with instruments', icon: '☁' },
  previousowner: { title: 'E. Madsen apparently had several hobbies', icon: '◎' }
};

export const WORLD_COMPARISONS = {
  weather: {
    thread: 'weather',
    title: 'Three ways to know tomorrow’s weather badly.',
    intro: 'One is convenient, one is locally useful, and one looks excellent beside an old radio.',
    next: 'weather-after-compare',
    priorities: [
      { id: 'easy', label: 'Convenience' },
      { id: 'local', label: 'Local clues' },
      { id: 'romance', label: 'Atmosphere' }
    ],
    items: [
      { id: 'forecast-app', name: 'Modern forecast', eyebrow: 'Excellent models. Zero brass knobs.', stats: { easy: 5, local: 3, romance: 1 }, details: ['Fast overview', 'Useful probability', 'Cannot smell approaching rain'], note: 'The boring answer, weakened only by being useful.' },
      { id: 'barometer-log', name: 'Barometer plus notes', eyebrow: 'Pressure trends and handwriting.', stats: { easy: 2, local: 5, romance: 4 }, details: ['Shows local change', 'Needs context', 'Encourages notebooks'], note: 'Does not replace a forecast. Does create a person who says “pressure is falling.”' },
      { id: 'storm-glass', name: 'Decorative storm glass', eyebrow: 'Crystals with executive presence.', stats: { easy: 4, local: 1, romance: 5 }, details: ['Beautiful object', 'Temperature-sensitive', 'Interpretation benefits from optimism'], note: 'Predicts that guests will ask what it does.' }
    ]
  }
};

export const WORLD_EVIDENCE_CHECKS = {
  hum: {
    thread: 'hum',
    title: 'Locate the hum without blaming the entire electrical grid.',
    intro: 'Reveal observations, then choose the explanation that fits all of them rather than the one with the best forum thread.',
    next: 'hum-after-evidence',
    best: 'transformer',
    clues: [
      { id: 'wall', label: 'It is louder beside one interior wall', detail: 'The sound does not grow toward the PC, pump or road. It peaks beside a sealed junction box.' },
      { id: 'breaker', label: 'One old lighting circuit stops it', detail: 'The main appliances remain powered while the hum disappears immediately.' },
      { id: 'touch', label: 'The cover plate has a faint vibration', detail: 'The vibration returns with the circuit and fades with it.' },
      { id: 'history', label: 'The cable route points toward the former greenhouse', detail: 'The old garden plan shows lighting and a bell circuit passing through this wall.' }
    ],
    hypotheses: [
      { id: 'transformer', label: 'An old low-voltage transformer is vibrating', response: 'The circuit, location and physical vibration all converge on the forgotten transformer.' },
      { id: 'pool-pump', label: 'The pool pump is resonating through the house', response: 'A reasonable suspect, except the hum survives when the pump is unplugged.' },
      { id: 'infrastructure', label: 'The regional power grid has chosen this bedroom', response: 'Ambitious. The regional grid rarely fits behind one cover plate.' }
    ]
  }
};

export const WORLD_STORY_NODES = {
  'hum-start': {
    thread: 'hum', location: 'Bedroom, 23:48', title: 'The house has acquired a very quiet engine.',
    body: ['It is not loud enough to demonstrate convincingly to another person.', 'It is exactly loud enough to become the only sound in the universe once the lights are off.'],
    choices: [
      { label: 'Collect evidence before declaring war on electricity', next: 'evidence:hum', prefs: { observation: 1, patience: 1 }, history: 'Opened a noise investigation at the hour normally reserved for sleeping.' },
      { label: 'Test circuits one at a time', next: 'hum-breaker-test', prefs: { experiment: 2 }, inventory: ['breaker-notes'] }
    ]
  },
  'hum-breaker-test': {
    thread: 'hum', location: 'Fuse board, labels from several governments', title: '“Garden?” is doing a lot of work as a label.',
    body: ['Most circuits behave. One old lighting circuit silences the hum while leaving the obvious equipment untouched.', 'The label says GARDEN / BELL / MAYBE.'],
    choices: [{ label: 'Build the evidence board', next: 'evidence:hum', prefs: { evidenceBased: 1 } }]
  },
  'hum-after-evidence': {
    thread: 'hum', location: 'The wall with a documented opinion', title: 'The hum lives behind a forgotten cover plate.',
    body: ['The evidence points to an old low-voltage transformer, not the PC, pool or national infrastructure.', 'An electrician isolates it safely. The silence is immediate and almost suspicious.'],
    choices: [
      { label: 'Ask what the old circuit used to power', next: 'hum-transformer', prefs: { curiosity: 1 } },
      { label: 'Enjoy silence and absolutely do not investigate further', next: 'hum-transformer', prefs: { selfDeception: 1 }, history: 'Announced an intention not to investigate the newly discovered cable.' }
    ]
  },
  'hum-transformer': {
    thread: 'hum', location: 'Wall cavity, historically overqualified', title: 'The cable continues toward the old greenhouse.',
    body: ['The transformer once powered a bell, two path lights and something labelled RX in faded pencil.', 'Beside the label is a radio call sign and the name E. Madsen. The house has introduced a previous protagonist.'],
    choices: [
      { label: 'Search the loft for the other end', next: 'radio-attic', unlockThreads: ['radio', 'previousowner'], inventory: ['old-call-sign'] },
      { label: 'Ignore it until a package arrives with that name', next: 'parcel-start', unlockThreads: ['parcel'], prefs: { narrativeConvenience: 2 } }
    ]
  },
  'parcel-start': {
    thread: 'parcel', location: 'Front step, inconveniently real', title: 'A package is addressed to E. Madsen.',
    body: ['The address is yours. The recipient has not lived here within any reasonable definition of recently.', 'The sender is a small radio repair shop on a coastal island. The customs description says “repaired instrument — no commercial value.”'],
    choices: [
      { label: 'Call the sender instead of opening somebody else’s parcel', next: 'parcel-call-sender', prefs: { restraint: 1, practical: 1 } },
      { label: 'Ask the courier to return it', next: 'parcel-courier-return', prefs: { procedure: 1 } }
    ]
  },
  'parcel-call-sender': {
    thread: 'parcel', location: 'Phone call with a repair shop', title: 'The sender is also confused, but professionally.',
    body: ['The shop inherited old repair records and used the last address attached to the serial number.', 'They confirm the original owner is long gone and tell you to keep the unit or recycle it. “It belongs with the house more than with us.”'],
    choices: [{ label: 'Inspect the now-legitimate mystery', next: 'parcel-receiver', prefs: { curiosity: 1 } }]
  },
  'parcel-courier-return': {
    thread: 'parcel', location: 'Front step, two days later', title: 'The package has returned with administrative momentum.',
    body: ['The repair shop calls before the courier reaches the gate.', 'They explain the archived label, release the parcel to you and apologise for accidentally restarting 1987.'],
    choices: [{ label: 'Inspect the now-legitimate mystery', next: 'parcel-receiver', prefs: { patience: 1 } }]
  },
  'parcel-receiver': {
    thread: 'parcel', location: 'Kitchen table, towel promoted to lab cloth', title: 'It is an old portable receiver and signal meter.',
    body: ['The case is scratched, the dial is immaculate and the battery compartment contains a folded card with your address.', 'The call sign matches the pencil mark by the transformer.'],
    choices: [
      { label: 'Compare it with the cable in the loft', next: 'radio-attic', unlockThreads: ['radio', 'previousowner'], inventory: ['repaired-receiver'] },
      { label: 'Turn the largest knob first', next: 'radio-tune', unlockThreads: ['radio'], prefs: { knobFirst: 2 }, inventory: ['repaired-receiver'] }
    ]
  },
  'radio-attic': {
    thread: 'radio', location: 'Loft, where cables go to become folklore', title: 'The antenna lead is still here.',
    body: ['A thin cable emerges beside an old notebook and a wooden mounting board shaped around missing equipment.', 'The notebook records signal reports, pressure readings and ferry weather from the same island as the repair shop.'],
    choices: [
      { label: 'Read the notebook before connecting anything', next: 'radio-notebook', inventory: ['weather-notebook'], prefs: { restraint: 1, archival: 1 } },
      { label: 'Connect the repaired receiver', next: 'radio-tune', inventory: ['weather-notebook'], prefs: { experiment: 1 } }
    ]
  },
  'radio-tune': {
    thread: 'radio', location: 'Loft, now faintly electronic', title: 'A repeating signal appears every few minutes.',
    body: ['It sounds structured, distant and exactly mysterious enough to damage judgement.', 'The notebook has a page titled WEATHER DATA / DO NOT CALL IT SPY STUFF.'],
    choices: [
      { label: 'Use the notebook like a sensible investigator', next: 'radio-notebook', prefs: { evidenceBased: 1 } },
      { label: 'Assume espionage until embarrassed', next: 'radio-false-alarm', prefs: { confidence: 1, chaos: 1 } }
    ]
  },
  'radio-false-alarm': {
    thread: 'radio', location: 'Loft, intelligence community adjourned', title: 'The spy network is a weather beacon.',
    body: ['The timing matches an automated coastal transmission listed in the notebook.', 'National security survives. Your confidence requests a private meeting.'],
    choices: [{ label: 'Read the rest of the notebook', next: 'radio-notebook', prefs: { humility: 1 } }]
  },
  'radio-notebook': {
    thread: 'radio', location: 'Notebook, 1984–1989', title: 'E. Madsen logged weather, radio signals and ferry cancellations.',
    body: ['Pressure trends are written beside reception reports and greenhouse temperatures.', 'One page compares a proper barometer with a storm glass described as “beautiful but theatrically vague.”'],
    choices: [
      { label: 'Compare ways to understand local weather', next: 'compare:weather', unlockThreads: ['weather'], prefs: { researchDepth: 1 } },
      { label: 'Find out who E. Madsen was', next: 'previous-owner', unlockThreads: ['previousowner'], prefs: { archival: 2 } }
    ]
  },
  'previous-owner': {
    thread: 'previousowner', location: 'Local archive, tabs reproducing', title: 'E. Madsen had a greenhouse, a radio licence and no small hobbies.',
    body: ['The same person built the winter garden under the lawn, ran the loft antenna and kept weather observations for a ferry operator friend.', 'Several unrelated systems have turned out to be one retired person with excellent notebooks.'],
    choices: [
      { label: 'Use the notebook for the holiday island', next: 'weather-island', unlockThreads: ['weather', 'holiday'], inventory: ['old-qsl-card'] },
      { label: 'Return to the weather question first', next: 'compare:weather', unlockThreads: ['weather'], prefs: { focus: 1 } }
    ]
  },
  'weather-after-compare': {
    thread: 'weather', location: 'Window shelf, instruments judged', title: 'The forecast and barometer agree to share responsibility.',
    body: ['The app handles the big picture. The local pressure trend adds context. The storm glass looks magnificent and contributes morale.', 'An old note warns that a fast pressure fall often preceded cancelled island ferries.'],
    choices: [
      { label: 'Apply that lesson to the holiday shortlist', next: 'weather-island', unlockThreads: ['holiday'], inventory: ['barometer-log'] },
      { label: 'Put everything on one absurdly connected map', next: 'world-finale', prefs: { synthesis: 1 }, inventory: ['barometer-log'] }
    ]
  },
  'weather-island': {
    thread: 'holiday', location: 'Holiday plan, now with historical meteorology', title: 'The island is lovely and occasionally unreachable.',
    body: ['The old notebook does not predict this year’s weather, but it reveals the real logistical weakness: exposed ferry connections in poor conditions.', 'The nearby coast option suddenly looks less boring and more like something that will happen.'],
    choices: [
      { label: 'Keep the island as an adventure option', next: 'world-finale', prefs: { novelty: 1, planning: 1 } },
      { label: 'Choose reliability and save the island for later', next: 'world-finale', prefs: { practical: 2 } }
    ]
  },
  'bird-return': {
    thread: 'bird', location: 'Kitchen window, after heavy rain', title: 'The bird has filed an appeal.',
    body: ['One exterior marker has peeled away. The attacks resume at the newly reflective corner only.', 'The original diagnosis survives a hostile retest.'],
    choices: [
      { label: 'Replace the exterior pattern properly', close: true, inventory: ['weatherproof-window-markers'], prefs: { practical: 1 }, history: 'Solved the returning bird problem without reopening ornithology as a career.' },
      { label: 'Fetch the ladder and notice the wall is humming', next: 'hum-start', unlockThreads: ['hum'], prefs: { crossReference: 1 } }
    ]
  },
  'pc-price-return': {
    thread: 'pc', location: 'Parts list, notification enabled against better judgement', title: 'The GPU is cheaper. The power supply is not.',
    body: ['The total build price has fallen by almost exactly the amount another component increased.', 'The market has preserved uncertainty with admirable discipline.'],
    choices: [
      { label: 'Lock the sensible parts list and stop refreshing', close: true, inventory: ['locked-pc-budget'], prefs: { restraint: 1 }, history: 'Stopped a PC comparison while it still had a conclusion.' },
      { label: 'Recheck the room’s power situation first', next: 'hum-start', unlockThreads: ['hum'], prefs: { planning: 1 } }
    ]
  },
  'holiday-ferry-return': {
    thread: 'holiday', location: 'Inbox, timetable attached as PDF', title: 'The ferry removed the convenient departure.',
    body: ['The island option now requires leaving before anyone has emotionally accepted morning.', 'A package on the doorstep happens to come from the same island. This is not useful, but it is narratively aggressive.'],
    choices: [
      { label: 'Use the realistic coast option', close: true, prefs: { practical: 1 }, history: 'Allowed a timetable to defeat a theoretically superior holiday.' },
      { label: 'Investigate the island package instead', next: 'parcel-start', unlockThreads: ['parcel'], prefs: { curiosity: 1 } }
    ]
  },
  'pool-rain-return': {
    thread: 'pool', location: 'Garden, chalk formerly present', title: 'Rain has deleted the pool plan.',
    body: ['Every carefully measured line is gone except the section protected by an overturned bucket.', 'Fortunately the drone photo and old garden map remember more than the lawn.'],
    choices: [
      { label: 'Redraw it from the saved evidence', close: true, prefs: { prepared: 1 }, history: 'Recovered a pool layout from evidence instead of vibes.' },
      { label: 'Follow the newly visible old drain line', next: 'localhistory-start', unlockThreads: ['localhistory'], prefs: { curiosity: 1 } }
    ]
  },
  'lawn-brass-return': {
    thread: 'lawn', location: 'Old greenhouse rectangle, recently aerated', title: 'The lawn has produced a brass label.',
    body: ['Rain settles the loosened soil and exposes a small stamped tag beside the old foundation.', 'It carries the same call sign found on the wall cable. The grass has joined the radio investigation.'],
    choices: [
      { label: 'Search the call sign and previous owner', next: 'previous-owner', unlockThreads: ['previousowner', 'radio'], inventory: ['brass-call-sign-tag'] },
      { label: 'Put it somewhere safe and definitely remember where', close: true, inventory: ['brass-call-sign-tag'], prefs: { drawerConfidence: 1 }, history: 'Stored a historical clue in a location described only as safe.' }
    ]
  },
  'world-finale': {
    thread: 'previousowner', location: 'Home, map upgraded to ecosystem', title: 'The house has stopped containing separate problems.',
    body: ['The greenhouse explains the lawn. Its wiring explains the hum. The call sign explains the receiver. The notebook improves the holiday plan and gives the decorative weather glass an appropriately limited job.', 'You have not solved everything. You have achieved the more dangerous state of understanding how it connects.'],
    choices: [
      { label: 'Do one small useful task and stop', next: 'ending-world', prefs: { practical: 2 }, inventory: ['house-systems-map'], history: 'Converted several returning problems into one understandable system.' },
      { label: 'Research whether the old antenna can be restored', next: 'ending-world', prefs: { curiosity: 2, selfDeception: 1 }, history: 'Reached closure and immediately installed a door in it.' }
    ]
  },
  'ending-world': {
    thread: 'previousowner', location: 'Feed, now less innocent', title: 'Old Threads do not disappear. They compost.',
    body: ['The bird returned. Prices moved. Timetables changed. Rain erased chalk. The lawn revealed a name.', 'The world is no longer waiting politely for you to open a new topic.'],
    choices: [{ label: 'Return to feed', close: true, completeWorld: true }]
  }
};

export const WORLD_FEED_ITEMS = [
  { id: 'night-hum', thread: 'hum', eyebrow: '23:48', title: 'There is a low hum in the wall.', text: 'It cannot be heard while demonstrating it to another person.', node: 'hum-start', when: (state) => state.completedRun && state.expansionFlags?.started && !state.completedNodes.includes('hum-start') },
  { id: 'old-parcel', thread: 'parcel', eyebrow: 'DELIVERED', title: 'A package has arrived for E. Madsen.', text: 'The address is correct. The decade is questionable.', node: 'parcel-start', when: (state) => state.completedRun && state.expansionFlags?.started && !state.completedNodes.includes('parcel-start') },
  { id: 'bird-return-feed', thread: 'bird', eyebrow: 'THREAD RESURFACED', title: 'The window bird is back after the rain.', text: 'Only one marker has failed. The bird found it immediately.', node: 'bird-return', when: (state) => state.completedNodes.includes('bird-after-evidence') && !state.completedNodes.includes('bird-return') },
  { id: 'pc-price-feed', thread: 'pc', eyebrow: 'PRICE UPDATE', title: 'The PC build is cheaper and somehow costs the same.', text: 'One component dropped. Another sensed weakness.', node: 'pc-price-return', when: (state) => state.completedNodes.includes('compare:pc') && !state.completedNodes.includes('pc-price-return') },
  { id: 'holiday-ferry-feed', thread: 'holiday', eyebrow: 'TIMETABLE UPDATE', title: 'The convenient ferry no longer exists.', text: 'The PDF remains cheerful about this.', node: 'holiday-ferry-return', when: (state) => state.completedNodes.includes('compare:holiday') && !state.completedNodes.includes('holiday-ferry-return') },
  { id: 'pool-rain-feed', thread: 'pool', eyebrow: 'WEATHER EVENT', title: 'Rain has removed the pool layout.', text: 'Chalk had no disaster-recovery plan.', node: 'pool-rain-return', when: (state) => state.completedNodes.includes('compare:pool') && !state.completedNodes.includes('pool-rain-return') },
  { id: 'lawn-brass-feed', thread: 'lawn', eyebrow: 'FOUND OBJECT', title: 'A brass tag surfaced in the old greenhouse rectangle.', text: 'The lawn has begun returning archival material.', node: 'lawn-brass-return', when: (state) => state.completedNodes.includes('evidence:lawn') && !state.completedNodes.includes('lawn-brass-return') }
];

export const WORLD_INVENTORY = {
  'breaker-notes': { label: 'Breaker test notes', note: 'GARDEN / BELL / MAYBE was not accepted as a final diagnosis.' },
  'old-call-sign': { label: 'Old radio call sign', note: 'A name-shaped key to several new tabs.' },
  'repaired-receiver': { label: 'Repaired portable receiver', note: 'Returned from an island and approximately one generation late.' },
  'weather-notebook': { label: 'E. Madsen’s weather notebook', note: 'Pressure, radio reports, ferry cancellations and excellent margins.' },
  'old-qsl-card': { label: 'Old radio confirmation card', note: 'Proof that strangers once mailed each other evidence of having heard static.' },
  'barometer-log': { label: 'Barometer log', note: 'Useful context with a dangerous tendency to create weather commentary.' },
  'weatherproof-window-markers': { label: 'Weatherproof window markers', note: 'The bird’s appeal has been denied.' },
  'locked-pc-budget': { label: 'Locked PC budget', note: 'Locked remains an aspirational accounting term.' },
  'brass-call-sign-tag': { label: 'Brass call-sign tag', note: 'The lawn’s contribution to telecommunications history.' },
  'house-systems-map': { label: 'House systems map', note: 'Wiring, greenhouse, lawn, radio, weather and one previous owner with range.' }
};
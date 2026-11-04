export const EXPANSION_THREADS = {
  bird: { title: 'The bird that has declared war on glass', icon: '◇' },
  astronomy: { title: 'The moving light that is probably not aliens', icon: '✦' },
  holiday: { title: 'Take a holiday without creating a logistics company', icon: '△' },
  pc: { title: 'The new PC that began as one slow export', icon: '▤' },
  power: { title: 'Why is the electricity meter doing that?', icon: 'ϟ' },
  pool: { title: 'Put a pool somewhere without destroying everything', icon: '◯' },
  lawn: { title: 'The lawn has developed regions', icon: '≋' },
  soil: { title: 'What exactly is under the grass?', icon: '▥' },
  localhistory: { title: 'The garden used to be something else', icon: '⌖' },
  drone: { title: 'The neighbour owns an airborne opinion', icon: '⌁' }
};

export const EXPANSION_COMPARISONS = {
  holiday: {
    thread: 'holiday',
    title: 'Three holidays. None of them are simply “a holiday.”',
    intro: 'You wanted somewhere pleasant. You now have weather normals, transfer times and a column called logistical resentment.',
    next: 'holiday-after-compare',
    priorities: [
      { id: 'easy', label: 'Low friction' },
      { id: 'nature', label: 'Nature' },
      { id: 'novelty', label: 'Newness' }
    ],
    items: [
      { id: 'nearby-coast', name: 'Nearby coast week', eyebrow: 'Easy, calm, suspiciously achievable.', stats: { easy: 5, nature: 4, novelty: 2 }, details: ['Drive there', 'Dark beach nearby', 'Weather retains veto power'], note: 'The holiday most likely to happen rather than remain a browser tab.' },
      { id: 'island-hop', name: 'Small island expedition', eyebrow: 'Ferries create character.', stats: { easy: 2, nature: 5, novelty: 5 }, details: ['Two transfers', 'Excellent night sky', 'One timetable can defeat the entire family'], note: 'Beautiful, memorable and governed by a PDF made in 2009.' },
      { id: 'warm-city', name: 'Warm city plus mountains', eyebrow: 'Culture, heat and seventeen decisions per day.', stats: { easy: 3, nature: 3, novelty: 4 }, details: ['Direct flight', 'Rental-car question appears', 'Everyone packs for a different climate'], note: 'A relaxing break featuring advanced footwear strategy.' }
    ]
  },
  pc: {
    thread: 'pc',
    title: 'Three computers. One of them is mostly a space heater.',
    intro: 'The old machine completed the export. It would like formal recognition for surviving.',
    next: 'pc-after-compare',
    priorities: [
      { id: 'quiet', label: 'Quiet' },
      { id: 'value', label: 'Value' },
      { id: 'longevity', label: 'Longevity' }
    ],
    items: [
      { id: 'sensible-1440', name: 'Sensible 1440p box', eyebrow: 'Balanced. Adult. Difficult to brag about.', stats: { quiet: 4, value: 5, longevity: 3 }, details: ['Midrange GPU', 'Efficient CPU', 'Normal-sized power supply'], note: 'The build recommended by every sensible person and therefore emotionally endangered.' },
      { id: 'silent-workhorse', name: 'Silent workhorse', eyebrow: 'Large fans. Small drama.', stats: { quiet: 5, value: 3, longevity: 4 }, details: ['Oversized cooler', 'More RAM than dignity requires', 'No glass aquarium case'], note: 'A computer designed to disappear acoustically and remain physically enormous.' },
      { id: 'futureproof-furnace', name: 'Futureproof furnace', eyebrow: 'Performance now. Weather system later.', stats: { quiet: 1, value: 2, longevity: 5 }, details: ['Top-tier GPU', 'Power connector with trust issues', 'Can warm adjacent rooms'], note: 'Futureproof until the future invents a different socket.' }
    ]
  },
  pool: {
    thread: 'pool',
    title: 'The pool fits perfectly in three mutually exclusive places.',
    intro: 'Aerial photos have transformed the garden into a tactical map.',
    next: 'pool-after-compare',
    priorities: [
      { id: 'sun', label: 'Sun' },
      { id: 'lawn', label: 'Save lawn' },
      { id: 'privacy', label: 'Privacy' }
    ],
    items: [
      { id: 'terrace-edge', name: 'Beside the terrace', eyebrow: 'Convenient. Visible. Socially committed.', stats: { sun: 4, lawn: 3, privacy: 2 }, details: ['Short pipe run', 'Easy supervision', 'Every meal becomes poolside'], note: 'The practical location that turns the terrace into an airport lounge.' },
      { id: 'back-corner', name: 'Back corner', eyebrow: 'Private, leafy, electrically adventurous.', stats: { sun: 3, lawn: 4, privacy: 5 }, details: ['Long cable route', 'Trees contribute opinions', 'Preserves central play space'], note: 'Peaceful until the first leaf enters the filtration system.' },
      { id: 'middle-kingdom', name: 'Middle of everything', eyebrow: 'Maximum sun. Minimum remaining garden.', stats: { sun: 5, lawn: 1, privacy: 3 }, details: ['Best solar gain', 'Dominates every sightline', 'Lawn becomes a border decoration'], note: 'Technically a garden with a pool. Spiritually a pool with setbacks.' }
    ]
  }
};

export const EVIDENCE_CHECKS = {
  bird: {
    thread: 'bird',
    title: 'Identify the window attacker.',
    intro: 'Reveal observations, then choose the explanation that survives contact with evidence.',
    next: 'bird-after-evidence',
    best: 'reflection',
    clues: [
      { id: 'morning', label: 'It happens mostly in the morning', detail: 'The window reflects the garden most strongly when the interior is darker.' },
      { id: 'repeat', label: 'The same bird returns repeatedly', detail: 'It targets one pane and one corner, not random windows.' },
      { id: 'season', label: 'It is territorial season', detail: 'Hormones have converted a small bird into middle management.' },
      { id: 'pause', label: 'It stops when the glass is covered', detail: 'Removing the reflection removes the rival.' }
    ],
    hypotheses: [
      { id: 'reflection', label: 'It is attacking its reflection', response: 'The evidence aligns: repeated territorial attacks at the reflective pane.' },
      { id: 'insects', label: 'It is hunting insects on the glass', response: 'Possible once. Less convincing after the thirty-seventh personal vendetta.' },
      { id: 'surveillance', label: 'It is a very small surveillance programme', response: 'Compelling, but procurement would never approve the seed budget.' }
    ]
  },
  lawn: {
    thread: 'lawn',
    title: 'Diagnose the lawn before buying a chemical alphabet.',
    intro: 'The lawn has yellow patches, hard ground and several confident internet diagnoses.',
    next: 'lawn-after-evidence',
    best: 'compaction',
    clues: [
      { id: 'shape', label: 'The damage follows old straight lines', detail: 'The weak areas form rectangles rather than organic blotches.' },
      { id: 'probe', label: 'A screwdriver stops after four centimetres', detail: 'Healthy nearby soil accepts it much deeper after rain.' },
      { id: 'runoff', label: 'Water runs sideways instead of soaking in', detail: 'The surface seals quickly and puddles at the edges.' },
      { id: 'roots', label: 'Roots are shallow but not rotten', detail: 'The grass is alive; it simply cannot negotiate the subsoil.' }
    ],
    hypotheses: [
      { id: 'compaction', label: 'Compacted soil or buried hardscape', response: 'The straight geometry and shallow refusal point downward, not toward fungus.' },
      { id: 'fungus', label: 'Fungal disease', response: 'A fungus with a spirit level would be unusual, though not impossible.' },
      { id: 'nitrogen', label: 'It needs more fertiliser', response: 'More food does not solve the fact that the roots have hit architecture.' }
    ]
  }
};

export const EXPANSION_STORY_NODES = {
  'bird-start': {
    thread: 'bird', location: 'Kitchen window, 06:41', title: 'Something has started a war with the window.',
    body: ['Tap. Pause. TAP TAP TAP.', 'A small bird launches itself at the same pane, retreats to a branch and returns with the professional focus of someone contesting an invoice.'],
    choices: [
      { label: 'Collect observations before guessing', next: 'evidence:bird', prefs: { observation: 2 }, history: 'Opened a formal investigation into a bird with no legal representation.' },
      { label: 'Put a towel over the window and see what happens', next: 'bird-towel-test', prefs: { experiment: 2 }, inventory: ['window-towel'] }
    ]
  },
  'bird-towel-test': {
    thread: 'bird', location: 'Kitchen window, now wearing a towel', title: 'The attacks stop immediately.',
    body: ['The bird lands, looks at the covered pane and appears disappointed that its enemy has fled.', 'This is useful evidence and an unexpectedly personal victory.'],
    choices: [{ label: 'Build the evidence board', next: 'evidence:bird', prefs: { experiment: 1 } }]
  },
  'bird-after-evidence': {
    thread: 'bird', location: 'Kitchen, case mostly closed', title: 'The rival bird lives inside the glass.',
    body: ['Temporary exterior markers break up the reflection without turning the entire window into a bunker.', 'While placing them that evening, you notice a bright point crossing the sky without blinking.'],
    choices: [
      { label: 'Track the moving light', next: 'astronomy-start', unlockThreads: ['astronomy'], prefs: { curiosity: 2 } },
      { label: 'Search for a nature holiday with dark skies', next: 'holiday-start', unlockThreads: ['holiday'], prefs: { nature: 1 } }
    ]
  },
  'astronomy-start': {
    thread: 'astronomy', location: 'Garden, 22:17', title: 'Star, plane, satellite or expensive neighbour?',
    body: ['It moves steadily, does not blink and fades as it enters shadow.', 'You open one sky map. The sky map opens seven more questions.'],
    choices: [
      { label: 'Compare its path with aircraft and satellites', next: 'sky-result', prefs: { researchDepth: 1, observation: 1 }, inventory: ['rough-sky-map'] },
      { label: 'Get binoculars before doing science', next: 'holiday-start', prefs: { gearFirst: 2 }, unlockThreads: ['holiday'] }
    ]
  },
  'sky-result': {
    thread: 'astronomy', location: 'Garden, shortly after expertise', title: 'Probably a satellite. Definitely another hobby.',
    body: ['The timing and path fit a low-orbit object better than an aircraft.', 'Then a second light stops, reverses and descends behind the neighbour’s hedge. Space has become local.'],
    choices: [{ label: 'Investigate the extremely terrestrial light', next: 'drone-neighbor', unlockThreads: ['drone'], prefs: { skepticism: 1 } }]
  },
  'drone-neighbor': {
    thread: 'drone', location: 'Over the hedge', title: 'The neighbour has bought a drone and confidence.',
    body: ['NIELS: “I’m mapping roof moss.”', 'The screen shows your garden from above with unsettling clarity. It also reveals that every imagined pool location is worse than it looked from ground level.'],
    choices: [
      { label: 'Borrow the aerial image for pool planning', next: 'pool-start', unlockThreads: ['pool'], inventory: ['drone-yard-photo'], prefs: { practical: 1 } },
      { label: 'Ask whether it can inspect the PC room roof vent', next: 'pc-start', unlockThreads: ['pc'], prefs: { crossReference: 2 } }
    ]
  },
  'holiday-start': {
    thread: 'holiday', location: 'A map with too many saved stars', title: 'Plan a holiday. Avoid founding an airline.',
    body: ['The brief is simple: somewhere enjoyable, not exhausting, and different enough to feel like leaving.', 'The first search result suggests a four-transfer island chain described as “easy with children.”'],
    choices: [
      { label: 'Compare realistic options', next: 'compare:holiday', prefs: { planning: 1 } },
      { label: 'Choose entirely by night-sky darkness', next: 'holiday-dark-sky', prefs: { astronomy: 2, chaos: 1 } }
    ]
  },
  'holiday-dark-sky': {
    thread: 'holiday', location: 'Map layer: light pollution', title: 'Civilisation is now the problem.',
    body: ['The darkest destination requires two ferries and a bus that exists on alternate Thursdays.', 'You briefly consider restructuring the calendar around astronomy.'],
    choices: [{ label: 'Return to options that can actually happen', next: 'compare:holiday', prefs: { practical: 1 } }]
  },
  'holiday-after-compare': {
    thread: 'holiday', location: 'Holiday shortlist', title: 'You have selected the current least-wrong holiday.',
    body: ['The destination offers bird hides, dark beaches and rental cabins with “fast Wi-Fi” in quotation marks.', 'You test the old PC with a sample batch of photos. It responds by becoming acoustically agricultural.'],
    choices: [
      { label: 'Investigate the PC before it becomes a travel restriction', next: 'pc-start', unlockThreads: ['pc'], inventory: ['holiday-shortlist'] },
      { label: 'Buy binoculars and pretend computing is unrelated', next: 'bird-binoculars', prefs: { gearFirst: 1 }, inventory: ['borrowed-binoculars'] }
    ]
  },
  'bird-binoculars': {
    thread: 'bird', location: 'Garden, optically enhanced', title: 'The binoculars work. The photo workflow does not.',
    body: ['You can now distinguish feather detail, distant branches and exactly how much dust lives inside old optics.', 'The PC takes nine minutes to process a short clip and begins negotiating with its fans.'],
    choices: [{ label: 'Fine. Open the PC question.', next: 'pc-start', unlockThreads: ['pc'], prefs: { surrenderToEvidence: 1 } }]
  },
  'pc-start': {
    thread: 'pc', location: 'Desk, warm side', title: 'The PC has entered its protest era.',
    body: ['A photo export, a game update and twelve browser tabs cause the system to pause as if remembering a previous life.', 'The upgrade begins as “maybe more RAM,” which is not how upgrades remain.'],
    choices: [
      { label: 'Compare complete build directions', next: 'compare:pc', prefs: { planning: 1 } },
      { label: 'Replace only the loudest component', next: 'pc-fan-detour', prefs: { tinker: 2, frugal: 1 } }
    ]
  },
  'pc-fan-detour': {
    thread: 'pc', location: 'Inside the case', title: 'The loudest fan is not the only loudest fan.',
    body: ['You stop one fan briefly. Another reveals itself. Then the power supply joins the meeting.', 'The machine is not noisy. It is layered.'],
    choices: [{ label: 'Compare proper build directions', next: 'compare:pc', prefs: { acceptance: 1 } }]
  },
  'pc-after-compare': {
    thread: 'pc', location: 'Parts list, version 11', title: 'The sensible build wins. Emotion files an appeal.',
    body: ['You estimate power draw and discover the current room circuit also serves the garden equipment.', 'A plug-in meter shows the pool pump consuming electricity with the steady confidence of a public institution.'],
    choices: [
      { label: 'Measure what the garden equipment actually uses', next: 'power-meter', unlockThreads: ['power'], inventory: ['pc-parts-list'] },
      { label: 'Ignore electricity and plan the pool location', next: 'pool-start', unlockThreads: ['pool'], prefs: { selectiveFocus: 1 } }
    ]
  },
  'power-meter': {
    thread: 'power', location: 'Utility socket, numbers now involved', title: 'The meter has made every appliance suspicious.',
    body: ['The old pump is not catastrophic, but it runs longer than expected because the hose layout is inefficient.', 'The PC build and pool plan have become colleagues. Nobody approved this organisation chart.'],
    choices: [
      { label: 'Use the numbers in the pool plan', next: 'pool-start', unlockThreads: ['pool'], inventory: ['power-meter'], prefs: { evidenceBased: 1 } },
      { label: 'Check whether the soggy lawn is affecting the route', next: 'lawn-start', unlockThreads: ['lawn'], prefs: { crossReference: 1 } }
    ]
  },
  'pool-start': {
    thread: 'pool', location: 'Garden, now a site plan', title: 'A new pool requires sacrificing one existing thing.',
    body: ['Sun, privacy, short pipe runs, play space and surviving grass refuse to occupy the same square metres.', 'The drone photo makes this conflict beautifully undeniable.'],
    choices: [
      { label: 'Compare the three viable locations', next: 'compare:pool', prefs: { planning: 1 } },
      { label: 'Place it where the current lawn is already worst', next: 'lawn-start', unlockThreads: ['lawn'], prefs: { opportunism: 2 } }
    ]
  },
  'pool-after-compare': {
    thread: 'pool', location: 'Garden plan, chalk everywhere', title: 'The pool has a location. The lawn has objections.',
    body: ['The chosen footprint works, but the access route crosses the weakest part of the grass.', 'A rectangular yellow pattern becomes obvious once you stop seeing it as “just bad lawn.”'],
    choices: [
      { label: 'Diagnose the lawn before machinery arrives', next: 'lawn-start', unlockThreads: ['lawn'], inventory: ['pool-layout-chalk'] },
      { label: 'Ask the drone owner for an older aerial photo', next: 'localhistory-start', unlockThreads: ['localhistory'], prefs: { shortcut: 1 } }
    ]
  },
  'lawn-start': {
    thread: 'lawn', location: 'The yellow republic', title: 'The lawn is not uniformly failing. It has borders.',
    body: ['Some areas drain, some puddle and one rectangle remains thin regardless of fertiliser.', 'The internet offers fungus, leatherjackets, nitrogen, drought, overwatering and personal weakness.'],
    choices: [
      { label: 'Collect physical evidence', next: 'evidence:lawn', prefs: { observation: 1 } },
      { label: 'Buy fertiliser first and diagnosis later', next: 'lawn-fertiliser', prefs: { impulse: 1 }, inventory: ['premature-fertiliser'] }
    ]
  },
  'lawn-fertiliser': {
    thread: 'lawn', location: 'Garden centre receipt', title: 'The grass is now well-fed above a problem.',
    body: ['The healthy areas become greener. The rectangle remains a rectangle.', 'You have improved the control group.'],
    choices: [{ label: 'Fine. Collect evidence.', next: 'evidence:lawn', prefs: { experiment: 1 } }]
  },
  'lawn-after-evidence': {
    thread: 'lawn', location: 'Garden, screwdriver as science', title: 'The problem has corners because the thing underneath has corners.',
    body: ['Compaction or buried hardscape explains the drainage and root depth better than disease.', 'A narrow soil core hits pale gravel at exactly the same depth along the rectangle.'],
    choices: [
      { label: 'Take a proper soil core', next: 'soil-test', unlockThreads: ['soil'], inventory: ['soil-core'] },
      { label: 'Reroute pool drainage around it', next: 'pool-drainage', unlockThreads: ['pool'], prefs: { practical: 1 } }
    ]
  },
  'soil-test': {
    thread: 'soil', location: 'A hole of increasing historical significance', title: 'Grass, topsoil, gravel, brick.',
    body: ['The layers are too regular to be geology and too inconvenient to be decorative.', 'You have found either an old path, a greenhouse base or the world’s least exciting archaeological site.'],
    choices: [{ label: 'Find old maps and aerial photos', next: 'localhistory-start', unlockThreads: ['localhistory'], prefs: { researchDepth: 1 } }]
  },
  'pool-drainage': {
    thread: 'pool', location: 'Garden plan, version 19', title: 'The drainage route avoids the rectangle by becoming absurd.',
    body: ['The new route is longer, shallower and passes exactly where a future terrace would logically go.', 'You finally ask why the buried rectangle exists.'],
    choices: [{ label: 'Look for the old property layout', next: 'localhistory-start', unlockThreads: ['localhistory'] }]
  },
  'localhistory-start': {
    thread: 'localhistory', location: 'Digital archive, 47 tabs', title: 'The garden used to contain a greenhouse.',
    body: ['An old aerial image shows a long glasshouse exactly beneath the weak lawn.', 'A handwritten plan labels it “winter garden,” which feels unnecessarily grand for six panes and a stove.'],
    choices: [
      { label: 'Overlay the old plan on the new pool layout', next: 'old-map-overlay', inventory: ['old-garden-map'], prefs: { synthesis: 2 } },
      { label: 'Search the owner’s name from the plan', next: 'holiday-local-detour', unlockThreads: ['holiday'], prefs: { curiosity: 1 } }
    ]
  },
  'old-map-overlay': {
    thread: 'localhistory', location: 'Table covered in transparent layers', title: 'Everything suddenly lines up.',
    body: ['The bad lawn is the greenhouse foundation. The wet strip is an old drain. The back corner has the best pool base but the worst cable route.', 'For the first time, five unrelated problems are visible on one sheet of paper.'],
    choices: [{ label: 'Make one combined plan', next: 'network-finale', prefs: { synthesis: 2, planning: 1 } }]
  },
  'holiday-local-detour': {
    thread: 'holiday', location: 'Archive record nobody asked for', title: 'The greenhouse owner ran a seaside boarding house.',
    body: ['A faded advertisement promises “air, bathing and restorative silence” two hours away.', 'The place still exists, now with Wi-Fi and significantly fewer medical claims.'],
    choices: [
      { label: 'Add it to the holiday shortlist', next: 'network-finale', inventory: ['strange-local-holiday-lead'], prefs: { novelty: 1 } },
      { label: 'Close the archive before history plans the holiday', next: 'network-finale', prefs: { restraint: 1 } }
    ]
  },
  'network-finale': {
    thread: 'localhistory', location: 'Home, one sheet of paper later', title: 'The problems have formed a coalition.',
    body: ['Window markers solve the bird. A realistic holiday survives the calendar. The PC build stays quiet and efficient. The pool moves half a metre. The lawn gets aeration instead of random chemicals.', 'This is dangerously close to a coherent plan.'],
    choices: [
      { label: 'Do the smallest useful thing first', next: 'ending-expansion', prefs: { practical: 2 }, inventory: ['master-rabbit-map'], history: 'Connected five rabbit holes and accidentally produced a plan.' },
      { label: 'Open one final tab about greenhouse restoration', next: 'ending-expansion', prefs: { selfDeception: 1, curiosity: 2 }, history: 'Reached coherence and immediately endangered it.' }
    ]
  },
  'ending-expansion': {
    thread: 'localhistory', location: 'Feed, shortly', title: 'Nothing is finished. Everything is now related.',
    body: ['The bird is quiet. The lawn has a diagnosis. The pool has moved. The PC has a parts list. The holiday has a shortlist.', 'You may now return to the feed and encounter a completely unrelated problem. Allegedly.'],
    choices: [{ label: 'Return to feed', close: true, completeExpansion: true }]
  }
};

export const EXPANSION_FEED_ITEMS = [
  { id: 'bird-window', thread: 'bird', eyebrow: '06:41', title: 'A bird is repeatedly attacking the kitchen window.', text: 'It appears to have selected an enemy and a working schedule.', node: 'bird-start', when: (state) => state.completedRun && !state.completedNodes.includes('bird-start') },
  { id: 'holiday-tab', thread: 'holiday', eyebrow: 'SAVED 12 TIMES', title: 'The holiday shortlist contains only incompatible options.', text: 'One is easy, one is interesting, and one has acceptable weather.', node: 'holiday-start', when: (state) => state.completedRun && !state.completedNodes.includes('holiday-start') },
  { id: 'pc-protest', thread: 'pc', eyebrow: 'DESKTOP', title: 'The PC has begun making agricultural noises.', text: 'A five-minute export now includes a cooling-off period.', node: 'pc-start', when: (state) => state.completedRun && !state.completedNodes.includes('pc-start') },
  { id: 'pool-chalk', thread: 'pool', eyebrow: 'GARDEN', title: 'The new pool fits perfectly in three wrong places.', text: 'Sunlight, privacy and surviving grass have declined collaboration.', node: 'pool-start', when: (state) => state.completedRun && !state.completedNodes.includes('pool-start') },
  { id: 'lawn-borders', thread: 'lawn', eyebrow: 'FIELD REPORT', title: 'The lawn has developed suspiciously straight borders.', text: 'Nature rarely uses a ruler unless humans helped earlier.', node: 'lawn-start', when: (state) => state.completedRun && !state.completedNodes.includes('lawn-start') },
  { id: 'expansion-resurface', thread: 'localhistory', eyebrow: 'ONE MORE THING', title: 'The old greenhouse may explain the entire garden.', text: 'It may also explain nothing. The archive is open.', node: 'localhistory-start', when: (state) => state.expansionFlags?.completed && !state.completedNodes.includes('localhistory-start') }
];

export const EXPANSION_INVENTORY = {
  'window-towel': { label: 'Scientific window towel', note: 'Peer review remains pending.' },
  'rough-sky-map': { label: 'Rough sky map', note: 'Contains three stars, one satellite and excessive confidence.' },
  'drone-yard-photo': { label: 'Aerial garden photo', note: 'The garden looks smaller when evidence is involved.' },
  'holiday-shortlist': { label: 'Holiday shortlist', note: 'Three options, eleven objections, one actual possibility.' },
  'borrowed-binoculars': { label: 'Borrowed binoculars', note: 'Improve birds, stars and awareness of lens dust.' },
  'pc-parts-list': { label: 'PC parts list v11', note: 'Version 1 was “maybe more RAM.”' },
  'power-meter': { label: 'Plug-in power meter', note: 'Has made every appliance defensive.' },
  'pool-layout-chalk': { label: 'Pool layout chalk', note: 'Turns the garden into a crime scene for geometry.' },
  'premature-fertiliser': { label: 'Premature fertiliser', note: 'A solution purchased before meeting the problem.' },
  'soil-core': { label: 'Soil core', note: 'Grass, topsoil, gravel, history.' },
  'old-garden-map': { label: 'Old garden plan', note: 'Explains the rectangle. Creates nine new questions.' },
  'strange-local-holiday-lead': { label: 'Historic holiday lead', note: 'Restorative silence now includes Wi-Fi.' },
  'master-rabbit-map': { label: 'Master rabbit map', note: 'Five problems connected by one increasingly worried sheet of paper.' }
};

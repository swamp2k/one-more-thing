export const GAME_META = {
  title: 'One More Thing',
  subtitle: 'I was just checking something.',
  version: '0.1.0'
};

export const THREADS = {
  phone: { title: 'Find a phone you can actually see', icon: '▣' },
  sources: { title: 'Can anyone on the internet be trusted?', icon: '?' },
  bike: { title: 'The suspiciously reasonable motorcycle', icon: '⚙' },
  passenger: { title: 'Can another human fit back there?', icon: '↔' },
  pizza: { title: 'The router is sitting on the dough', icon: '◉' },
  poolish: { title: 'Should poolish breathe?', icon: '≈' },
  ketchup: { title: 'Is ketchup a dressing?', icon: '!' },
  socket: { title: 'The missing 10 mm socket', icon: '⌁' },
  cable: { title: 'The cable nobody may throw away', icon: '∞' },
  marketplace: { title: '“Barely used” and other fiction', icon: '¤' }
};

export const COMPARISONS = {
  phone: {
    thread: 'phone',
    title: 'Three phones. One unnecessary spreadsheet.',
    intro: 'You only wanted a brighter screen. You now have a comparison model.',
    priorities: [
      { id: 'sunlight', label: 'Sunlight' },
      { id: 'weight', label: 'Weight' },
      { id: 'price', label: 'Price' }
    ],
    items: [
      { id: 'brick-fe', name: 'Brick FE', eyebrow: 'Bright. Wide. Dense.', stats: { sunlight: 5, weight: 1, price: 3 }, details: ['Excellent outdoors', '213 g', 'Reasonable street price'], note: 'A small paving slab with a very good display.' },
      { id: 'edge-ish', name: 'Edge-ish 50', eyebrow: 'Lovely in the shade.', stats: { sunlight: 2, weight: 4, price: 4 }, details: ['Glare enjoys it too', '180 g', 'Often discounted'], note: 'Feels great until the sun appears and starts an argument.' },
      { id: 'vapor-70', name: 'Vapor 70', eyebrow: 'Suspiciously perfect on paper.', stats: { sunlight: 4, weight: 5, price: 2 }, details: ['Bright flat panel', '159 g', 'Apparently sold only to witnesses'], note: 'The best phone is, traditionally, the one currently unavailable.' }
    ]
  },
  bike: {
    thread: 'bike',
    title: 'This was supposed to be a quick look.',
    intro: 'Three bikes later, you have developed opinions about rear subframes.',
    priorities: [
      { id: 'weight', label: 'Low weight' },
      { id: 'passenger', label: 'Passenger' },
      { id: 'character', label: 'Character' }
    ],
    items: [
      { id: 'alpine-310', name: 'Alpine 310', eyebrow: 'Friendly, efficient, mildly electric toothbrush.', stats: { weight: 4, passenger: 2, character: 3 }, details: ['175 kg', 'Fuel injection', 'Rear seat exists legally'], note: 'Good at nearly everything except pretending it has no vibrations.' },
      { id: 'vagrant-300', name: 'Vagrant 300 Rally', eyebrow: 'Light, simple, built around a seat-shaped warning.', stats: { weight: 5, passenger: 1, character: 4 }, details: ['150 kg', 'Fuel injection', 'Passenger becomes a stakeholder'], note: 'Excellent if your passenger has wronged you.' },
      { id: 'transcontinental-700', name: 'Transcontinental 700', eyebrow: 'Comfortable, competent, gravitationally committed.', stats: { weight: 1, passenger: 5, character: 4 }, details: ['214 kg', 'Fuel injection', 'Actual two-person seat'], note: 'The answer to many questions, including “what did I just drop?”' }
    ]
  }
};

export const SOURCE_CHECKS = {
  passenger: {
    thread: 'passenger',
    title: 'Three people say the passenger seat is fine.',
    intro: 'Only one of these statements is worth much. Tap the cards before trusting anybody.',
    sources: [
      { id: 'owner', quote: 'Passenger comfort is excellent.', author: 'BikeOwner88', context: '172 cm. Has never carried a passenger. “My wife says it looks comfy.”', reliability: 1 },
      { id: 'reviewer', quote: 'Fine for short rides, cramped after about an hour.', author: 'Touring review', context: 'Tested with two riders, 186 cm / 168 cm, over 240 km including motorway.', reliability: 5 },
      { id: 'dealer', quote: 'Best pillion seat in the class.', author: 'Dealer listing', context: 'Also describes the 11-litre tank as “continent crushing.”', reliability: 2 }
    ]
  }
};

export const STORY_NODES = {
  'phone-start': {
    thread: 'phone', location: 'Outside, regrettably', title: 'The sun has opinions about your phone.',
    body: ['You step outside. The display immediately becomes a tasteful medium gray.', 'You increase brightness. The phone increases its temperature instead.'],
    choices: [
      { label: 'Compare replacement phones', next: 'compare:phone', prefs: { sunlight: 2 }, history: 'Decided that seeing the screen is technically a feature.' },
      { label: 'Investigate anti-glare film first', next: 'phone-film', prefs: { frugal: 1, tinker: 1 }, history: 'Tried to solve a hardware problem with a rectangle of plastic.' },
      { label: 'Pretend this is fine', next: 'phone-denial', prefs: { stubborn: 1 }, history: 'Selected denial, the cheapest accessory.' }
    ]
  },
  'phone-film': {
    thread: 'phone', location: 'Electronics shop', title: 'Signe has three screen protectors and no patience.',
    body: ['“Matte helps glare,” she says. “It also makes your expensive OLED look like it has been laminated by a municipality.”', 'She hands you a sample anyway.'],
    choices: [
      { label: 'Take the sample, then compare phones anyway', next: 'compare:phone', inventory: ['matte-film'], prefs: { tinker: 1 }, history: 'Acquired matte film. Continued shopping, obviously.' },
      { label: 'Ask whether there is a magic fourth option', next: 'phone-magic', prefs: { optimization: 1 }, history: 'Asked retail staff for a product that violates trade-offs.' }
    ]
  },
  'phone-magic': {
    thread: 'phone', location: 'Electronics shop', title: 'There is always a fourth option.',
    body: ['Signe lowers her voice. “Wait six months for the next model.”', 'You stare at her. She stares back. Retail has defeated you.'],
    choices: [{ label: 'Fine. Compare the current ones.', next: 'compare:phone', prefs: { patience: -1 } }]
  },
  'phone-denial': {
    thread: 'phone', location: 'Outside, still regrettably', title: 'Denial lasts eleven seconds.',
    body: ['A message arrives. You cannot read it.', 'Congratulations: empirical testing has concluded.'],
    choices: [{ label: 'Compare phones', next: 'compare:phone', prefs: { sunlight: 1 } }]
  },
  'phone-after-compare': {
    thread: 'phone', location: 'Your increasingly serious notes', title: 'The answer has made things worse.',
    body: ['Your “winner” has one flaw. Naturally it is the flaw you care about second-most.', 'Before you can reopen the table, a marketplace message arrives from a man named Frank.'],
    choices: [
      { label: 'Open Frank’s message', next: 'bike-tip', unlockThreads: ['marketplace', 'bike'], history: 'Opened a marketplace message instead of finishing the phone decision.' },
      { label: 'Check one review first', next: 'phone-review', prefs: { researchDepth: 1 }, history: 'Needed one more review. This is how it happens.' }
    ]
  },
  'phone-review': {
    thread: 'sources', location: 'The internet', title: 'Every review agrees, except where they disagree.',
    body: ['Reviewer A calls it “featherweight.” Reviewer B calls it “surprisingly substantial.”', 'They differ in hand size by fourteen centimetres and in sponsorship status by one invoice.'],
    choices: [{ label: 'Fine. Open Frank’s message.', next: 'bike-tip', unlockThreads: ['sources', 'marketplace', 'bike'], prefs: { skepticism: 1 } }]
  },
  'bike-tip': {
    thread: 'marketplace', location: 'Marketplace chat', title: 'Frank does not want your phone.',
    body: ['FRANK: “Sorry mate, bought another one.”', 'FRANK: “But you look like someone who overthinks purchases. My neighbour is selling a bike.”', 'He sends a listing. 169 kg. Fuel injection. Cheap enough to be suspicious.'],
    choices: [
      { label: 'I will only look at the listing', next: 'compare:bike', prefs: { selfDeception: 2 }, history: 'Promised to only look at a motorcycle listing.' },
      { label: 'Ask the sensible question: passenger seat?', next: 'source:passenger', prefs: { passenger: 2 }, unlockThreads: ['passenger'], history: 'Asked about the passenger before horsepower. Suspicious maturity.' }
    ]
  },
  'bike-after-compare': {
    thread: 'bike', location: 'Motorcycle listing', title: 'Now you need to see it in person.',
    body: ['The numbers have stopped being helpful in the traditional way: they created a new question.', 'Frank says the bike is behind his brother’s pizzeria until 20:30.'],
    choices: [
      { label: 'Ask about passenger comfort first', next: 'source:passenger', prefs: { passenger: 1 }, unlockThreads: ['passenger'] },
      { label: 'Go to the pizzeria', next: 'pizzeria-arrival', unlockThreads: ['pizza'], history: 'Went to inspect a motorcycle at a pizzeria. Still technically on task.' }
    ]
  },
  'passenger-after-source': {
    thread: 'passenger', location: 'Your notes', title: 'A useful answer. Disturbing.',
    body: ['The detailed two-person test wins. You write: “Fine for short rides. Not magic.”', 'Frank replies: “Come try it. We’re behind Luigi’s. Bring a 10 mm if you have one.”'],
    choices: [
      { label: 'Check the junk drawer first', next: 'socket-drawer', unlockThreads: ['socket'], prefs: { prepared: 1 } },
      { label: 'Just go. Someone always has a 10 mm.', next: 'pizzeria-arrival', unlockThreads: ['pizza'], prefs: { optimism: 1 } }
    ]
  },
  'socket-drawer': {
    thread: 'socket', location: 'Home', title: 'The drawer contains civilization.',
    body: ['USB-A cables. A SIM eject tool. Three dead batteries. A key nobody recognizes.', 'At the bottom: a 10 mm socket. This is statistically impossible.'],
    choices: [
      { label: 'Take it and leave before reality notices', next: 'pizzeria-arrival', inventory: ['10mm-socket'], unlockThreads: ['pizza', 'cable'], history: 'Found the legendary 10 mm socket.' },
      { label: 'Also inspect the mystery cable', next: 'mystery-cable', unlockThreads: ['cable'], prefs: { cableHoarding: 2 } }
    ]
  },
  'mystery-cable': {
    thread: 'cable', location: 'Home', title: 'It has Mini-USB on one end.',
    body: ['You have not owned anything with Mini-USB in eleven years.', 'Throwing it away would guarantee a critical need for it tomorrow.'],
    choices: [
      { label: 'Keep it. Obviously.', next: 'pizzeria-arrival', inventory: ['mystery-cable', '10mm-socket'], prefs: { cableHoarding: 1 } },
      { label: 'Throw it away', next: 'pizzeria-arrival', prefs: { courage: 3 }, history: 'Disposed of a cable without first identifying it. Reckless.' }
    ]
  },
  'pizzeria-arrival': {
    thread: 'pizza', location: 'Luigi’s — back room', title: 'The motorcycle is here. So is a router.',
    body: ['The bike is parked beside flour sacks. Frank is removing a side panel.', 'LUIGI: “DO NOT TOUCH THAT BOX.”', 'The Wi-Fi router is sitting directly on top of a translucent dough container.'],
    choices: [
      { label: 'Inspect the motorcycle, like a focused adult', next: 'bike-inspection', prefs: { focus: 1 } },
      { label: 'Why is the router on the dough?', next: 'router-dough', prefs: { curiosity: 2 }, unlockThreads: ['poolish'], history: 'Abandoned a motorcycle inspection to investigate router placement.' }
    ]
  },
  'router-dough': {
    thread: 'pizza', location: 'Luigi’s — back room', title: 'The router is “keeping it warm.”',
    body: ['FRANK: “Router runs warm. Free fermentation heater.”', 'LUIGI makes a noise normally heard when a gearbox loses oil pressure.', 'The container lid is clipped down tight.'],
    choices: [
      { label: 'Should poolish even be airtight?', next: 'poolish-research', prefs: { curiosity: 1, pizzaNerd: 1 }, unlockThreads: ['poolish'] },
      { label: 'Move the router and inspect the bike', next: 'bike-inspection', prefs: { practical: 1 } }
    ]
  },
  'poolish-research': {
    thread: 'poolish', location: 'A surprisingly heated flour discussion', title: 'Closed, yes. Pressure vessel, no.',
    body: ['You establish that the container should be covered so the preferment does not dry out, but it does not need to be cranked down like submarine hardware.', 'LUIGI: “Finally. A normal person.”', 'Frank looks personally betrayed by microbiology.'],
    choices: [
      { label: 'Loosen the lid. Now, the motorcycle.', next: 'bike-inspection', inventory: ['luigi-respect'], prefs: { practical: 1 } },
      { label: 'Ask Luigi what he thinks about ketchup', next: 'ketchup-trigger', unlockThreads: ['ketchup'], prefs: { chaos: 2 }, history: 'Introduced ketchup into an already unstable Italian environment.' }
    ]
  },
  'ketchup-trigger': {
    thread: 'ketchup', location: 'Luigi’s — no longer peaceful', title: 'You have activated the emergency topic.',
    body: ['LUIGI: “Ketchup is not a dressing.”', 'FRANK: “Course it is. You dress chips with it.”', 'A customer quietly opens a search engine. The room chooses sides.'],
    choices: [
      { label: 'Investigate this properly', next: 'ketchup-verdict', prefs: { researchDepth: 1, chaos: 1 } },
      { label: 'Refuse jurisdiction. Inspect bike.', next: 'bike-inspection', prefs: { focus: 2 } }
    ]
  },
  'ketchup-verdict': {
    thread: 'ketchup', location: 'The Court of Condiments', title: 'CASE CLOSED-ish',
    body: ['After definitions, counterexamples and one deeply unhelpful mustard tangent, the room accepts that ketchup can function as a dressing depending on usage.', 'LUIGI: “The court is corrupt.”', 'No one has changed their mind. Research is complete.'],
    choices: [{ label: 'At last, inspect the motorcycle', next: 'bike-inspection', inventory: ['condiment-ruling'], history: 'Settled ketchup law with no measurable benefit to society.' }]
  },
  'bike-inspection': {
    thread: 'bike', location: 'Behind Luigi’s', title: 'You finally touch the motorcycle.',
    body: ['The controls feel right. The bike is light enough to move without negotiating with gravity.', 'Then you look at the passenger seat. It appears to have been designed by someone who lost a bet.'],
    choices: [
      { label: 'Sit on it. Test the boring stuff.', next: 'final-decision', prefs: { practical: 1, passenger: 1 } },
      { label: 'Listen to the engine and immediately become irrational', next: 'final-decision', prefs: { character: 2, impulse: 1 } }
    ]
  },
  'final-decision': {
    thread: 'bike', location: 'Behind Luigi’s', title: 'You have enough information to decide.',
    body: ['This is normally where a sensible person stops researching.', 'The game would like to record that sentence for comedic purposes.'],
    choices: [
      { label: 'Buy it', next: 'ending-buy', prefs: { impulse: 2 }, inventory: ['motorcycle-key'], history: 'Bought the suspiciously reasonable motorcycle.' },
      { label: 'Walk away', next: 'ending-walk', prefs: { restraint: 3 }, history: 'Walked away from a purchase after actual research. Historic.' },
      { label: 'Save listing. “Think about it.”', next: 'ending-save', prefs: { selfDeception: 2, researchDepth: 1 }, history: 'Saved the listing, which is definitely not the same as continuing.' }
    ]
  },
  'ending-buy': {
    thread: 'bike', location: 'Home, later', title: 'A motorcycle key is now on the table.',
    body: ['You opened the game because your phone was hard to see outdoors.', 'You now own a motorcycle and hold a non-binding legal opinion about ketchup.'],
    choices: [{ label: 'Return to feed', close: true, completeRun: true }]
  },
  'ending-walk': {
    thread: 'bike', location: 'Home, later', title: 'You bought nothing.',
    body: ['This may look like failure to shareholders.', 'It is, statistically, your most advanced decision so far.'],
    choices: [{ label: 'Return to feed', close: true, completeRun: true }]
  },
  'ending-save': {
    thread: 'bike', location: 'Home, 23 minutes later', title: 'UPDATE: seller reduced the price.',
    body: ['Of course he did.', 'The rabbit hole remains operational.'],
    choices: [{ label: 'Return to feed', close: true, completeRun: true }]
  }
};

export const FEED_ITEMS = [
  { id: 'phone-itch', thread: 'phone', eyebrow: 'NOW', title: 'Your phone is doing the gray thing again.', text: 'Outdoor visibility has filed for divorce.', node: 'phone-start', when: (state) => !state.completedNodes.includes('phone-start') },
  { id: 'phone-resume', thread: 'phone', eyebrow: 'OPEN THREAD', title: 'You still have not chosen a phone.', text: 'This has not prevented you from forming seven new opinions.', node: 'compare:phone', when: (state) => state.flags.phoneStarted && !state.flags.phoneCompared },
  { id: 'bike-resume', thread: 'bike', eyebrow: 'FRANK', title: '“Just look at the listing.”', text: 'A sentence with an excellent historical safety record.', node: 'compare:bike', when: (state) => state.unlockedThreads.includes('bike') && !state.flags.bikeCompared },
  { id: 'ketchup-public', thread: 'ketchup', eyebrow: 'LOCAL ALERT', title: 'A man says ketchup is not a dressing.', text: 'Experts are using the word “depends.” Nobody is satisfied.', node: 'ketchup-trigger', when: (state) => state.completedRun && !state.completedNodes.includes('ketchup-trigger') },
  { id: 'one-more-update', thread: 'marketplace', eyebrow: '23 MIN AGO', title: 'The listing you saved changed price.', text: 'You are under no legal obligation to tap this.', node: 'final-decision', when: (state) => state.completedNodes.includes('ending-save') }
];

export const INVENTORY = {
  'matte-film': { label: 'Matte film sample', note: 'Makes glare less shiny and pixels more municipal.' },
  '10mm-socket': { label: '10 mm socket', note: 'Proof that miracles are occasionally hexagonal.' },
  'mystery-cable': { label: 'Mystery Mini-USB cable', note: 'Critical the day after disposal.' },
  'luigi-respect': { label: 'Luigi’s respect', note: 'Non-transferable. Easily revoked by condiment opinions.' },
  'condiment-ruling': { label: 'Condiment ruling', note: 'Legally worthless. Socially explosive.' },
  'motorcycle-key': { label: 'Motorcycle key', note: 'This began as a display-brightness problem.' }
};

# One More Thing — Design Bible v0.4

## North star

**“I was just checking something.”**

One More Thing is a mobile-first rabbit-hole adventure about the human urge to investigate one thing more. A tiny everyday question branches into research, people, objects, locations, unrelated domains, and eventually the realization that the original task is now several tabs behind.

The player should repeatedly think:

> Okay, just this branch too.

And later:

> How did I get here?

Distracting the player is not a failure state. **The distraction is the game.**

## Product pillars

### 1. Dopamine without sludge

The feed gives short, meaningful novelty hits: updates, messages, listings, contradictions, consequences and resurfacing old Threads. It is not an infinite stream of disposable cards.

### 2. Research with actual depth

Research is gameplay. Players compare trade-offs, inspect source context, test claims, ask people, visit places and make decisions under imperfect information. “Click to read the next paragraph” is not enough.

### 3. Rabbit holes cross domains

A motorcycle question may lead to Wi-Fi, dough fermentation, law, phones or condiments. A bird may lead to astronomy, holidays, a drone, pool placement, soil and local history. A quiet hum may lead through old wiring, a parcel, amateur radio and weather records. Cross-topic transitions should be surprising **and retrospectively logical**.

### 4. The world remembers

Choices create preferences, inventory, relationships, history, obligations and future temptations. Progress is not XP; it is accumulated context.

### 5. Intelligent dumbness

Humour is dry, consequence-based and treated seriously by the world. Avoid meme spam and random non-sequiturs. The absurd thing should make just enough sense to become a real problem.

## Mobile-first hard requirement

The game is designed first for portrait phones and one-thumb use.

- large touch targets
- portrait-first layouts
- 30-second to multi-hour sessions are equally valid
- safe interruption almost everywhere
- immediate persistence
- no virtual joysticks
- no tiny hotspot hunting
- desktop support is secondary

## Player role

The player is themself-ish: a curious adult with a phone, a home, some money, many interests and dangerous confidence that one more bit of information will produce certainty.

There are no classes or XP stats. Characterization emerges from behaviour.

## Core loop

**Trigger → Peek → Question → Investigation → Discovery → Branch → Decision → Consequence → One More Thing**

A good discovery does not simply answer a question; it creates a better question.

## Threads

Important subjects become persistent Threads. They may be new, active, parked, solved or resurfaced. A parked Thread can return because a price changed, an NPC replied, weather damaged a solution, a timetable moved, a remembered object became useful, or a previous assumption broke.

Threads are not traditional quests. They are the subjects the player has now made into their problem.

## Resurfacing rule

Completion must not mean content deletion. The world may bring an old Thread back when the return:

- follows from a previous decision or real-world change
- adds new information rather than repeating the old scene
- can connect to another active Thread
- respects what the player already learned
- remains finite and authored rather than becoming notification spam

A resurfaced Thread should feel like continuity, not punishment. The game may challenge a solution, but it must not erase the value of the player’s earlier investigation.

## Multi-thread world rule

A larger content layer should not be a chain of isolated mini-quests. It should create a network of independently discoverable Threads that can affect each other.

A healthy content network has:

- several entry points in the feed
- multiple valid traversal orders
- shared facts, objects or locations
- at least one moment where three or more Threads become useful on the same decision
- consequences that can park one Thread while advancing another

Personalisation may change temptations, jokes and recommendations, but it must not shrink the world to subjects already known from the player's history. Larger content additions should introduce genuinely unfamiliar domains.

## People and relationship rule

NPCs are not dialogue dispensers or friendship bars wearing names. A recurring person should have:

- stable expertise and at least one domain where they are genuinely useful
- bias, habits or blind spots that make their advice recognisably theirs
- memory of meaningful player behaviour
- the ability to create information, favours, friction and obligations
- a reason to exist outside the player’s current task

Relationship state records accumulated context: trust, warmth, boundaries, reliability and whether the player follows through. It must not become a grindable affection currency.

Good relationship consequences include:

- a person volunteering better information because the player was honest
- a favour returning later in a different Thread
- someone becoming cautious after a broken promise
- competence creating additional requests for help
- a boundary being respected even when it lowers immediate warmth

Bad relationship consequences include:

- repeating the same compliment for points
- gifting items merely because a meter crossed a threshold
- punishing every refusal
- forcing the player to please everyone
- making one “correct” social personality

## Promise and delayed-consequence rule

A commitment should not always resolve on the next click. The game may schedule a future feed event after several unrelated actions.

Delayed consequences must:

- be persisted in the save
- remain deterministic and testable
- clearly follow from an earlier choice
- allow the player to keep, renegotiate or break the commitment
- change state in a way the game can remember later

Delay is used to create continuity, not real-time pressure. The current prototype advances promises by meaningful player actions rather than wall-clock timers.

## Research mechanics

Useful research mechanics include comparisons where the ranking changes with player priorities, source inspection where context changes credibility, evidence boards where observations support competing explanations, conflicting claims, physical tests, NPC expertise/bias/misinformation, and remembered facts becoming tools later.

## Preference engine

The game observes choices instead of asking players to fill in a personality survey. Signals might include preference for low weight, passenger comfort, good UX, price, evidence quality, tinkering, restraint, character, planning, observation, synthesis, honesty, boundaries, reliability or chaos.

Preferences drive future recommendations, dialogue, jokes and temptation. The system may occasionally show the player its interpretation for comic effect, but it is not a conventional stat sheet.

## World and NPCs

The physical world is compact: home, shops, workshops, garages, cafés, offices, gardens and other recurring locations. Mobile scenes use clear meaningful interactions rather than pixel hunting.

People are excellent sources of information, misinformation, bias and problems. A character can be brilliant in one domain and catastrophically wrong in another.

## Progression

Progression consists of knowledge, objects, relationships, reputation, history, obligations and new investigative capabilities. The home acts as a visual save file and gradually fills with evidence of previous rabbit holes and people.

## Feed

The feed is the primary re-entry surface. It contains a finite set of meaningful items: Thread updates, messages, listings, consequences, local events and weird questions.

The intended feeling is “I’ll just see what changed,” not endless scrolling.

## Random opening rule

A fresh timeline should not repeatedly begin with the same tutorial-shaped problem. The opening is selected once from a curated pool and persisted immediately.

Randomness chooses the door, not the reality behind it. Reloading must never reroll an established timeline.

## AI policy

AI is not required for core gameplay. Central stories, systems, relationship effects and punchlines remain authored and deterministic enough to test.

Later AI may support dialogue variation, flavour, personalization and authoring tools, but the game must remain good if every model endpoint disappears tomorrow. AI may vary how a person phrases a message; it may not silently rewrite what that person remembers or what a promise means.

## Content architecture

Content is modular and data-driven. Topic packs define facts, comparisons, evidence boards, NPC knowledge, objects, locations, Threads, relationships, scheduled consequences, resurfacing conditions and crosslinks.

Known-player subjects can be useful as an accessible entry layer, but subsequent layers should deliberately expand beyond them. The game should learn what the player finds interesting, not merely repeat what the player already discussed elsewhere.

## Monetization hard no

No energy, gems, loot boxes, forced ads, pay-to-skip, streak coercion or purchasable research points.

## Other hard no

One More Thing must not become a quiz game, fetch-quest factory, AI-slop machine, dating-sim affection grinder, simulator for its own sake, spreadsheet with illustrations, or a project with 48 systems before it is fun.

## Does this belong?

A new feature should answer **yes** to at least four:

1. Does it create “one more thing” curiosity?
2. Does it create an interesting decision?
3. Can it connect to another part of the world?
4. Can previous actions affect it?
5. Is it interesting without XP or extrinsic reward?

Otherwise: **Rejected by Supreme Leadership.**

## Playable slice v0.4

The slice proves the feed is tempting, Threads feel persistent, research has interaction/depth, rabbit holes can cross domains coherently, and people can create remembered obligations without AI.

It contains four content layers:

1. phone → motorcycle → pizzeria → poolish → ketchup
2. bird → astronomy/drone/holiday → PC/power → pool/lawn → soil/local history
3. returning Threads → low hum/old wiring → parcel/receiver → amateur radio/weather → previous owner/holiday
4. Niels/Maja/Ada/Leif → favours, boundaries, promises, delayed follow-ups and a shared useful Saturday

The fourth layer introduces persistent relationship scores, action-count-based scheduled events, a People view, message-style conversations and an evolving Home shelf. Earlier v0.1–v0.3 saves migrate without reset.

## Production rule

Every milestone must end with something more playable on a phone. No milestone may exist only to prepare architecture for another preparation milestone.

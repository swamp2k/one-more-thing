# One More Thing

> **I was just checking something.**

A mobile-first rabbit-hole adventure about curiosity, distraction, research, people with suspicious confidence, and the dangerous belief that one more comparison will finally settle it.

## Playable slice v0.4

The current slice proves the core loop without a framework, backend or AI dependency:

- feed-driven triggers, messages and delayed consequences
- persistent rabbit-hole Threads with new, active, parked and resurfaced states
- randomized persistent opening across nine different starting problems
- data-driven story nodes, conversations and dialogue choices
- recurring people with relationship scores, memory and promises
- interactive comparisons whose ranking changes with player priorities
- source-quality investigation and reusable evidence boards
- preference signals inferred from player behaviour
- persistent inventory and an evolving Home shelf as a physical save file
- offline-capable installable PWA
- localStorage save migration from v0.1, v0.2 and v0.3

### Content layer one

Phone → motorcycle → passenger research → 10 mm socket → pizzeria → poolish → ketchup → motorcycle decision.

### Content layer two

Five separate entrances form one connected problem network:

- bird/window behaviour and evidence
- astronomy, satellites and a neighbour's drone
- holiday planning
- new-PC trade-offs and power use
- pool placement
- lawn diagnosis, soil and local history

The paths cross repeatedly. A drone photo can become a pool-planning tool; the PC can expose garden power use; pool placement can reveal lawn geometry; the lawn can uncover an old greenhouse foundation; the archive can create a new holiday lead.

### Content layer three — world memory

Solved and parked Threads can return when circumstances change:

- rain damages the bird solution and deletes the pool layout
- component prices move after the PC shortlist is finished
- ferry timetables undermine the holiday choice
- the lawn exposes a brass radio tag
- a low hum and a parcel for a former resident connect old wiring, amateur radio, weather observation, the greenhouse and the holiday island

### Content layer four — people and consequences

Four recurring people now remember how the player treats them:

- **Niels** — neighbour, drone owner and casual borrower of ladders
- **Maja** — garden-centre manager and soil realist
- **Ada** — repair-café organiser and radio technician
- **Leif** — local archivist and supplier of additional folders

Replies change persistent relationship scores and can schedule future events. A promise to attend the repair café does not immediately lead to the next scene: Saturday appears only after several other actions, at which point the game remembers whether the player turns up. Favours, boundaries, honesty and competence all create different follow-ups.

The new **People** view shows only encountered characters and summarizes the current relationship rather than exposing a conventional friendship XP system. Home also changes visually as people leave behind roof photos, soil kits, repair tokens, archive cards and a community favour map.

There are deliberately **no runtime dependencies**. The slice is plain HTML, CSS and ES modules so we can keep testing the game before investing in framework architecture.

## Run locally

Any static file server works. For example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Validation

```bash
npm run check
npm test
```

The tests use Node's built-in test runner and require no package installation. The current suite contains **40 tests** covering engine behaviour, save migration, randomized openings, every authored destination, feed references, rewards, relationship state, delayed events, promises, evidence boards, comparison scoring, cross-topic routes and resurfacing Thread state.

## Product rule

Every milestone must end in something perceptibly more playable on a phone. We do not build foundations for foundations.

See [`DESIGN_BIBLE.md`](./DESIGN_BIBLE.md) for the project constitution.

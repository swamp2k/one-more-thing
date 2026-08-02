# One More Thing

> **I was just checking something.**

A mobile-first rabbit-hole adventure about curiosity, distraction, research, people with suspicious confidence, and the dangerous belief that one more comparison will finally settle it.

## Playable slice v0.2

The current slice proves the core loop without a framework or backend:

- feed-driven triggers and resurfacing updates
- persistent rabbit-hole Threads
- data-driven story nodes and dialogue choices
- interactive comparisons whose ranking changes with player priorities
- source-quality investigation
- reusable evidence boards for observation and diagnosis
- preference signals inferred from player behaviour
- persistent inventory / home as a physical save file
- offline-capable installable PWA
- localStorage save migration from v0.1

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

The tests use Node's built-in test runner and require no package installation. They validate engine behaviour, save migration, every authored destination in the story graph, evidence boards and cross-topic routes.

## Product rule

Every milestone must end in something perceptibly more playable on a phone. We do not build foundations for foundations.

See [`DESIGN_BIBLE.md`](./DESIGN_BIBLE.md) for the project constitution.

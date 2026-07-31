# One More Thing

> **I was just checking something.**

A mobile-first rabbit-hole adventure about curiosity, distraction, product research, people with suspicious confidence, and the dangerous belief that one more comparison will finally settle it.

## Vertical slice v0.1

The first playable slice proves the core loop without a framework or backend:

- feed-driven triggers and resurfacing updates
- persistent rabbit-hole threads
- data-driven story nodes and dialogue choices
- interactive product comparisons with changing priorities
- source-quality investigation
- preference signals inferred from player behaviour
- persistent inventory / home as a physical save file
- phone → motorcycle → pizza cross-topic rabbit hole
- installable offline-capable PWA
- localStorage save state

There are deliberately **no runtime dependencies**. The vertical slice is plain HTML, CSS and ES modules so we can test the game before investing in framework architecture.

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

The tests use Node's built-in test runner and require no package installation.

## Product rule

Every milestone must end in something perceptibly more playable on a phone. We do not build foundations for foundations.

See [`DESIGN_BIBLE.md`](./DESIGN_BIBLE.md) for the project constitution.

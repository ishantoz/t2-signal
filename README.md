# t2-signal 🚧

⚠️ **Experimental Beta** - Not recommended for production use ⚠️

A lightweight reactive signals implementation for modern JavaScript applications. This is **beta software** and APIs may change without warning.

## Features

- 📡 Reactive primitives (signals, effects, derived values)
- 🔄 Automatic dependency tracking
- 🏎️ Lightweight (<1kb minified)
- 🦕 Browser and Node.js support
- 🧩 TypeScript first

## Installation

```bash
npm install t2-signal@beta
```

*Note: Requires Node v18+ or modern browser with ES modules support*

## API Documentation

### `signal<T>(initialValue: T)`

- Creates a reactive signal
- **Returns**:
  - `.value` getter/setter
  - `.subscribe(fn)` method

### `effect(fn: () => void)`

- Creates a reactive effect
- Automatically tracks dependencies
- Runs immediately and on dependency changes

### `derived<T>(fn: () => T)`

- Creates computed value
- **Returns**: Readonly signal with computed value

## Disclaimer

❗ This software is:

- In active development
- Not battle-tested
- Missing error boundaries
- Subject to breaking API changes
- Not officially supported

## License

MIT © 2024 ishantoz. See [LICENSE](./LICENSE) for details.

---

**v1.0.0-beta.1** - Experimental release - Use at your own risk

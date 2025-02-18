type Unsubscribe = () => void;
type EffectFn = () => void;

// Global stack to track active effects
let subscriberStack: Array<EffectFn> = [];

/**
 * Reactive state management primitives for building observable data patterns.
 * @module
 */

/**
 * Creates a reactive signal that can be observed for changes
 * @template T - Type of the stored value
 * @param value - Initial value
 * @returns {Object} Reactive signal object
 * @returns.value {T} - Current value (getter/setter)
 * @returns.subscribe {(fn: EffectFn) => Unsubscribe} - Subscription method
 * @example
 * const count = signal(0);
 * count.subscribe(() => console.log('Count changed:', count.value));
 * count.value = 42;
 */
export function signal<T>(value: T): { value: T; subscribe: (fn: EffectFn) => Unsubscribe } {
	const subscriptions = new Set<EffectFn>()

	return {
		/**
		 * Get current value and track dependencies
		 */
		get value(): T {
			const currentSubscriber = subscriberStack[subscriberStack.length - 1]
			if (currentSubscriber) {
				subscriptions.add(currentSubscriber)
			}
			return value
		},

		/**
		 * Update value and trigger subscriptions if value changed
		 */
		set value(updated: T) {
			if (value !== updated) {
				value = updated
				subscriptions.forEach((fn) => fn())
			}
		},

		/**
		 * Subscribe to value changes
		 * @param fn - Callback to execute on changes
		 * @returns Unsubscribe function
		 */
		subscribe(fn: EffectFn): Unsubscribe {
			subscriptions.add(fn)
			return () => subscriptions.delete(fn) // Unsubscribe function
		}
	}
}

/**
 * Creates a reactive effect that automatically tracks dependencies
 * @param {EffectFn} fn - Function to run immediately and re-run when dependencies change
 * @returns {void}
 * @example
 * effect(() => console.log('Count is:', count.value));
 */
export function effect(fn: EffectFn): void {
	const runEffect: EffectFn = () => {
		subscriberStack.push(runEffect)
		try {
			fn()
		} finally {
			subscriberStack.pop()
		}
	}

	runEffect()
}

/**
 * Creates a computed signal derived from other reactive values
 * @template T - Type of the computed value
 * @param {function(): T} fn - Pure function that computes the value
 * @returns {ReadonlySignal<T>} Read-only derived signal
 * @example
 * const doubled = derived(() => count.value * 2);
 * console.log(doubled.value); // 84 (when count is 42)
 */
export function derived<T>(fn: () => T): { readonly value: T } {
	const derivedSignal = signal(fn()) // Initialize with computed value
	effect(() => {
		derivedSignal.value = fn()
	})
	return derivedSignal
}

/** @typedef {() => void} Unsubscribe */
/** @typedef {() => void} EffectFn */
/** @typedef {{ readonly value: T }} ReadonlySignal */

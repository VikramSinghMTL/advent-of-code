import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true, // Enables global test functions like `describe`, `test`, and `expect`
		environment: 'node', // Use 'jsdom' if you're testing browser-based code
	},
});

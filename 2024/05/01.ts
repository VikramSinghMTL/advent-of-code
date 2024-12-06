import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const rules = new Map();

data.split('\n\n')[0]
	.split('\n')
	.map((rule) => {
		const [page1, page2] = rule.split('|');

		if (rules.has(page1)) {
			rules.get(page1).push(page2);
		} else {
			rules.set(page1, [page2]);
		}
	});

const updates = data
	.split('\n\n')[1]
	.split('\n')
	.map((update) => update.split(','));

let sum = 0;

updates.pop(); // For the last empty line.

for (const update of updates) {
	let badUpdate = false;
	/**
	 * Start from the end and check if all pages preceding it are
	 * not included in its rule. If so, the update is bad.
	 */
	for (let i = update.length - 1; i > 0; i--) {
		// Check if all pages preceding it are not included in its rule.
		if (
			rules.has(update[i]) &&
			update
				.slice(0, i)
				.some((page) => rules.get(update[i]).includes(page))
		) {
			badUpdate = true;
			break;
		}
	}

	// If it's a good update, grab the middle page.
	if (!badUpdate) {
		sum += parseInt(update[Math.floor(update.length / 2)]);
	}
}

console.log(sum);

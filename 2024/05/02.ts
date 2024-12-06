import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const rules = new Map();

data.split('\n\n')[0]
	.split('\n')
	.map((rule) => {
		const [page1, page2] = rule.split('|').map(Number);

		if (rules.has(page1)) {
			rules.get(page1).push(page2);
		} else {
			rules.set(page1, [page2]);
		}
	});

const updates = data
	.split('\n\n')[1]
	.split('\n')
	.map((update) => update.split(',').map(Number));

let sum = 0;

updates.pop();

const checkValidUpdate = (update: number[]) => {
	for (let i = update.length - 1; i > 0; i--) {
		// Check if all pages preceding it are not included in its rule.
		if (
			rules.has(update[i]) &&
			update
				.slice(0, i)
				.some((page) => rules.get(update[i]).includes(page))
		) {
			return i;
		}
	}

	return -1;
};

const fixUpdate = (update: number[], problemIndex: number) => {
	const pages = update.slice(0, problemIndex);

	for (let j = pages.length - 1; j >= 0; j--) {
		if (
			rules.has(update[problemIndex]) &&
			rules.get(update[problemIndex]).includes(pages[j])
		) {
			const temp = update[problemIndex];
			update[problemIndex] = update[j];
			update[j] = temp;
		}
	}
};

for (const update of updates) {
	let problemIndex = checkValidUpdate(update);
	let badUpdate = false;

	while (problemIndex !== -1) {
		badUpdate = true;
		fixUpdate(update, problemIndex);
		problemIndex = checkValidUpdate(update);
	}

	// If it's a bad update, grab the middle page.
	if (badUpdate) {
		sum += update[Math.floor(update.length / 2)];
	}
}

console.log(sum);

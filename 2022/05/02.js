import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const lines = data.split('\n');
let result = 0;

// In how many assignment pairs does one range fully contain the other?

/**
 * If the start of one is <= the start of the other,
 * and the end of one is >= the end of the other,
 * then one contains the other.
 */

lines.forEach(line => {
	if (line === '') return;

	const startA = Number.parseInt(line.split(',')[0].split('-')[0]);
	const endA = Number.parseInt(line.split(',')[0].split('-')[1]);
	const startB = Number.parseInt(line.split(',')[1].split('-')[0]);
	const endB = Number.parseInt(line.split(',')[1].split('-')[1]);

	if ((startA <= startB && endA >= endB)
		|| (startB <= startA && endB >= endA)) result++;
	else if (endA >= startB && startA <= endB || endB >= startA && endB <= startA ) result++;
});

console.log(result);

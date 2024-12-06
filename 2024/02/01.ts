import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const lines = data.split('\n');

// Last line is always blank so get rid of it.
lines.pop();

let safeReports = 0;

lines.forEach((line) => {
	const levels = line.split(' ').map(Number);
	let last = levels[0];
	let increasingOrDecreasing = Math.sign(levels[1] - last);
	const minThreshold = 1;
	const maxThreshold = 3;
	let reportIsSafe = true;

	/**
	 * The levels are either all increasing or all decreasing.
	 * Any two adjacent levels differ by at least one and at most three.
	 */
	for (let i = 1; i < levels.length; i++) {
		const current = levels[i];
		const diff = Math.abs(current - last);

		if (Math.sign(current - last) !== increasingOrDecreasing) {
			reportIsSafe = false;
			break;
		}

		if (diff < minThreshold || diff > maxThreshold) {
			reportIsSafe = false;
			break;
		}

		last = current;
	}

	if (reportIsSafe) {
		safeReports++;
	}
});

console.log(safeReports);

import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const tiles = data.replace(/(\n)+/g, '').split('');
let sum = 0;
const width = 140;

const pointToTile = (x: number, y: number) => tiles[x + y * width];
const checkNW = (x: number, y: number) =>
	pointToTile(x - 1, y - 1) === 'M' && pointToTile(x + 1, y + 1) === 'S';
const checkNE = (x: number, y: number) =>
	pointToTile(x + 1, y - 1) === 'M' && pointToTile(x - 1, y + 1) === 'S';
const checkSE = (x: number, y: number) =>
	pointToTile(x + 1, y + 1) === 'M' && pointToTile(x - 1, y - 1) === 'S';
const checkSW = (x: number, y: number) =>
	pointToTile(x - 1, y + 1) === 'M' && pointToTile(x + 1, y - 1) === 'S';

for (let y = 1; y < width - 1; y++) {
	for (let x = 1; x < width - 1; x++) {
		const tile = pointToTile(x, y);
		const checks = [checkNW, checkNE, checkSE, checkSW];
		let checkCount = 0;

		if (tile !== 'A') {
			continue;
		}

		for (const check of checks) {
			if (check(x, y)) {
				checkCount++;
			}
		}

		if (checkCount >= 2) {
			sum += 1;
		}
	}
}

console.log(sum);

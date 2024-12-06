import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const tiles = data.replace(/(\n)+/g, '').split('');
let sum = 0;
const width = 140;

const pointToTile = (x: number, y: number) => tiles[x + y * width];
const checkRight = (x: number, y: number) =>
	pointToTile(x + 1, y) === 'M' &&
	pointToTile(x + 2, y) === 'A' &&
	pointToTile(x + 3, y) === 'S';
const checkDown = (x: number, y: number) =>
	pointToTile(x, y + 1) === 'M' &&
	pointToTile(x, y + 2) === 'A' &&
	pointToTile(x, y + 3) === 'S';
const checkDiagonalSE = (x: number, y: number) =>
	pointToTile(x + 1, y + 1) === 'M' &&
	pointToTile(x + 2, y + 2) === 'A' &&
	pointToTile(x + 3, y + 3) === 'S';
const checkDiagonalSW = (x: number, y: number) =>
	pointToTile(x - 1, y + 1) === 'M' &&
	pointToTile(x - 2, y + 2) === 'A' &&
	pointToTile(x - 3, y + 3) === 'S';
const checkDiagonalNE = (x: number, y: number) =>
	pointToTile(x + 1, y - 1) === 'M' &&
	pointToTile(x + 2, y - 2) === 'A' &&
	pointToTile(x + 3, y - 3) === 'S';
const checkDiagonalNW = (x: number, y: number) =>
	pointToTile(x - 1, y - 1) === 'M' &&
	pointToTile(x - 2, y - 2) === 'A' &&
	pointToTile(x - 3, y - 3) === 'S';
const checkLeft = (x: number, y: number) =>
	pointToTile(x - 1, y) === 'M' &&
	pointToTile(x - 2, y) === 'A' &&
	pointToTile(x - 3, y) === 'S';
const checkUp = (x: number, y: number) =>
	pointToTile(x, y - 1) === 'M' &&
	pointToTile(x, y - 2) === 'A' &&
	pointToTile(x, y - 3) === 'S';

for (let y = 0; y < width; y++) {
	for (let x = 0; x < width; x++) {
		const tile = pointToTile(x, y);

		if (tile !== 'X') {
			continue;
		}

		// If on the first row and first column, check right, down, and diagonal SE.
		if (x === 0 && y === 0) {
			if (checkRight(x, y)) {
				sum += 1;
			}
			if (checkDown(x, y)) {
				sum += 1;
			}
			if (checkDiagonalSE(x, y)) {
				sum += 1;
			}
		}

		// If on the first row and last column, check left, down, and diagonal SW.
		else if (x === width - 1 && y === 0) {
			if (checkLeft(x, y)) {
				sum += 1;
			}
			if (checkDown(x, y)) {
				sum += 1;
			}
			if (checkDiagonalSW(x, y)) {
				sum += 1;
			}
		}

		// If on the last row and first column, check right, up, and diagonal NE.
		else if (x === 0 && y === width - 1) {
			if (checkRight(x, y)) {
				sum += 1;
			}
			if (checkUp(x, y)) {
				sum += 1;
			}
			if (checkDiagonalNE(x, y)) {
				sum += 1;
			}
		}

		// If on the last row and last column, check left, up, and diagonal NW.
		else if (x === width - 1 && y === width - 1) {
			if (checkLeft(x, y)) {
				sum += 1;
			}
			if (checkUp(x, y)) {
				sum += 1;
			}
			if (checkDiagonalNW(x, y)) {
				sum += 1;
			}
		}

		// If on the first row, check right, down, left, and diagonal SE, SW.
		else if (y === 0) {
			if (checkRight(x, y)) {
				sum += 1;
			}
			if (checkDown(x, y)) {
				sum += 1;
			}
			if (checkLeft(x, y)) {
				sum += 1;
			}
			if (checkDiagonalSE(x, y)) {
				sum += 1;
			}
			if (checkDiagonalSW(x, y)) {
				sum += 1;
			}
		}

		// If on the last row, check right, up, left, and diagonal NE, NW.
		else if (y === width - 1) {
			if (checkRight(x, y)) {
				sum += 1;
			}
			if (checkUp(x, y)) {
				sum += 1;
			}
			if (checkLeft(x, y)) {
				sum += 1;
			}
			if (checkDiagonalNE(x, y)) {
				sum += 1;
			}
			if (checkDiagonalNW(x, y)) {
				sum += 1;
			}
		}

		// If on the first column, check right, up, down, and diagonal SE, NE.
		else if (x === 0) {
			if (checkRight(x, y)) {
				sum += 1;
			}
			if (checkUp(x, y)) {
				sum += 1;
			}
			if (checkDown(x, y)) {
				sum += 1;
			}
			if (checkDiagonalSE(x, y)) {
				sum += 1;
			}
			if (checkDiagonalNE(x, y)) {
				sum += 1;
			}
		}

		// If on the last column, check left, up, down, and diagonal SW, NW.
		else if (x === width - 1) {
			if (checkLeft(x, y)) {
				sum += 1;
			}
			if (checkUp(x, y)) {
				sum += 1;
			}
			if (checkDown(x, y)) {
				sum += 1;
			}
			if (checkDiagonalSW(x, y)) {
				sum += 1;
			}
			if (checkDiagonalNW(x, y)) {
				sum += 1;
			}
		}

		// If in the middle, check all directions.
		else {
			if (checkRight(x, y)) {
				sum += 1;
			}
			if (checkDown(x, y)) {
				sum += 1;
			}
			if (checkDiagonalSE(x, y)) {
				sum += 1;
			}
			if (checkDiagonalSW(x, y)) {
				sum += 1;
			}
			if (checkDiagonalNE(x, y)) {
				sum += 1;
			}
			if (checkDiagonalNW(x, y)) {
				sum += 1;
			}
			if (checkLeft(x, y)) {
				sum += 1;
			}
			if (checkUp(x, y)) {
				sum += 1;
			}
		}
	}
}

console.log(sum);

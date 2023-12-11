import { readFile, appendFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const tiles = data.replace(/(\n)+/g, "").split("");
let sum = 0;
const width = 140;

// Last line is always blank so get rid of it.
// tiles.pop();

// I can use tile = x + y * width where width = 10.

/**
 * For each tile, check the 8 surrounding tiles for a symbol.
 * If the tile x mod 10 == 0, left edge
 * If the tile y == 0, top edge
 * If the tile y == 9, bottom edge
 * If the tile (x+1) mod 10 == 0, right edge
 */

const pointToTile = (x: number, y: number) => tiles[x + y * width];
const pointIsSymbol = (x: number, y: number) => {
	const match = pointToTile(x, y).match(/[*$#+/=%@&-]?/);
	return !(match === null || match[0] === "");
};

for (let y = 0; y < width; y++) {
	let number = "";
	let foundSymbol = false;

	for (let x = 0; x < width; x++) {
		const tile = pointToTile(x, y);

		if (tile.match(/\d/)) {
			// Build the ongoing number
			number += tile;
		}

		// Need to keep track of current "whole" number
		// End of a "whole" number is either . or symbol or end of row
		if (tile === "." || pointIsSymbol(x, y) || x === width - 1) {
			// End of number
			if (number) {
				if (foundSymbol) {
					sum += Number(number);
				}
				console.log(number, foundSymbol, sum);
				await appendFile(
					"./output.txt",
					`${number}\t${foundSymbol}\t${sum}\n`
				);
			}

			number = "";
			foundSymbol = false;
			continue;
		}

		// Top left corner
		if (x === 0 && y === 0) {
			if (
				pointIsSymbol(x, y + 1) ||
				pointIsSymbol(x + 1, y + 1) ||
				pointIsSymbol(x + 1, y)
			) {
				foundSymbol = true;
			}
		}
		// Top edge
		else if (y === 0) {
			if (
				pointIsSymbol(x - 1, y) ||
				pointIsSymbol(x - 1, y + 1) ||
				pointIsSymbol(x, y + 1) ||
				pointIsSymbol(x + 1, y + 1) ||
				pointIsSymbol(x + 1, y)
			) {
				foundSymbol = true;
			}
		}
		// Top right corner
		else if (x === width - 1 && y === 0) {
			if (
				pointIsSymbol(x - 1, y) ||
				pointIsSymbol(x - 1, y + 1) ||
				pointIsSymbol(x, y + 1)
			) {
				foundSymbol = true;
			}
		}
		// Right edge
		else if (x === width - 1) {
			if (
				pointIsSymbol(x, y - 1) ||
				pointIsSymbol(x - 1, y - 1) ||
				pointIsSymbol(x - 1, y) ||
				pointIsSymbol(x - 1, y + 1) ||
				pointIsSymbol(x, y + 1)
			) {
				foundSymbol = true;
			}
		}
		// Bottom right corner
		else if (x === width - 1 && y === width - 1) {
			if (
				pointIsSymbol(x - 1, y) ||
				pointIsSymbol(x - 1, y - 1) ||
				pointIsSymbol(x, y - 1)
			) {
				foundSymbol = true;
			}
		}
		// Bottom edge
		else if (y === width - 1) {
			if (
				pointIsSymbol(x - 1, y) ||
				pointIsSymbol(x - 1, y - 1) ||
				pointIsSymbol(x, y - 1) ||
				pointIsSymbol(x + 1, y - 1) ||
				pointIsSymbol(x + 1, y)
			) {
				foundSymbol = true;
			}
		}
		// Bottom left corner
		else if (x === 0 && y === width - 1) {
			if (
				pointIsSymbol(x, y - 1) ||
				pointIsSymbol(x + 1, y - 1) ||
				pointIsSymbol(x + 1, y)
			) {
				foundSymbol = true;
			}
		}
		// Left edge
		else if (x === 0) {
			if (
				pointIsSymbol(x, y - 1) ||
				pointIsSymbol(x + 1, y - 1) ||
				pointIsSymbol(x + 1, y) ||
				pointIsSymbol(x + 1, y + 1) ||
				pointIsSymbol(x, y + 1)
			) {
				foundSymbol = true;
			}
		}
		// Middle
		else {
			if (
				pointIsSymbol(x, y - 1) ||
				pointIsSymbol(x + 1, y - 1) ||
				pointIsSymbol(x + 1, y) ||
				pointIsSymbol(x + 1, y + 1) ||
				pointIsSymbol(x, y + 1) ||
				pointIsSymbol(x - 1, y - 1) ||
				pointIsSymbol(x - 1, y) ||
				pointIsSymbol(x - 1, y + 1)
			) {
				foundSymbol = true;
			}
		}
	}
}

console.log(sum);

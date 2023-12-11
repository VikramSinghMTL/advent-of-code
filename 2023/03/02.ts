import { readFile, appendFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const tiles = data.replace(/(\n)+/g, "").split("");
let sum = 0;
const width = 140; // Change this for different inputs.

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

class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	isEquals(point: Point) {
		return this.x === point.x && this.y === point.y;
	}
}

type Gear = {
	number1: string;
	number2: string;
	location: Point;
};

class Gears {
	gears: Gear[] = [];

	add(location: Point) {
		if (this.contains(location)) {
			return;
		}

		this.gears.push({
			number1: "",
			number2: "",
			location,
		});
	}

	contains(location: Point): boolean {
		return this.gears.some((gear) => gear.location.isEquals(location));
	}

	addGearNumber(location: Point, number: string) {
		this.gears.forEach((gear) => {
			if (gear.location.isEquals(location)) {
				if (gear.number1 === "") {
					gear.number1 = number;
				} else {
					gear.number2 = number;
				}
			}
		});
	}

	filter() {
		this.gears = this.gears.filter(
			(gear) => gear.number1 !== "" && gear.number2 !== ""
		);
	}

	calculateGearRatio(): number {
		let gearRatio = 0;

		this.gears.forEach(
			(gear) => (gearRatio += Number(gear.number1) * Number(gear.number2))
		);

		return gearRatio;
	}
}

const gears = new Gears();

const pointToTile = (x: number, y: number) => tiles[x + y * width];
const pointIsSymbol = (x: number, y: number) => {
	const match = pointToTile(x, y).match(/[*$#+/=%@&-]?/);
	return !(match === null || match[0] === "");
};
const pointIsGear = (x: number, y: number) => pointToTile(x, y) === "*";

/**
 * Go until a number is found, check all spaces around for a gear.
 * Add the gear location to Gears, and when done parsing the number,
 * add the number to the gear. If the gear already has a number attached,
 * then this must be the second number.
 */
for (let y = 0; y < width; y++) {
	let number = "";
	let gearLocation: null | Point = null;

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
				if (gearLocation) {
					gears.addGearNumber(gearLocation, number);
				}
			}

			number = "";
			gearLocation = null;
			continue;
		}

		// Top left corner
		if (x === 0 && y === 0) {
			if (pointIsGear(x, y + 1)) gearLocation = new Point(x, y + 1);
			if (pointIsGear(x + 1, y + 1))
				gearLocation = new Point(x + 1, y + 1);
			if (pointIsGear(x + 1, y)) gearLocation = new Point(x + 1, y);

			if (gearLocation) gears.add(gearLocation);
		}
		// Top edge
		else if (y === 0) {
			if (pointIsGear(x - 1, y)) gearLocation = new Point(x - 1, y);
			if (pointIsGear(x - 1, y + 1))
				gearLocation = new Point(x - 1, y + 1);
			if (pointIsGear(x, y + 1)) gearLocation = new Point(x, y + 1);
			if (pointIsGear(x + 1, y + 1))
				gearLocation = new Point(x + 1, y + 1);
			if (pointIsGear(x + 1, y)) gearLocation = new Point(x + 1, y);

			if (gearLocation) gears.add(gearLocation);
		}
		// Top right corner
		else if (x === width - 1 && y === 0) {
			if (pointIsGear(x - 1, y)) gearLocation = new Point(x - 1, y);
			if (pointIsGear(x - 1, y + 1))
				gearLocation = new Point(x - 1, y + 1);
			if (pointIsGear(x, y + 1)) gearLocation = new Point(x, y + 1);

			if (gearLocation) gears.add(gearLocation);
		}
		// Right edge
		else if (x === width - 1) {
			if (pointIsGear(x, y - 1)) gearLocation = new Point(x, y - 1);
			if (pointIsGear(x - 1, y - 1))
				gearLocation = new Point(x - 1, y - 1);
			if (pointIsGear(x - 1, y)) gearLocation = new Point(x - 1, y);
			if (pointIsGear(x - 1, y + 1))
				gearLocation = new Point(x - 1, y + 1);
			if (pointIsGear(x, y + 1)) gearLocation = new Point(x, y + 1);

			if (gearLocation) gears.add(gearLocation);
		}
		// Bottom right corner
		else if (x === width - 1 && y === width - 1) {
			if (pointIsGear(x - 1, y)) gearLocation = new Point(x - 1, y);
			if (pointIsGear(x - 1, y - 1))
				gearLocation = new Point(x - 1, y - 1);
			if (pointIsGear(x, y - 1)) gearLocation = new Point(x, y - 1);

			if (gearLocation) gears.add(gearLocation);
		}
		// Bottom edge
		else if (y === width - 1) {
			if (pointIsGear(x - 1, y)) gearLocation = new Point(x - 1, y);
			if (pointIsGear(x - 1, y - 1))
				gearLocation = new Point(x - 1, y - 1);
			if (pointIsGear(x, y - 1)) gearLocation = new Point(x, y - 1);
			if (pointIsGear(x + 1, y - 1))
				gearLocation = new Point(x + 1, y - 1);
			if (pointIsGear(x + 1, y)) gearLocation = new Point(x + 1, y);

			if (gearLocation) gears.add(gearLocation);
		}
		// Bottom left corner
		else if (x === 0 && y === width - 1) {
			if (pointIsGear(x, y - 1)) gearLocation = new Point(x, y - 1);
			if (pointIsGear(x + 1, y - 1))
				gearLocation = new Point(x + 1, y - 1);
			if (pointIsGear(x + 1, y)) gearLocation = new Point(x + 1, y);

			if (gearLocation) gears.add(gearLocation);
		}
		// Left edge
		else if (x === 0) {
			if (pointIsGear(x, y - 1)) gearLocation = new Point(x, y - 1);
			if (pointIsGear(x + 1, y - 1))
				gearLocation = new Point(x + 1, y - 1);
			if (pointIsGear(x + 1, y)) gearLocation = new Point(x + 1, y);
			if (pointIsGear(x + 1, y + 1))
				gearLocation = new Point(x + 1, y + 1);
			if (pointIsGear(x, y + 1)) gearLocation = new Point(x, y + 1);

			if (gearLocation) gears.add(gearLocation);
		}
		// Middle
		else {
			if (pointIsGear(x, y - 1)) gearLocation = new Point(x, y - 1);
			if (pointIsGear(x + 1, y - 1))
				gearLocation = new Point(x + 1, y - 1);
			if (pointIsGear(x + 1, y)) gearLocation = new Point(x + 1, y);
			if (pointIsGear(x + 1, y + 1))
				gearLocation = new Point(x + 1, y + 1);
			if (pointIsGear(x, y + 1)) gearLocation = new Point(x, y + 1);
			if (pointIsGear(x - 1, y - 1))
				gearLocation = new Point(x - 1, y - 1);
			if (pointIsGear(x - 1, y)) gearLocation = new Point(x - 1, y);
			if (pointIsGear(x - 1, y + 1))
				gearLocation = new Point(x - 1, y + 1);

			if (gearLocation) gears.add(gearLocation);
		}
	}
}

// Some gears may only have one number, so get rid of those.
gears.filter();

await appendFile("./output.json", JSON.stringify(gears));

console.log(gears.calculateGearRatio());

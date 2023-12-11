import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");
let sum = 0;

// Last line is always blank so get rid of it.
lines.pop();

// 12 red cubes, 13 green cubes, and 14 blue cubes.

/**
 * For each game, check if the number of given red cubes
 * is less than or equal to the number of red cubes for
 * that game. Same with the green and blue. If all 3
 * conditions are true, this is a possible game.
 * Add the game ID to the sum total.
 */

const checkCubes = (segment: string) => {
	let reds = segment.match(/(\d+)(?= (?:red))/);
	let greens = segment.match(/(\d+)(?= (?:green))/);
	let blues = segment.match(/(\d+)(?= (?:blue))/);

	let redCount = reds ? Number(reds[0]) : 0;
	let greenCount = greens ? Number(greens[0]) : 0;
	let blueCount = blues ? Number(blues[0]) : 0;

	if (redCount > 12 || greenCount > 13 || blueCount > 14) {
		return false;
	}

	// console.log(reds, greens, blues);
	return true;
};

lines.forEach((line) => {
	const gameSegment = line.split(":")[0];
	const cubeSegment = line.split(":")[1];

	const idRegex = /Game (\d+)/;
	const idMatch = gameSegment.match(idRegex);
	const id = idMatch != null ? Number(idMatch[1]) : 0;

	if (cubeSegment.split(";").every(checkCubes)) {
		sum += id;

		console.log(id);
	}
});

console.log(sum);

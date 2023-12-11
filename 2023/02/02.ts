import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");
let sum = 0;

// Last line is always blank so get rid of it.
lines.pop();

type tableRow = {
	id: number;
	reds: number;
	greens: number;
	blues: number;
};

let table: tableRow[] = [];

const countCubes = (segment: string) => {
	let reds = segment.match(/(\d+)(?= (?:red))/);
	let greens = segment.match(/(\d+)(?= (?:green))/);
	let blues = segment.match(/(\d+)(?= (?:blue))/);

	let redCount = reds ? Number(reds[0]) : 0;
	let greenCount = greens ? Number(greens[0]) : 0;
	let blueCount = blues ? Number(blues[0]) : 0;

	return [redCount, greenCount, blueCount];
};

lines.forEach((line) => {
	const gameSegment = line.split(":")[0];
	const cubeSegment = line.split(":")[1];

	const idRegex = /Game (\d+)/;
	const idMatch = gameSegment.match(idRegex);
	const id = idMatch != null ? Number(idMatch[1]) : 0;

	let reds = 0;
	let greens = 0;
	let blues = 0;

	cubeSegment.split(";").forEach((segment) => {
		const cubes = countCubes(segment);

		reds = Math.max(reds, cubes[0]);
		greens = Math.max(greens, cubes[1]);
		blues = Math.max(blues, cubes[2]);
	});

	let power = reds * greens * blues;
	sum += power;

	table.push({ id, reds, greens, blues });
});

console.table(table);
console.log("Total: ", sum);

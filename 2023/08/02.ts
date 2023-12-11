import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");

// Last line is always blank so get rid of it.
lines.pop();

const directions = lines.shift()?.split("")!;

lines.shift();

const graph: { [key: string]: string[] } = {};

lines.forEach((line) => {
	const matches = line.match(/\w{3}/g)!;

	graph[matches[0]] = [];

	if (!graph[matches[0]].includes(matches[1])) {
		graph[matches[0]].push(matches[1]);
	}

	if (!graph[matches[0]].includes(matches[2])) {
		graph[matches[0]].push(matches[2]);
	}
});

const locations = Object.keys(graph).filter((key) => key.match(/..A/));

/**
 * The "trick" to this one is using the mathematical concept of the
 * lowest common multiple. Since the paths will step from A to Z in
 * a certain number of steps, we need to know what the step will be
 * when ALL paths land on Z.
 *
 * Path 1 steps from A to Z every 2 steps.
 * Path 2 steps from A to Z every 3 steps.
 * This means that the earliest possible step where both will land on
 * Z will be the 6th step. Hence, lowest common multiple of paths 1 and 2.
 */

const counts = locations.map((location) => {
	const workingDirections = JSON.parse(JSON.stringify(directions));
	let count = 1;

	while (true) {
		const direction =
			workingDirections[0] === "L" || graph[location].length === 1
				? 0
				: 1;

		location = graph[location][direction];

		if (location.match(/..Z/)) {
			console.log(count);
			return count;
		}

		workingDirections.push(workingDirections.shift()!);

		count++;
	}
});

function gcd(a: number, b: number): number {
	return !b ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
	return (a * b) / gcd(a, b);
}

console.log(counts.reduce((previous, current) => lcm(previous, current)));

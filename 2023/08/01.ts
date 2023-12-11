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

let location: string = "AAA";
let count = 1;

while (true) {
	const direction =
		directions[0] === "L" || graph[location].length === 1 ? 0 : 1;

	location = graph[location][direction];

	if (location === "ZZZ") {
		break;
	}

	directions.push(directions.shift()!);

	count++;
}

console.log(count);

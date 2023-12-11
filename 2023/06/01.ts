import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");

// Last line is always blank so get rid of it.
lines.pop();

const times = lines[0].match(/(\d+)/g)!;
const distances = lines[1].match(/(\d+)/g)!;

let result = 0;

for (let j = 0; j < times.length; j++) {
	const equation = (x: number) => -1 * Math.pow(x, 2) + Number(times[j]) * x;
	let sum = 0;

	for (let i = 0; i < Number(times[j]); i++) {
		if (equation(i) > Number(distances[j])) {
			sum++;
		}
	}

	result = result === 0 ? sum : result * sum;
}

console.log(result);

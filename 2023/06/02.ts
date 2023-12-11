import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");

// Last line is always blank so get rid of it.
lines.pop();

const times = lines[0].match(/(\d+)/g)!;
const distances = lines[1].match(/(\d+)/g)!;

const time = Number(times[0]);
const distance = Number(distances[0]);

const equation = (x: number) => -1 * Math.pow(x, 2) + time * x;
const h = time / 2;
const k = equation(h);

// amount to shift parabola over to the left (first zero)
const equation2 = () =>
	(time - Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2;

// amount to go up to (second zero)
const equation3 = () =>
	(time + Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2;

const equation4 = (x: number) =>
	-1 * Math.pow(x - h + equation2(), 2) + k - distance;

console.log(Math.floor(equation3() - equation2()));

import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");
let sum = 0;

// Last line is always blank so get rid of it.
lines.pop();

lines.forEach((line) => {
	const regex = /(\d)(?:.*(\d))?/;
	const matches = line.match(regex);
	const firstNumber = matches ? matches[1] : "";
	const secondNumber = matches
		? matches[2] === undefined
			? firstNumber
			: matches[2]
		: firstNumber;
	const number = Number(firstNumber + secondNumber);
	sum += number;
	console.log(firstNumber, secondNumber, number);
});

console.log(sum);

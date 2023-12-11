import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");
let sum = 0;

// Last line is always blank so get rid of it.
lines.pop();

const numberMap: { [index: string]: string } = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
	zero: "0",
};

lines.forEach((line) => {
	const regex =
		/(\d|one|two|three|four|five|six|seven|eight|nine|zero)(?:.*(\d|one|two|three|four|five|six|seven|eight|nine|zero))?/;
	const matches = line.match(regex);
	let firstNumber = matches ? matches[1] : "zero";

	if (Object.keys(numberMap).includes(firstNumber)) {
		firstNumber = numberMap[firstNumber];
	}

	let secondNumber = matches
		? matches[2] === undefined
			? firstNumber
			: matches[2]
		: firstNumber;

	if (Object.keys(numberMap).includes(secondNumber)) {
		secondNumber = numberMap[secondNumber];
	}

	const number = Number(firstNumber + secondNumber);

	sum += number;

	console.log(firstNumber, secondNumber, number);
});

console.log(sum);

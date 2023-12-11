import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");
let sum = 0;

// Last line is always blank so get rid of it.
lines.pop();

lines.forEach((line) => {
	const regex = /(\d+)/g;
	const numbers = line.match(regex);
	let numberOfWinners = 0;

	numbers?.shift();

	const winners = numbers?.splice(0, 10);

	console.log(winners, numbers);

	numbers?.forEach((number) => {
		if (winners?.includes(number)) {
			numberOfWinners++;
		}
	});

	let points = 0;

	if (numberOfWinners > 1) {
		points = Math.pow(2, numberOfWinners - 1);
	} else if (numberOfWinners == 1) {
		points = 1;
	}

	sum += points;

	console.log(points);
});

console.log(sum);

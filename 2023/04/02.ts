import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");
let sum = 0;

// Last line is always blank so get rid of it.
lines.pop();

const numberOfCards: any = {};

/**
 * Map of cardId -> numberOfCards
 * First time seeing a card, add to the map with value 1
 * If adding a card as a result of a match, add 1 to the map[cardId]
 * At the end, loop through map and add up all values.
 */

for (let i = 0; i < lines.length; i++) {
	const regex = /(\d+)/g;
	const numbers = lines[i].match(regex) ?? [];
	let numberOfWinners = 0;

	const id = numbers?.shift() ?? "0";
	const winners = numbers?.splice(0, 10) ?? [];

	if (numberOfCards[id]) {
		numberOfCards[id]++;
	} else {
		numberOfCards[id] = 1;
	}

	numbers?.forEach((number) => {
		if (winners?.includes(number)) {
			numberOfWinners++;
		}
	});

	for (let k = 0; k < numberOfCards[id]; k++) {
		for (let j = Number(id) + 1; j <= Number(id) + numberOfWinners; j++) {
			if (numberOfCards[j]) {
				numberOfCards[j]++;
			} else {
				numberOfCards[j] = 1;
			}
		}
	}
}

Object.keys(numberOfCards).forEach((key) => (sum += numberOfCards[key]));

console.log(sum);

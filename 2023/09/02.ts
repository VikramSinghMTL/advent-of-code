import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");

// Last line is always blank so get rid of it.
lines.pop();

/**
 * [
 *   [3, 6, 9, 12, 15]
 *   [3, 3, 3, 3, 3]
 *   [0, 0, 0, 0, 0]
 * ]
 */

const differenceSets: number[][][] = [];

lines.forEach((line, index) => {
	differenceSets.push([]);
	differenceSets[index].push(
		line.match(/-?\d+/g)?.map((match) => Number(match))!
	);
});

const calculateDifferences = (numbers: number[]): number[] => {
	const differences: number[] = [];

	for (let i = numbers.length - 1; i > 0; i--) {
		differences.unshift(numbers[i] - numbers[i - 1]);
	}

	return differences;
};

const calculateNext = (lastNumber: number, difference: number): number =>
	lastNumber - difference;

const determineNextInSequence = (differences: number[][]): number => {
	while (
		differences[differences.length - 1].some(
			(difference) => difference !== 0
		)
	) {
		differences.push(
			calculateDifferences(differences[differences.length - 1])
		);
	}

	for (let i = differences.length - 1; i > 0; i--) {
		differences[i - 1].unshift(
			calculateNext(differences[i - 1][0], differences[i][0])
		);
	}

	return differences[0][0];
};

const result = differenceSets.reduce(
	(previous, current) => previous + determineNextInSequence(current),
	0
);

console.log(result);

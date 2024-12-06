import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const lines = data.split('\n').filter((line) => line.trim().length > 0);

const checkArrayConditionsWithRemoval = (numbers: number[]): boolean => {
	const checkArrayConditions = (numbers: number[]): boolean => {
		const isIncreasing = numbers.every(
			(_, i, arr) => i === 0 || arr[i] > arr[i - 1]
		);
		const isDecreasing = numbers.every(
			(_, i, arr) => i === 0 || arr[i] < arr[i - 1]
		);

		if (!isIncreasing && !isDecreasing) {
			return false;
		}

		const validDifferences = numbers.every(
			(_, i, arr) =>
				i === 0 ||
				(Math.abs(arr[i] - arr[i - 1]) >= 1 &&
					Math.abs(arr[i] - arr[i - 1]) <= 3)
		);

		return validDifferences;
	};

	// Check if the array itself meets the conditions
	if (checkArrayConditions(numbers)) {
		return true;
	}

	// Try removing each element and check the conditions
	for (let i = 0; i < numbers.length; i++) {
		const modifiedArray = numbers.slice(0, i).concat(numbers.slice(i + 1));
		if (checkArrayConditions(modifiedArray)) {
			return true;
		}
	}

	return false;
};

let safeReports = 0;

for (const line in lines) {
	const levels = lines[line].split(' ').map(Number);

	if (checkArrayConditionsWithRemoval(levels)) {
		safeReports++;
	}
}

console.log(safeReports);

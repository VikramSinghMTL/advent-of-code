import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const lines = data.split('\n');

// Last line is always blank so get rid of it.
lines.pop();

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

let sum = 0;

lines.forEach((line) => {
	for (const match of line.matchAll(regex)) {
		const firstMultiplicand = parseInt(match[1], 10);
		const secondMultiplicand = parseInt(match[2], 10);
		const product = firstMultiplicand * secondMultiplicand;

		sum += product;

		console.log(
			`Matched: ${match[0]}, Numbers: ${firstMultiplicand}, ${secondMultiplicand}, Product: ${product}`
		);
	}
});

console.log(`Sum of all products: ${sum}`);

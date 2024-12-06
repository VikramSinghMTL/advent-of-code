import { readFile } from 'node:fs/promises';

let data = await readFile('./input.txt', 'utf8');

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const doDontRegex = /do\(\)(.*?)don't\(\)/g;

// Initialize the sum
let sum = 0;

// Step 1: Calculate `mul(x, y)` preceding the first `do()` or `don't()`
const firstDoDontMatch = data.search(/do\(\)|don't\(\)/); // Position of the first `do()` or `don't()`

if (firstDoDontMatch > 0) {
	const prefix = data.slice(0, firstDoDontMatch); // Get content before the first `do()` or `don't()`
	console.log(`Processing prefix: ${prefix}`);
	for (const mulMatch of prefix.matchAll(mulRegex)) {
		const x = parseInt(mulMatch[1], 10);
		const y = parseInt(mulMatch[2], 10);
		const product = x * y;
		sum += product;
		console.log(`Found mul(${x},${y}), Product: ${product}`);
	}
}

const matches = data.matchAll(doDontRegex);

for (const match of matches) {
	const fullMatch = match[1];

	for (const match of fullMatch.matchAll(mulRegex)) {
		const num1 = parseInt(match[1], 10); // First capture group
		const num2 = parseInt(match[2], 10); // Second capture group
		const product = num1 * num2;
		sum += product;
		console.log(
			`Matched: ${match[0]}, Numbers: ${num1}, ${num2}, Product: ${product}`
		);
	}
}

console.log(`Sum of all products: ${sum}`);

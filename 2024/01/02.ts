import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const lines = data.split('\n');

// Last line is always blank so get rid of it.
lines.pop();

const list1: number[] = [];
const list2: number[] = [];

lines.forEach((line) => {
	const [value1, value2] = line.split('   ').map(Number);

	list1.push(value1);
	list2.push(value2);
});

const frequencies = new Map<number, number>();

list1.forEach((value) => {
	list2.forEach((value2) => {
		if (value === value2) {
			if (frequencies.has(value)) {
				frequencies.set(value, frequencies.get(value)! + 1);
			} else {
				frequencies.set(value, 1);
			}
		}
	});
});

let sum = 0;

frequencies.forEach((value, key) => {
	console.log(`${key}: ${value}`);
	sum += key * value;
});

console.log(sum);

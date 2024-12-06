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

list1.sort((a: number, b: number) => a - b);
list2.sort((a: number, b: number) => a - b);

let sum = 0;

list1.forEach((value) => {
	sum += Math.abs(value - (list2.shift() || 0));
});

console.log(sum);

import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const lines = data.split('\n');
const sums = [0];
let i = 0;

lines.forEach(line => {
	if (line === '') {
		i++;
		sums[i] = 0;
		return;
	}

	sums[i] += Number.parseInt(line);
})

console.log(Math.max(...sums));

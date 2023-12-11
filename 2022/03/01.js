import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const lines = data.split('\n');
let result = 0;

const isUpperCase = character => character.charCodeAt(0) <= 90;
const calculateResult = character => isUpperCase(character) ? character.charCodeAt(0) - 38 : character.charCodeAt(0) - 96;

lines.forEach(line => {
	const midPoint = line.length / 2;
	const firstHalf = line.slice(0, midPoint).split('');
	const secondHalf = line.slice(midPoint, line.length).split('');

	for (let i = 0; i < firstHalf.length; i++) {
		for (let j = 0; j < secondHalf.length; j++) {
			if (firstHalf[i] !== secondHalf[j]) continue;

			result += calculateResult(firstHalf[i]);
			i = firstHalf.length;
			break;
		}
	}
});

console.log(result);

import { readFile } from 'node:fs/promises';

const data = await readFile('./input2.txt', 'utf8');
const lines = data.split('\n');
let result = 0;

const isUpperCase = character => character.charCodeAt(0) <= 90;
const calculateResult = character => isUpperCase(character) ? character.charCodeAt(0) - 38 : character.charCodeAt(0) - 96;

// I mean... this works but wow is it a disaster 😅
for (let lineCounter = 0; lineCounter < lines.length; lineCounter += 3) {
	for (let i = 0; i < lines[lineCounter].length; i++) {
		for (let j = 0; j < lines[lineCounter + 1].length; j++) {
			if (lines[lineCounter][i] !== lines[lineCounter + 1][j]) continue;
			for (let k = 0; k < lines[lineCounter + 2].length; k++) {
				if (lines[lineCounter + 1][j] !== lines[lineCounter + 2][k]) continue;

				result += calculateResult(lines[lineCounter][i]);
				j = lines[lineCounter + 1].length;
				i = lines[lineCounter].length;
				break;
			}
		}
	}
}

console.log(result);

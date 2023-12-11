import { readFile } from 'node:fs/promises';

const data = await readFile('./input.txt', 'utf8');
const lines = data.split('\n');

const Points = {
	Win: 6,
	Lose: 0,
	Draw: 3,
	Rock: 1,
	Paper: 2,
	Scissors: 3,
};

const Move = {
	A: Points.Rock,
	B: Points.Paper,
	C: Points.Scissors,
	X: Points.Lose,
	Y: Points.Lose,
	Z: Points.Win,
};

const getMoves = pair => {
	const opponent = Move[pair[0]];
	const outcome = Move[pair[1]];

	return { opponent, outcome };
}

const results = lines.map(line => {
	const pair = line.split(' ');
	const { opponent, outcome } = getMoves(pair);

	switch (opponent) {
		case Points.Rock:
			if (outcome === Points.Win) {
				return Points.Win + Points.Paper;
			}

			if (outcome === Points.Lose) {
				return Points.Lose + Points.Scissors;
			}

			if (outcome === Points.Draw) {
				return Points.Draw + Points.Rock;
			}
		case Points.Paper:
			if (outcome === Points.Win) {
				return Points.Win + Points.Scissors;
			}

			if (outcome === Points.Lose) {
				return Points.Lose + Points.Rock;
			}

			if (outcome === Points.Draw) {
				return Points.Draw + Points.Paper;
			}
		case Points.Scissors:
			if (outcome === Points.Win) {
				return Points.Win + Points.Rock;
			}

			if (outcome === Points.Lose) {
				return Points.Lose + Points.Paper;
			}

			if (outcome === Points.Draw) {
				return Points.Draw + Points.Scissors;
			}
	}

	return 0;
});

let sum = 0;

results.forEach(result => sum += result);

console.log(results);
console.log(sum);

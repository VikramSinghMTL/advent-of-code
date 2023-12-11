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
	X: Points.Rock,
	Y: Points.Paper,
	Z: Points.Scissors,
};

const getMoves = pair => {
	const opponent = Move[pair[0]];
	const player = Move[pair[1]];

	return { opponent, player };
}

const results = lines.map(line => {
	const pair = line.split(' ');
	const { opponent, player } = getMoves(pair);

	switch (opponent) {
		case Points.Rock:
			if (player === Points.Paper) {
				return Points.Win + Points.Paper;
			}

			if (player === Points.Scissors) {
				return Points.Lose + Points.Scissors;
			}

			if (player === Points.Rock) {
				return Points.Draw + Points.Rock;
			}
		case Points.Paper:
			if (player === Points.Scissors) {
				return Points.Win + Points.Scissors;
			}

			if (player === Points.Rock) {
				return Points.Lose + Points.Rock;
			}

			if (player === Points.Paper) {
				return Points.Draw + Points.Paper;
			}
		case Points.Scissors:
			if (player === Points.Rock) {
				return Points.Win + Points.Rock;
			}

			if (player === Points.Paper) {
				return Points.Lose + Points.Paper;
			}

			if (player === Points.Scissors) {
				return Points.Draw + Points.Scissors;
			}
	}

	return 0;
});

let sum = 0;

results.forEach(result => sum += result);

console.log(results);
console.log(sum);

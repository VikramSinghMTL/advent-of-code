import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");

// Last line is always blank so get rid of it.
lines.pop();

class Card {
	value: string;
	static rankings: { [key: string]: number } = {
		A: 14,
		K: 13,
		Q: 12,
		J: 11,
		T: 10,
		"9": 9,
		"8": 8,
		"7": 7,
		"6": 6,
		"5": 5,
		"4": 4,
		"3": 3,
		"2": 2,
	};

	constructor(value: string) {
		this.value = value;
	}

	compareTo(rhs: Card): number {
		return Card.rankings[this.value] - Card.rankings[rhs.value];
	}

	toString(): string {
		return this.value;
	}
}

class Hand {
	cards: Card[];
	bid: number;
	rank: number;

	constructor(cards: string, bid: number) {
		this.cards = cards.split("").map((card) => new Card(card));
		this.bid = bid;
		this.rank = this.determineRank(this.cards);
	}

	determineRank(cards: Card[]): number {
		const frequencies: { [key: string]: number } = {};

		cards.forEach((card) => {
			if (frequencies[card.value]) {
				frequencies[card.value]++;
			} else {
				frequencies[card.value] = 1;
			}
		});

		/**
		 * if freq has 1 entry -> 5OAK
		 * if freq has 2 entry -> 4OAK or FH
		 * if freq has 3 entry -> 3OAK or 2P
		 * if freq has 4 entry -> 1P
		 * if freq has 5 entry -> Nothing
		 */

		switch (Object.keys(frequencies).length) {
			case 1:
				return 6;
			case 2:
				return Object.entries(frequencies).some(
					(frequency) => frequency[1] === 4
				)
					? 5
					: 4;
			case 3:
				return Object.entries(frequencies).some(
					(frequency) => frequency[1] === 3
				)
					? 3
					: 2;
			case 4:
				return 1;
			default:
				return 0;
		}
	}

	/**
	 * @returns - if lhs < rhs, 0 if lhs == rhs, + if lhs > rhs.
	 */
	compareTo(rhs: Hand): number {
		if (this.rank !== rhs.rank) {
			return this.rank - rhs.rank;
		}

		for (let i = 0; i < this.cards.length; i++) {
			const comparison = this.cards[i].compareTo(rhs.cards[i]);

			if (comparison < 0) {
				return -1;
			} else if (comparison > 0) {
				return 1;
			}
		}

		return 0;
	}

	toString(): string {
		return `Rank: ${this.rank} Cards: ${this.cards} Bid: ${this.bid}`;
	}
}

class Hands {
	hands: Hand[] = [];

	add(hand: Hand) {
		if (this.hands.length === 0) {
			this.hands.push(hand);
		} else {
			this.hands.splice(this.find(hand), 0, hand);
		}
	}

	/**
	 * @param hand The hand to be inserted.
	 * @returns The index of where the hand is, or where it ought to go.
	 */
	find(hand: Hand): number {
		return this.binarySearch(hand);
	}

	binarySearch(hand: Hand): number {
		let low = 0;
		let high = this.hands.length - 1;
		let mid = Math.floor((low + high) / 2);

		while (low <= high) {
			if (this.hands[mid].compareTo(hand) < 0) {
				// The hand is on the right side.
				low = mid + 1;
			} else if (this.hands[mid].compareTo(hand) == 0) {
				// The hand was found!
				return mid;
			} else {
				// The hand is on the left side.
				high = mid - 1;
			}

			mid = Math.floor((low + high) / 2);
		}

		return low;
	}

	toString(): string {
		let result = "";

		this.hands.forEach((hand) => (result += hand.toString() + "\r\n"));

		return result;
	}
}

const hands = new Hands();

lines.forEach((line) => {
	const hand = line.match(/\w{5}/)!;
	const bid = line.match(/\d+$/)!;

	hands.add(new Hand(hand[0], Number(bid[0])));
});

let totalWinnings = 0;

hands.hands.forEach((hand, index) => {
	totalWinnings += hand.bid * (index + 1);

	// console.log(hand.toString());
});

console.log(totalWinnings);

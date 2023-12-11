import { appendFile, readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const tiles = data.replace(/(\n)+/g, "").split("");
const width = data.split("\n")[0].length;
const height = data.split("\n").length;

// Last line is always blank so get rid of it.
// lines.pop();

// type Direction = "north" | "east" | "south" | "west";
enum Direction {
	North,
	East,
	South,
	West,
}

type Point = { x: number; y: number };

const startingPosition: Point = { x: 0, y: 0 };

const oppositeDirection = (direction: Direction): Direction => {
	switch (direction) {
		case Direction.North:
			return Direction.South;
		case Direction.East:
			return Direction.West;
		case Direction.South:
			return Direction.North;
		case Direction.West:
			return Direction.East;
	}
};

const directions: { [key: string]: Direction[] } = {
	"|": [Direction.North, Direction.South],
	"-": [Direction.East, Direction.West],
	L: [Direction.North, Direction.East],
	J: [Direction.North, Direction.West],
	"7": [Direction.West, Direction.South],
	F: [Direction.East, Direction.South],
	".": [],
	S: [Direction.North, Direction.South, Direction.East, Direction.West],
};

const connections = {
	[Direction.North]: ["|", "L", "J", "S"],
	[Direction.South]: ["|", "F", "7", "S"],
	[Direction.East]: ["-", "F", "L", "S"],
	[Direction.West]: ["-", "7", "J", "S"],
};

const pointToTile = (point: Point): string => tiles[point.x + point.y * width];

const map: any = [];

for (let y = 0; y < height; y++) {
	map.push([]);
	for (let x = 0; x < width; x++) {
		if (pointToTile({ x, y }) === "S") {
			startingPosition.x = x;
			startingPosition.y = y;
			map[y].push("S");
			continue;
		}

		map[y].push("*");
	}
}

// type Tiles = [string, string, string, string];
type Tiles = {
	[Direction.North]: string | null;
	[Direction.East]: string | null;
	[Direction.South]: string | null;
	[Direction.West]: string | null;
};

const getSurroundingTiles = (point: Point): Tiles => {
	return {
		[Direction.North]: pointToTile({ x: point.x, y: point.y - 1 }),
		[Direction.East]: pointToTile({ x: point.x + 1, y: point.y }),
		[Direction.South]: pointToTile({ x: point.x, y: point.y + 1 }),
		[Direction.West]: pointToTile({ x: point.x - 1, y: point.y }),
	};
};

const visitedTiles = new Set<String>();

const pickDirection = (point: Point): Direction | null => {
	// const tiles = getTraversableTiles(point);

	if (
		directions[pointToTile(point)].includes(Direction.South) &&
		directions[pointToTile({ x: point.x, y: point.y + 1 })].includes(
			Direction.North
		) &&
		!visitedTiles.has(`${point.x}${point.y + 1}`)
	) {
		return Direction.South;
	}

	if (
		directions[pointToTile(point)].includes(Direction.North) &&
		directions[pointToTile({ x: point.x, y: point.y - 1 })].includes(
			Direction.South
		) &&
		!visitedTiles.has(`${point.x}${point.y - 1}`)
	) {
		return Direction.North;
	}

	if (
		directions[pointToTile(point)].includes(Direction.East) &&
		directions[pointToTile({ x: point.x + 1, y: point.y })].includes(
			Direction.West
		) &&
		!visitedTiles.has(`${point.x + 1}${point.y}`)
	) {
		return Direction.East;
	}

	if (
		directions[pointToTile(point)].includes(Direction.West) &&
		directions[pointToTile({ x: point.x - 1, y: point.y })].includes(
			Direction.East
		) &&
		!visitedTiles.has(`${point.x - 1}${point.y}`)
	) {
		return Direction.West;
	}

	return null;
};

const move = (point: Point, direction: Direction): boolean => {
	switch (direction) {
		case Direction.North:
			if (point.y - 1 < 0) {
				return false;
			}
			point.y--;
			map[point.y][point.x] = "^";
			break;
		case Direction.East:
			if (point.x + 1 > width) {
				return false;
			}
			point.x++;
			map[point.y][point.x] = ">";
			break;
		case Direction.South:
			if (point.y + 1 > height) {
				return false;
			}
			point.y++;
			map[point.y][point.x] = "V";
			break;
		case Direction.West:
			if (point.x - 1 < 0) {
				return false;
			}
			point.x--;
			map[point.y][point.x] = "<";
			break;
	}

	return true;
};

const currentPosition: Point = { x: startingPosition.x, y: startingPosition.y };

const dfs = (): number => {
	/**
	 * 1. Starting from where you are, get all valid tiles around you.
	 * 2. Choose the first one that comes up in a clockwise manner starting at North.
	 * 3. Follow that path down, adding the path tiles to a stack, until you hit a wall.
	 * 4. Choose the first tile that comes up in a cw manner, follow that down.
	 * 5. Keep doing this until you hit a tile with 3 walls.
	 * 6. Pop off the stack until you get to a tile that has an unexplored tile.
	 */

	// const stack: Point[] = [];
	let direction: Direction | null;
	let steps = 0;

	do {
		steps++;
		direction = pickDirection(currentPosition);

		if (
			direction === null
			//pointToTile(currentPosition) === "S"
		) {
			break;
		}

		visitedTiles.add(`${currentPosition.x}${currentPosition.y}`);
		// stack.push({ x: currentPosition.x, y: currentPosition.y });
	} while (move(currentPosition, direction));

	return steps;
};

const steps = dfs();

console.log(steps / 2, steps, visitedTiles.size);

// appendFile("./output.txt", JSON.stringify(map));

for (let y = 0; y < height; y++) {
	for (let x = 0; x < width; x++) {
		await appendFile("./output.txt", map[y][x]);
	}
	await appendFile("./output.txt", `\n`);
}

import { readFile } from "node:fs/promises";

const data = await readFile("./input.txt", "utf8");
const lines = data.split("\n");

// Last line is always blank so get rid of it.
lines.pop();

/**
 * Given a seed, does it lie somewhere between a source seed
 * plus the range? If yes, then the soil number will be the
 * destination plus the source minus the seed.
 */

type Seed = {
	start: number;
	range: number;
};

type GardenData = {
	destination: number;
	source: number;
	range: number;
};

const seeds: Seed[] = [];
const seedToSoil: GardenData[] = [];
const soilToFertilizer: GardenData[] = [];
const fertilizerToWater: GardenData[] = [];
const waterToLight: GardenData[] = [];
const lightToTemperature: GardenData[] = [];
const temperatureToHumidity: GardenData[] = [];
const humidityToLocation: GardenData[] = [];

let parseSeedToSoil = false;
let parseSoilToFertilizer = false;
let parseFertilizerToWater = false;
let parseWaterToLight = false;
let parseLightToTemperature = false;
let parseTemperatureToHumidity = false;
let parseHumidityToLocation = false;

const constructMap = (line: string, map: GardenData[]) => {
	const parsedValues = line.match(/(\d+) (\d+) (\d+)/)!;

	map.push({
		destination: Number(parsedValues[1]),
		source: Number(parsedValues[2]),
		range: Number(parsedValues[3]),
	});
};

const calculateGardenData = (
	value: number,
	gardenData: GardenData[]
): number => {
	let result = value;

	for (const { destination, source, range } of gardenData) {
		if (source <= value && value < source + range) {
			result = value - source + destination;
			break;
		}
	}

	return result;
};

const findLocationFromSeed = (seed: number): number => {
	const soil = calculateGardenData(seed, seedToSoil);
	const fertilizer = calculateGardenData(soil, soilToFertilizer);
	const water = calculateGardenData(fertilizer, fertilizerToWater);
	const light = calculateGardenData(water, waterToLight);
	const temperature = calculateGardenData(light, lightToTemperature);
	const humidity = calculateGardenData(temperature, temperatureToHumidity);
	const location = calculateGardenData(humidity, humidityToLocation);

	return location;
};

for (const line of lines) {
	if (line === "") {
		parseSeedToSoil = false;
		parseSoilToFertilizer = false;
		parseFertilizerToWater = false;
		parseWaterToLight = false;
		parseLightToTemperature = false;
		parseTemperatureToHumidity = false;
		parseHumidityToLocation = false;

		continue;
	}

	if (line.match(/seeds/)) {
		line.match(/(\d+) (\d+)/g)?.forEach((seedPair) =>
			seeds.push({
				start: Number(seedPair.split(" ")[0]),
				range: Number(seedPair.split(" ")[1]),
			})
		);
	} else if (line.match(/seed-/)) {
		parseSeedToSoil = true;
		continue;
	} else if (line.match(/soil-/)) {
		parseSoilToFertilizer = true;
		continue;
	} else if (line.match(/fertilizer-/)) {
		parseFertilizerToWater = true;
		continue;
	} else if (line.match(/water-/)) {
		parseWaterToLight = true;
		continue;
	} else if (line.match(/light-/)) {
		parseLightToTemperature = true;
		continue;
	} else if (line.match(/temperature-/)) {
		parseTemperatureToHumidity = true;
		continue;
	} else if (line.match(/humidity-/)) {
		parseHumidityToLocation = true;
		continue;
	}

	if (parseSeedToSoil) {
		constructMap(line, seedToSoil);
	} else if (parseSoilToFertilizer) {
		constructMap(line, soilToFertilizer);
	} else if (parseFertilizerToWater) {
		constructMap(line, fertilizerToWater);
	} else if (parseWaterToLight) {
		constructMap(line, waterToLight);
	} else if (parseLightToTemperature) {
		constructMap(line, lightToTemperature);
	} else if (parseTemperatureToHumidity) {
		constructMap(line, temperatureToHumidity);
	} else if (parseHumidityToLocation) {
		constructMap(line, humidityToLocation);
	}
}

console.time("Time");

let lowestLocation = Infinity;
let minimumLocationInPair = [];

for (const seed of seeds) {
	let minimumLocationOfSeed = seed.range;

	/**
	 * We can jump by 90 000 because we're just trying to get the approximate
	 * lowest seed location. From there, we can narrow down after.
	 * 90 000 was by trial and error.
	 */
	for (let i = seed.start; i < seed.start + seed.range; i += 90000) {
		const location = findLocationFromSeed(i);

		if (location < lowestLocation) {
			lowestLocation = location;
			minimumLocationOfSeed = i;
		}
	}

	minimumLocationInPair.push([lowestLocation, minimumLocationOfSeed, seed]);
	console.log("Finished Pair:", seed);
}

//get the min seed
let minLoc = Infinity;
let range: any = [];

// I got lazy with the types and it's too late in the night to untangle this!
for (const [loc, minimumLocationOfSeed, seed] of minimumLocationInPair) {
	if ((loc as number) < minLoc) {
		minLoc = loc as number;
		range = [minimumLocationOfSeed, seed];
	}
}

// Look +/- 100 000 from the min seed
let delta = 100000;
let minSearch = Math.max(range[0] - delta, range[1].start);
let maxSearch = Math.min(range[0] + delta, range[1].start + range[1].range);
let minimumLocationOfSeed = Infinity;

for (let i = minSearch; i <= maxSearch; i++) {
	const loc = findLocationFromSeed(i);

	if (loc < minimumLocationOfSeed) {
		minimumLocationOfSeed = loc;
	}
}

console.log(minimumLocationOfSeed);
console.timeEnd("Time");

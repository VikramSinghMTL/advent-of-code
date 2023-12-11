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

type GardenData = {
	destination: number;
	source: number;
	range: number;
};

const seeds: number[] = [];
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

	for (const data of gardenData) {
		if (data.source <= value && value < data.source + data.range) {
			result = value - data.source + data.destination;
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
		line.match(/\d+/g)?.forEach((seed) => seeds.push(Number(seed)));
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

const lowestLocationSeed = seeds.reduce((previousSeed, currentSeed) =>
	findLocationFromSeed(previousSeed) < findLocationFromSeed(currentSeed)
		? previousSeed
		: currentSeed
);

console.log(findLocationFromSeed(lowestLocationSeed));

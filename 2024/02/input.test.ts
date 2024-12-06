import { describe, test, expect } from 'vitest';
import { evaluateReport } from './02';

describe('Day 2: Red-Nosed Reports', () => {
	describe('evaluateReport', () => {
		test('should return -1 for a report with safely decreasing levels', () => {
			expect(evaluateReport([7, 6, 4, 2, 1])).toBe(-1);
		});

		test('should return -1 for a report with safely increasing levels', () => {
			expect(evaluateReport([1, 3, 6, 7, 9])).toBe(-1);
		});

		test('should not return -1 for a report with an increasing jump larger than 3', () => {
			expect(evaluateReport([1, 2, 7, 8, 9])).not.toBe(-1);
		});

		test('should not return -1 for a report containing equal levels', () => {
			expect(evaluateReport([8, 6, 4, 4, 1])).not.toBe(-1);
		});

		test('should return -1 for a report with valid levels including a slight dip at the end', () => {
			expect(evaluateReport([74, 76, 78, 79, 76])).toBe(-1);
		});

		test('should return -1 for a report with valid levels and a repeated final value', () => {
			expect(evaluateReport([38, 40, 43, 44, 44])).toBe(-1);
		});

		test('should return -1 for a report with a valid sequence including a larger range', () => {
			expect(evaluateReport([1, 2, 4, 6, 8, 9, 13])).toBe(-1);
		});
	});
});

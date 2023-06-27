import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 6, b: 3, action: Action.Multiply, expected: 18 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 5, b: 7, action: Action.Exponentiate, expected: 78125 },
  { a: 1, b: 2, action: '-+', expected: null },
  { a: 2, b: 3, action: '%', expected: null },
  { a: 2, b: 3, action: '$', expected: null },
  { a: 'a', b: 90, action: Action.Add, expected: null },
  { a: undefined, b: 'test', action: Action.Subtract, expected: null },
  { a: '908iO', b: 3, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test('expects simpleCalculator method to be defined', () => {
    expect(simpleCalculator).toBeDefined();
  });
  testCases.forEach((test) => {
    it(`${test.a} ${test.action} ${test.b} = ${test.expected}`, () => {
      expect(
        simpleCalculator({ a: test.a, b: test.b, action: test.action }),
      ).toEqual(test.expected);
    });
  });
});

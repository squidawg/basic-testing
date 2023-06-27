import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('expects simpleCalculator method to be defined', () => {
    expect(simpleCalculator).toBeDefined();
  });
  //valid add operation
  it.each([
    [2, 2, 4],
    [3, 3, 6],
    [4, 4, 8],
  ])('should add two numbers', (a: number, b: number, result: number) => {
    expect(simpleCalculator({ a: a, b: b, action: Action.Add })).toEqual(
      result,
    );
  });
  //valid subtract operation
  it.each([
    [2, 2, 0],
    [6, 3, 3],
    [4, 3, 1],
  ])('should subtract two numbers', (a: number, b: number, result: number) => {
    expect(simpleCalculator({ a: a, b: b, action: Action.Subtract })).toEqual(
      result,
    );
  });
  //valid multiply operation
  it.each([
    [2, 2, 4],
    [6, 3, 18],
    [4, 3, 12],
  ])('should multiply two numbers', (a: number, b: number, result: number) => {
    expect(simpleCalculator({ a: a, b: b, action: Action.Multiply })).toEqual(
      result,
    );
  });
  //valid divide operation
  it.each([
    [2, 2, 1],
    [6, 2, 3],
    [8, 2, 4],
  ])('should divide two numbers', (a: number, b: number, result: number) => {
    expect(simpleCalculator({ a: a, b: b, action: Action.Divide })).toEqual(
      result,
    );
  });
  //valid exponential operation
  it.each([
    [2, 5, 32],
    [3, 4, 81],
    [5, 7, 78125],
  ])(
    'should exponentiate two numbers',
    (a: number, b: number, result: number) => {
      expect(
        simpleCalculator({ a: a, b: b, action: Action.Exponentiate }),
      ).toEqual(result);
    },
  );
  it.each([
    [1, 2, '-+'],
    [2, 3, '%'],
    [2, 3, '$'],
  ])(
    'should return null for invalid action',
    (a: number, b: number, action: string | number | undefined) => {
      expect(simpleCalculator({ a: a, b: b, action: action })).toEqual(null);
    },
  );
  // case for null
  it.each([
    ['s', 'test', Action.Add],
    [undefined, 3, Action.Add],
    ['s', undefined, Action.Add],
  ])(
    'should return null for invalid arguments',
    (
      a: string | number | undefined,
      b: string | number | undefined,
      action: string,
    ) => {
      expect(simpleCalculator({ a: a, b: b, action: action })).toEqual(null);
    },
  );
});

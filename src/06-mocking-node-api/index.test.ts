// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { random } from 'lodash';
import path from 'path';
import fs from "fs";
// jest.mock('fs', () => ({
//   existsSync: jest.fn().mockImplementation(() => Promise.resolve(true)),
//   promises: {
//     readFile: jest
//       .fn()
//       .mockImplementation((_, callback) =>
//         callback(null, Buffer.from('content')),
//       ),
//   },
// }));

describe('doStuffByTimeout', () => {
  const rand = random(0, 100, false);
  const mockCallback = jest.fn();
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(mockCallback, rand);
    jest.advanceTimersByTime(rand);
    expect(mockCallback.mock.calls).toHaveLength(1);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockCallback, rand);
    expect(mockCallback.mock.calls).toHaveLength(0);
    jest.advanceTimersByTime(rand);
    expect(mockCallback.mock.calls).toHaveLength(1);
  });
});

describe('doStuffByInterval', () => {
  const rand = random(0, 100, false);
  const mockCallback = jest.fn();
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(mockCallback, rand);
    jest.advanceTimersByTime(rand);
    expect(mockCallback.mock.calls).toHaveLength(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(mockCallback, rand);
    while (mockCallback.mock.calls.length !== 4) {
      jest.advanceTimersByTime(rand);
    }
    expect(mockCallback.mock.calls).toHaveLength(4);
  });
});

describe('readFileAsynchronously', () => {

  test('should call join with pathToFile', async () => {
    const fileName = 'test.txt';
    path.join = jest.fn();
    await readFileAsynchronously(fileName);
    expect(path.join).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    const fileName = 'Notest.txt';
    fs.existsSync = jest.fn().mockReturnValue(false);
    const res = await readFileAsynchronously(fileName);
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileName = 'Imaginary.txt';
    const content = 'this is a content of imaginary file';
    fs.existsSync = jest.fn().mockReturnValue(true);
    fs.promises.readFile = jest.fn().mockReturnValue(content);
    const res = await readFileAsynchronously(fileName);
    expect(res).toEqual(content);
  });
});

import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  it('should resolve provided value', async () => {
    await expect(resolveValue('testValue')).resolves.toBe('testValue');
  });
});

describe('throwError', () => {
  const msg = 'errorMessage';
  it('should throw error with provided message', () => {
    expect(() => throwError(msg)).toThrowError(msg);
  });
  it('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  it('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  it('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});

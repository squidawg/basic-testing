import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  it('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne).not.toHaveBeenCalled();
    expect(mockTwo).not.toHaveBeenCalled();
    expect(mockThree).not.toHaveBeenCalled();
  });

  it('unmockedFunction should log into console', () => {
    const notMocked = 'I am not mocked';
    const OnConsoleSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(OnConsoleSpy).toHaveBeenCalled();
    expect(OnConsoleSpy).toHaveBeenCalledWith(notMocked);
  });
});

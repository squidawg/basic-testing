import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 9000;
  const deposit = 1000;
  const hostAccount: BankAccount = getBankAccount(initialBalance);
  const bankAccount: BankAccount = getBankAccount(initialBalance);
  it('should create account with initial balance', () => {
    expect(hostAccount.getBalance()).toEqual(initialBalance);
  });

  it('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => hostAccount.withdraw(10000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => hostAccount.transfer(10000, bankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => hostAccount.transfer(9000, hostAccount)).toThrow(
      TransferFailedError,
    );
  });
  test('should deposit money', () => {
    hostAccount.deposit(deposit);
    expect(hostAccount.getBalance()).toEqual(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    hostAccount.withdraw(deposit);
    expect(hostAccount.getBalance()).toEqual(initialBalance);
  });

  test('should transfer money', () => {
    hostAccount.transfer(deposit, bankAccount);
    expect(bankAccount.getBalance()).toEqual(initialBalance + deposit);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await hostAccount.fetchBalance();
    try {
      expect(typeof balance).toBe('number');
    } catch (e) {
      expect(balance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 90;
    hostAccount.fetchBalance = jest.fn().mockResolvedValue(balance);
    await hostAccount.synchronizeBalance();
    expect(hostAccount.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    hostAccount.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(hostAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

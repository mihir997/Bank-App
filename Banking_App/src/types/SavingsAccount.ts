import { Account } from './Account';

export class SavingsAccount extends Account {
  private static readonly MINIMUM_BALANCE = 500;

  constructor(accountNumber: string) {
    super(accountNumber);
  }

  public withdraw(amount: number, pin: string): void {
    this.validateWithdrawal(amount, pin);
    
    if (this.balance - amount < SavingsAccount.MINIMUM_BALANCE) {
      throw new Error(`Cannot withdraw: Minimum balance of ${SavingsAccount.MINIMUM_BALANCE} required`);
    }
    this.balance -= amount;
  }
}
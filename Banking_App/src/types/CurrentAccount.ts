import { Account } from './Account';

export class CurrentAccount extends Account {
  private overdraftLimit: number = 1000;

  constructor(accountNumber: string) {
    super(accountNumber);
  }

  public withdraw(amount: number, pin: string): void {
    this.validateWithdrawal(amount, pin);
    
    if (this.balance - amount < -this.overdraftLimit) {
      throw new Error(`Cannot withdraw: Overdraft limit of ${this.overdraftLimit} exceeded`);
    }
    this.balance -= amount;
  }
}
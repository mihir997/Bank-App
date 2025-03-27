import { Account } from './Account';
import { SavingsAccount } from './SavingsAccount';
import { CurrentAccount } from './CurrentAccount';

export class Bank {
  private accounts: Map<string, Account> = new Map();
  private lastAccountNumber: number = 1000;

  private generateAccountNumber(): string {
    this.lastAccountNumber += 1;
    return this.lastAccountNumber.toString();
  }

  public openSavingsAccount(): string {
    const accountNumber = this.generateAccountNumber();
    this.accounts.set(accountNumber, new SavingsAccount(accountNumber));
    return accountNumber;
  }

  public openCurrentAccount(): string {
    const accountNumber = this.generateAccountNumber();
    this.accounts.set(accountNumber, new CurrentAccount(accountNumber));
    return accountNumber;
  }

  public getAccount(accountNumber: string): Account | undefined {
    return this.accounts.get(accountNumber);
  }
}
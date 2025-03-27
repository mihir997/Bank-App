export abstract class Account {
  protected accountNumber: string;
  protected balance: number = 0;
  protected pin: string | null = null;

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
  }

  public getAccountNumber(): string {
    return this.accountNumber;
  }

  public registerPin(pin: string): void {
    if (this.pin) {
      throw new Error("PIN already registered");
    }
    this.pin = pin;
  }

  protected validatePin(pin: string): boolean {
    if (!this.pin) {
      throw new Error("PIN not registered");
    }
    return this.pin === pin;
  }

  public getBalance(pin: string): number {
    if (!this.validatePin(pin)) {
      throw new Error("Invalid PIN");
    }
    return this.balance;
  }

  public deposit(amount: number, pin: string): void {
    if (!this.validatePin(pin)) {
      throw new Error("Invalid PIN");
    }
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
    this.balance += amount;
  }

  protected validateWithdrawal(amount: number, pin: string): void {
    if (!this.validatePin(pin)) {
      throw new Error("Invalid PIN");
    }
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
  }

  public abstract withdraw(amount: number, pin: string): void;
}
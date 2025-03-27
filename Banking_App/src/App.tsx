import React, { useState } from 'react';
import { Bank } from './types/Bank';
import { Wallet, PiggyBank, Key, ArrowDownCircle, ArrowUpCircle, Eye } from 'lucide-react';

const bank = new Bank();

function App() {
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);
  const [activeAccount, setActiveAccount] = useState<string | null>(null);

  const handleOpenAccount = (type: 'savings' | 'current') => {
    try {
      const newAccountNumber = type === 'savings' 
        ? bank.openSavingsAccount() 
        : bank.openCurrentAccount();
      setAccountNumber(newAccountNumber);
      setActiveAccount(newAccountNumber);
      setShowPinInput(true);
      setMessage(`Successfully opened ${type} account. Your account number is: ${newAccountNumber}. Please register your PIN.`);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMessage('');
    }
  };

  const handleRegisterPin = () => {
    try {
      if (!pin) {
        throw new Error('Please enter a PIN');
      }
      if (pin.length < 4) {
        throw new Error('PIN must be at least 4 digits');
      }
      const account = bank.getAccount(accountNumber);
      if (!account) throw new Error('Account not found');
      account.registerPin(pin);
      setMessage('PIN registered successfully! You can now perform transactions.');
      setShowPinInput(false);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMessage('');
    }
  };

  const handleDeposit = () => {
    try {
      if (!accountNumber) throw new Error('Please enter an account number');
      if (!pin) throw new Error('Please enter your PIN');
      if (!amount) throw new Error('Please enter an amount');
      
      const account = bank.getAccount(accountNumber);
      if (!account) throw new Error('Account not found');
      
      account.deposit(Number(amount), pin);
      const newBalance = account.getBalance(pin);
      setMessage(`Successfully deposited ${amount}. New balance: ${newBalance}`);
      setAmount('');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMessage('');
    }
  };

  const handleWithdraw = () => {
    try {
      if (!accountNumber) throw new Error('Please enter an account number');
      if (!pin) throw new Error('Please enter your PIN');
      if (!amount) throw new Error('Please enter an amount');
      
      const account = bank.getAccount(accountNumber);
      if (!account) throw new Error('Account not found');
      
      account.withdraw(Number(amount), pin);
      const newBalance = account.getBalance(pin);
      setMessage(`Successfully withdrawn ${amount}. New balance: ${newBalance}`);
      setAmount('');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMessage('');
    }
  };

  const handleViewBalance = () => {
    try {
      if (!accountNumber) throw new Error('Please enter an account number');
      if (!pin) throw new Error('Please enter your PIN');
      
      const account = bank.getAccount(accountNumber);
      if (!account) throw new Error('Account not found');
      
      const balance = account.getBalance(pin);
      setMessage(`Current balance: ${balance}`);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Banking System
        </h1>

        {!activeAccount && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleOpenAccount('savings')}
              className="flex items-center justify-center gap-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              <PiggyBank size={24} />
              Open Savings Account
            </button>
            <button
              onClick={() => handleOpenAccount('current')}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Wallet size={24} />
              Open Current Account
            </button>
          </div>
        )}

        {activeAccount && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800">Active Account</h2>
            <p className="text-blue-600">Account Number: {activeAccount}</p>
          </div>
        )}

        <div className="space-y-4">
          {!activeAccount && (
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div className="flex gap-4">
            <input
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {showPinInput ? (
            <button
              onClick={handleRegisterPin}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Key size={20} />
              Register PIN
            </button>
          ) : (
            <>
              <button
                onClick={handleViewBalance}
                className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors mb-4"
              >
                <Eye size={20} />
                View Balance
              </button>

              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleDeposit}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ArrowDownCircle size={20} />
                  Deposit
                </button>
                <button
                  onClick={handleWithdraw}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <ArrowUpCircle size={20} />
                  Withdraw
                </button>
              </div>
            </>
          )}
        </div>

        {message && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
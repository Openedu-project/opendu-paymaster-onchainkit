import { Transaction } from '../models/transaction';

// In a real application, this would likely be stored in a database
let transactions: Transaction[] = [];

export const paymasterService = {
  // Add a new transaction
  addTransaction: (transaction: Transaction): Transaction => {
    transactions = [transaction, ...transactions];
    return transaction;
  },

  // Get all transactions
  getTransactions: (): Transaction[] => {
    return transactions;
  },

  // Get a transaction by ID
  getTransactionById: (id: string): Transaction | undefined => {
    return transactions.find(tx => tx.id === id);
  },

  // Update a transaction
  updateTransaction: (id: string, updates: Partial<Transaction>): Transaction | undefined => {
    const index = transactions.findIndex(tx => tx.id === id);
    if (index === -1) return undefined;

    const updatedTransaction = {
      ...transactions[index],
      ...updates,
      updated_at: Date.now()
    };

    transactions[index] = updatedTransaction;
    return updatedTransaction;
  }
};

interface Transaction {
  id: number;
  date: string; // Assuming date is in string format from the API
  branch: string;
  type: "full" | "short";
  amount: number;
  bank: string;
  requestedby: string;
  status: "pending" | "approved" | "rejected";
  // other fields as needed
}

const TransactionService = {
  // Simulated data or actual data fetching methods
  getTransactions: (): Transaction[] => {
    // Implement logic to fetch transactions
    return [];
  },

  deleteTransaction: (id: number): void => {
    // Implement logic to delete transaction by ID
  },
};

export default TransactionService;

import React, { useState, useEffect } from "react";
import "./TransactionTable.css";

interface Transaction {
  id: number;
  date: Date; // Assuming date is in string format from the API
  branch: string;
  type: "full" | "short";
  amount: number;
  bank: string;
  requestedby: string;
  status: "pending" | "approved" | "rejected";
  // other fields as needed
}

interface TransactionTableProps {
  transactions: Transaction[]; // Ensure transactions prop is defined
  onDelete: (id: number) => void;
  // other props
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onDelete,
}) => {
  const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>(
    []
  );
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setSortedTransactions([...transactions]); // Initialize sortedTransactions with transactions
  }, [transactions]);

  const sortTransactions = () => {
    const sorted = transactions.slice().sort((a, b) => {
      if (sortBy === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setSortedTransactions(sorted);
  };

  const handleSort = () => {
    setSortBy(sortBy === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    sortTransactions();
  }, [transactions, sortBy]);

  return (
    <div>
      <button onClick={handleSort}>Sort By Date</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>BRANCH</th>
            <th>TYPE</th>
            <th>AMOUNT</th>
            <th>BANK</th>
            <th>REQUESTED BY</th>
            <th>STATUS</th>
            {/* Other table headers */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date.toString()}</td>
              <td>{transaction.branch}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.bank}</td>
              <td>{transaction.requestedby}</td>
              <td>{transaction.status}</td>
              {/* Display other transaction details */}
              <td>
                <button onClick={() => onDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

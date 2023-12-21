import React, { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable"; // Assuming this component exists

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
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[] | []>>;
  onDelete: (id: number) => void;
  // other props
}

const TransactionData: React.FC<TransactionTableProps> = ({
  transactions,
  setTransactions,
  onDelete,
}) => {
  // const [transactions, setTransactions] = useState<Transaction[]>([]); // Your transactions state
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("https://sheetdb.io/api/v1/46dw1clews27u");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Transaction[] = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = (id: number) => {
    // Implement delete logic using API or local deletion
    // This can interact with your API's delete endpoint or update local state
    // Update 'transactions' state after deleting a transaction
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFilterChange = () => {
    let filtered = [...transactions];

    console.log(transactions);
    if (fromDate && toDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= fromDate && transactionDate <= toDate;
      });
      // if (fromDate && toDate) {
      //   filtered = filtered.filter((transaction) => {
      //     const transactionDate = transaction.date;
      //     return transactionDate >= fromDate && transactionDate <= toDate;
      //   });
      console.log(filtered);
      console.log(toDate.getDate());
    }

    setFilteredTransactions(filtered);
  };

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : null;
    setFromDate(date);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : null;
    setToDate(date);
  };

  return (
    <div>
      <div>
        {/* Date filter inputs */}
        <label>
          From Date:
          <input
            type="date"
            value={fromDate?.toISOString().split("T")[0]}
            onChange={handleFromDateChange}
          />
        </label>
        <label>
          To Date:
          <input
            type="date"
            value={toDate?.toISOString().split("T")[0]}
            onChange={handleToDateChange}
          />
        </label>
        <button onClick={handleFilterChange}>Apply Date Filter</button>
      </div>
      {/* Transaction table displaying filtered transactions */}
      <TransactionTable
        transactions={filteredTransactions}
        onDelete={(id) => {
          handleDelete(id);
        }}
      />
    </div>
  );
};

export default TransactionData;

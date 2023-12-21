import React, { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import TransactionTable from "./components/TransactionTable";
import TransactionData from "./components/TransactionData";

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

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* <FilterBar onFilterChange={(filters) => console.log(filters)} /> */}
      <TransactionTable transactions={transactions} onDelete={handleDelete} />
      <TransactionData
        transactions={transactions}
        setTransactions={setTransactions}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;

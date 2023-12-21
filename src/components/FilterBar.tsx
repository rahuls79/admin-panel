import React from "react";

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
  // other props
}

const FilterBar: React.FC<TransactionTableProps> = ({
  transactions,
  setTransactions,
}) => {
  return (
    <div className="filterBar">
      <p>Total ({transactions.length})</p>
    </div>
  );
};

export default FilterBar;

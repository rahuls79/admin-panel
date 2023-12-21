import React, { useState, useEffect } from "react";
import "./TransactionTable.css";
import { format } from "date-fns";
import Select from "react-select";

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

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  setTransactions,
  onDelete,
}) => {
  const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>(
    []
  );
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [tempSDate, setTempSDate] = useState<string>("");
  const [tempFDate, setTempFDate] = useState<string>("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/46dw1clews27u") // API needs to be updated
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((err) => console.log("Unable to get data"));

    console.log(transactions);
  }, []);

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

  const handleFilterChange = () => {
    let filtered = [...transactions];

    if (fromDate && toDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        console.log(transactionDate);
        return transactionDate >= fromDate && transactionDate <= toDate;
      });

      console.log(tempSDate);
      console.log(tempFDate);
      console.log(filteredTransactions);
    }
    setTransactions(filtered);
  };

  const dateFormat = (e: Date) => {
    const day = e.getDate();
    const month = e.getMonth() + 1;
    const year = e.getFullYear();

    const finalDate = day + "/" + month + "/" + year;
    return finalDate;
  };

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : new Date();
    // const updatedDate = dateFormat(date);
    setTempSDate(format(date, "dd/MM/yyyy"));
    setFromDate(date);
    console.log(fromDate);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : new Date();
    setTempFDate(format(date, "dd/MM/yyyy"));
    setToDate(date);
  };

  const options = [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Navi Mumbai", label: "Navi Mumbai" },
    { value: "Byculla", label: "Byculla" },
  ];

  return (
    <div>
      <div className="filter-bar">
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
        <Select
          // onChange={handleChange}
          options={options}
        />
      </div>
      <button>Sort By Date</button>
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
          {transactions.map((transaction) => (
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

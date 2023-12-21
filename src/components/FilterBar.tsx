import React, { useState } from "react";

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  // other props
}

interface FilterOptions {
  fromDate: Date | null;
  toDate: Date | null;
  branch: string | null;
  type: "full" | "short" | null;
  status: "pending" | "approved" | "rejected" | null;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    fromDate: null,
    toDate: null,
    branch: null,
    type: null,
    status: null,
  });

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  // Invoke parent callback with updated filters
  React.useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div>
      {/* Filter inputs and dropdowns */}
      {/* Example: Date filter */}
      <label>
        From Date:
        <input type="date" name="fromDate" onChange={handleFilterChange} />
      </label>
      <label>
        To Date:
        <input type="date" name="toDate" onChange={handleFilterChange} />
      </label>
      {/* Other filters */}
    </div>
  );
};

export default FilterBar;

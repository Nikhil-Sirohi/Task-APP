interface FilterBarProps {
  onFilter: (filters: { priority?: number; status?: string }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilter({
      [name]:
        value === "" ? undefined : name === "priority" ? Number(value) : value,
    });
  };

  return (
    <div className="flex space-x-4 mb-4">
      <select
        name="priority"
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">All Priorities</option>
        {[1, 2, 3, 4, 5].map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <select
        name="status"
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="finished">Finished</option>
      </select>
    </div>
  );
};

export default FilterBar;

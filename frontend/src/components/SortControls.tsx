interface SortControlsProps {
  onSort: (sortBy: "startTime" | "endTime") => void;
}

const SortControls: React.FC<SortControlsProps> = ({ onSort }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onSort("startTime")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sort by Start Time
      </button>
      <button
        onClick={() => onSort("endTime")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sort by End Time
      </button>
    </div>
  );
};

export default SortControls;

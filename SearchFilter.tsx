import { useApp } from "../context/AppContext";

const SearchFilter = () => {
  const { search, setSearch, darkMode } = useApp();

  return (
    <div className="mb-4">
      <input
        type="text"
        value={search} // ✅ controlled input
        placeholder="Search transactions..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className={`w-full p-2 rounded border outline-none transition 
        ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
      />

      {/* ✅ Clear Button (Nice UX touch) */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="mt-2 text-sm text-blue-500 hover:underline"
        >
          Clear Search
        </button>
      )}
    </div>
  );
};

export default SearchFilter;
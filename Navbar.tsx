import { useApp } from "../context/AppContext";

const Navbar = () => {
  const { darkMode, setDarkMode, role, setRole } = useApp();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Finance Dashboard</h1>

      <div className="flex gap-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 bg-gray-800 text-white rounded"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Navbar;
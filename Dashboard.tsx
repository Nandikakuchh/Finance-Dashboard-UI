import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";
import Insights from "../components/Insights";
import SearchFilter from "../components/SearchFilter";
import { useApp } from "../context/AppContext";

type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

const Dashboard = () => {
  const { transactions, darkMode } = useApp();

  // ✅ Safe calculations
  const income = transactions
    ?.filter((t: Transaction) => t.type === "income")
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const expense = transactions
    ?.filter((t: Transaction) => t.type === "expense")
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"} min-h-screen p-4`}>
      
      {/* Navbar */}
      <Navbar />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
        <SummaryCard title="Balance" value={balance} />
      </div>

      {/* Charts */}
      <div className="mb-6">
        <Charts />
      </div>

      {/* Search */}
      <SearchFilter />

      {/* Table */}
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No transactions found
        </p>
      ) : (
        <TransactionTable />
      )}

      {/* Insights */}
      <Insights />
    </div>
  );
};

export default Dashboard;
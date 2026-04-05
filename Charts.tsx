import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useApp } from "../context/AppContext";

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

const Charts = () => {
  const { transactions } = useApp();

  // ✅ Group data for Pie Chart (by category)
  const categoryData = Object.values(
    transactions.reduce((acc: any, curr: any) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { name: curr.category, value: 0 };
      }
      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      
      {/* 📈 Line Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="mb-2 font-semibold">Transaction Trend</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 🥧 Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="mb-2 font-semibold">Spending by Category</h2>

        {categoryData.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]} // ✅ stable colors
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Charts;
import { useApp } from "../context/AppContext";

const Insights = () => {
  const { transactions } = useApp();

  const highest = transactions.reduce((max: any, t: any) =>
    t.amount > max.amount ? t : max
  );

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="font-bold">Insights</h2>
      <p>Highest Transaction: ₹{highest.amount} ({highest.category})</p>
    </div>
  );
};

export default Insights;
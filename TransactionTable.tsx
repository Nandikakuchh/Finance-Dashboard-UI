import { useApp } from "../context/AppContext";

const TransactionTable = () => {
  const { transactions, search } = useApp();

  const filtered = transactions.filter((t: any) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Type</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((t: any) => (
          <tr key={t.id} className="text-center">
            <td>{t.date}</td>
            <td>₹{t.amount}</td>
            <td>{t.category}</td>
            <td>{t.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
const SummaryCard = ({ title, value }: any) => {
  return (
    <div className="p-4 bg-white shadow rounded w-full">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-xl font-bold">₹{value}</p>
    </div>
  );
};

export default SummaryCard;
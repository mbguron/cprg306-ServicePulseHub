export default function ServiceQualityCard({ title, description, icon }) {
  return (
    <div className="w-60 bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="text-orange-500 mb-4 text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

const Placeholder = ({ title }) => {
  return (
    <div className="py-20 text-center">
      <h2 className="text-4xl font-bold text-church-red mb-4">{title}</h2>
      <p className="text-gray-400">
        This page is currently under construction.
      </p>
    </div>
  );
};

export default Placeholder;

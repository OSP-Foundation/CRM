interface props {
  label: string;
}

const Checkbox = ({ label }: props) => {
  return (
    <div className="flex items-center ">
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-primary-border rounded focus:ring-blue-500"
      />
      <label
        htmlFor="default-checkbox"
        className="ms-1 text-xs font-normal text-pure-black opacity-75 select-none pl-1"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

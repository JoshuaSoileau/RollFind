import React from "react";

const Input = ({ value, setSearch, setValue }) => {
  return (
    <input
      className="border border-4 border-solid border-gray-300 rounded-lg w-full leading-6 text-4 p-5 px-8 outline-none shadow-none focus:shadow-2xl  transition duration-500 ease-in-out"
      type="search"
      value={value}
      // onBlur={() => setSearch("")}
      // onFocus={() => setSearch(value)}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};

export default Input;

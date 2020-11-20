import React from "react";

const Input = ({ value, setSearch, setValue }) => {
  return (
    <input
      className="rounded-lg w-full leading-6 text-4 p-5 px-8 outline-none shadow-none focus:shadow-2xl  transition duration-500 ease-in-out"
      type="search"
      value={value}
      placeholder="Wizards, Potion of Healing, Fireball..."
      // onBlur={() => setSearch("")}
      // onFocus={() => setSearch(value)}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};

export default Input;

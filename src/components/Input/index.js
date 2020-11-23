import React from "react";
import { classnames } from "../../utils";

const Input = ({ value, setSearch, setValue }) => {
  const className = classnames(
    "w-full",
    "leading-6 text-4 p-5",
    "pl-12",
    "outline-none",
    "bg-transparent",
    "shadow-white-lg focus:shadow-white-2xl",
    "transition duration-500 ease-in-out",
    "border-b-4 border-solid border-white",
    "text-white"
  );

  return (
    <div className="relative">
      <input
        className={className}
        type="search"
        value={value}
        placeholder="Wizards, Potion of Healing, Fireball..."
        onBlur={() => setSearch("")}
        onFocus={() => setSearch(value)}
        onChange={({ target }) => setValue(target.value)}
      />

      <span className="absolute flex items-center inset-y-0 pointer-events-none">
        <svg
          fill="none"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
    </div>
  );
};

export default Input;

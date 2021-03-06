import React, { useEffect, useRef, useState } from "react";
import { classnames } from "../../utils";

const Input = ({ value, setValue, search, setSearch }) => {
  const [isFocus, setIsFocus] = useState(false);

  const form = useRef(null);

  useEffect(() => {
    setIsFocus(value.length >= 3);
  }, [value]);

  useEffect(() => {
    if (!search) return;

    form.current?.requestSubmit?.() ||
      form.current?.dispatchEvent(new Event("submit"));
  }, [search]);

  const className = classnames(
    "w-full",
    "leading-6 text-4 p-5",
    "pl-12",
    "outline-none",
    "bg-transparent",
    "shadow-white-lg focus:shadow-white-2xl",
    "transition duration-500 ease-in-out",
    "border-b-4 border-solid border-white",
    "text-white",
    isFocus && "border-pink-400"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <form
      className="input relative"
      ref={form}
      action="#"
      onSubmit={handleSubmit}
    >
      <input
        id="the-field"
        className={className}
        type="text"
        value={value}
        placeholder="Wizards, Potion of Healing, Fireball..."
        onBlur={() => {
          if (!value) setIsFocus(false);
        }}
        onFocus={() => {
          setSearch(value);
          setIsFocus(true);
        }}
        onChange={({ target }) => {
          setValue(target.value);
        }}
      />

      <span
        className={`absolute flex items-center inset-y-0 pointer-events-none transition-all duration-500 ease-in-out ${
          isFocus ? "text-pink-400" : ""
        }`}
      >
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
    </form>
  );
};

export default Input;

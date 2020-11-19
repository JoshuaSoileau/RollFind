import React, { useEffect, useState } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import Suggestions from "../Suggestions";

const Input = () => {
  const [value, setValue] = useState("wizard");
  const [search, setSearch] = useState("");
  const data = useFetchApi(search);

  useEffect(() => setSearch(value), [value]);

  return (
    <div className="w-96 relative">
      <input
        className="border border-4 border-solid border-gray-300 rounded-lg w-full leading-6 text-4 p-5 px-8 outline-none shadow-none focus:shadow-2xl  transition duration-500 ease-in-out"
        type="search"
        value={value}
        onBlur={() => setSearch("")}
        onFocus={() => setSearch(value)}
        onChange={({ target }) => setValue(target.value)}
      />
      <Suggestions data={data} />
    </div>
  );
};

export default Input;

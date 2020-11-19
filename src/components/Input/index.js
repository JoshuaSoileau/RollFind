import React, { useEffect, useState } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import Suggestions from "../Suggestions";
import { fetchData } from "./helpers";

const Input = () => {
  const [value, setValue] = useState("");
  const data = useFetchApi(value);

  return (
    <div>
      <input
        type="search"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <Suggestions data={data} />
    </div>
  );
};

export default Input;

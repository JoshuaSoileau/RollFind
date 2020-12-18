import React from "react";
import "twin.macro";

const Table = ({ rows = [] }) => {
  return (
    <ul>
      {rows.map((row) => (
        <li key={row} tw="even:(bg-blue-900) text-white">
          {row}
        </li>
      ))}
    </ul>
  );
};

export default Table;

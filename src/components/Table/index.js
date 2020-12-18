import React from "react";
import "twin.macro";

const Table = ({ rows = [] }) => {
  return (
    <ul tw="p-0 m-0  text-xs">
      {rows.map((row) => (
        <li
          key={row?.title}
          tw="odd:(bg-gray-700 bg-opacity-50) text-white p-4! m-0!  flex items-start"
        >
          <span tw="block  flex-shrink flex-grow-0  w-24  m-0! pr-4  font-bold">
            {row?.title}
          </span>
          <span tw="block flex-1  m-0!">{row?.content}</span>
        </li>
      ))}
    </ul>
  );
};

export default Table;

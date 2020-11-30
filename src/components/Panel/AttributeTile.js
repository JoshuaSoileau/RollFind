import React from "react";
import { classnames, legiblize } from "../../utils";

const colors = [
  ["bg-pink-800", "text-pink-300"],
  ["bg-purple-800", "text-purple-300"],
  ["bg-indigo-800", "text-indigo-300"],
  ["bg-blue-800", "text-blue-300"],
  ["bg-green-800", "text-green-300"],
  ["bg-yellow-800", "text-yellow-300"],
  ["bg-red-800", "text-red-300"],
  ["bg-pink-800", "text-pink-300"],
  ["bg-purple-800", "text-purple-300"],
  ["bg-indigo-800", "text-indigo-300"],
  ["bg-blue-800", "text-blue-300"],
  ["bg-green-800", "text-green-300"],
  ["bg-yellow-800", "text-yellow-300"],
  ["bg-red-800", "text-red-300"],
  ["bg-pink-800", "text-pink-300"],
  ["bg-purple-800", "text-purple-300"],
  ["bg-indigo-800", "text-indigo-300"],
  ["bg-blue-800", "text-blue-300"],
  ["bg-green-800", "text-green-300"],
  ["bg-yellow-800", "text-yellow-300"],
  ["bg-red-800", "text-red-300"],
];

const AttributeTile = ({ item, name, index, size }) => {
  const className = classnames(
    "attribute-tile",
    "inline-flex flex-col items-center justify-center",
    "p-2 px-4 rounded-xl md:min-w-1/6 max-w-full mr-4 mb-4",
    "font-extrabold text-center",
    colors?.[index]?.[0] || "bg-purple-900"
  );

  if (!item?.[name]) return "";

  const labelClass = classnames(
    "attribute-tile__label text-2xs block font-bold capitalize",
    colors?.[index]?.[1] || ""
  );

  const valueClass = classnames(
    "attribute-tile__value font-bold capitalize",
    size === "sm" && "text-2xs",
    size !== "sm" && "text-2xl"
  );

  return (
    <div className={className}>
      <span className={labelClass}>{legiblize(name)}</span>
      <span className={valueClass}>{item?.[name] || ""}</span>
    </div>
  );
};

export default AttributeTile;

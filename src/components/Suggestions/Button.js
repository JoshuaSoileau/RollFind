import React from "react";
import { getTypeInfo } from "./constants/types";
import { newlineToBreakTag } from "../../utils";

const Button = ({ item }) => {
  const className = [
    "p-4 px-5 text-left text-sm",
    "w-full",
    "rounded-lg",
    "bg-opacity-70",
    "flex flex-row justify-between  items-center",
    getTypeInfo(item?.route, "bg-color"),
    getTypeInfo(item?.route, "text-color"),
  ].join(" ");

  const tileTitleClass = [
    "tile-title",
    "inline-flex justify-center items-center",
    "p-1 pr-3 pl-2",
    "rounded-full",
    "text-xs text-white",
    "mt-3",
    getTypeInfo(item?.route, "bg-color-dark"),
  ].join(" ");

  const icon = getTypeInfo(item?.route, "icon");

  return (
    <button
      type="button"
      className={className}
      onClick={() => console.log(item)}
    >
      <div className="info">
        <strong className="mb-2 inline-block">
          {item?.name || item?.slug}
        </strong>
        <p
          className="description truncate-3-lines text-2xs"
          dangerouslySetInnerHTML={{
            __html: newlineToBreakTag(
              item?.highlighted || item?.description || item?.text
            ),
          }}
        />

        <strong className={tileTitleClass}>
          {icon ? (
            <span
              className="w-4 mr-2 text-white"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          ) : (
            ""
          )}
          <span>{getTypeInfo(item?.route, "tile-title")}</span>
        </strong>
      </div>
      <div className="cta"></div>
    </button>
  );
};

export default Button;

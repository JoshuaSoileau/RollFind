import React, { useState } from "react";
import { getTypeInfo } from "../Suggestions/constants/types";

const Header = ({ item }) => {
  const [debug, setDebug] = useState(false);
  const icon = getTypeInfo(item?.route, "icon");
  const panelTypeClass = [
    "panel-type",
    "p-1 px-4",
    "rounded-full",
    "font-extrabold",
    getTypeInfo(item?.route, "bg-color"),
    getTypeInfo(item?.route, "text-color"),
  ].join(" ");

  return (
    <>
      <div className="panel-header flex flex-row items-start">
        {icon ? (
          <span
            className={`inline-block w-1/4 md:w-1/6 mr-4 md:mr-12 ${getTypeInfo(
              item?.route,
              "text-color"
            )}`}
          >
            <span
              className="font-bold"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          </span>
        ) : (
          ""
        )}
        <div className="inline-flex flex-col relative">
          <h1 className="headline font-bold flex-auto">
            {item?.name || item?.slug}
          </h1>
          <div className="inline-flex flex-row">
            <div className={panelTypeClass}>
              <span>{getTypeInfo(item?.route, "tile-title")}</span>
            </div>
            <button className="ml-4 text-sm" onClick={() => setDebug(!debug)}>
              Debug?
            </button>
          </div>
        </div>
      </div>

      {/* Panel Debugger */}
      {debug ? (
        <pre className="max-h-96 overflow-scroll bg-gray-700">
          <code>{JSON.stringify(item, 0, 4)}</code>
        </pre>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;

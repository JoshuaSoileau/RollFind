import React, { useState } from "react";
import { classnames, newlineToPtag } from "../../utils";
import { getTypeInfo } from "../Suggestions/constants/types";
import AttributeTile from "./AttributeTile";

const attributes = [
  "hit_points",
  "armor_class",
  "strength",
  "dexterity",
  "constitution",
  "wisdom",
  "charisma",
  "level",
  "school",
  "type",
];

const Panel = ({ item, isOpen, setPanelItem }) => {
  const [debug, setDebug] = useState(false);

  const className = classnames(
    "panel",
    "fixed z-20 overflow-auto",
    "transition-all duration-500 ease-in-out",
    "bottom-0 h-0 left-0 right-0 md:left-auto md:top-16 md:right-16 md:bottom-16 overflow-hidden",
    "w-full",
    "bg-gray-800 text-white",
    "px-6 md:px-0",
    "rounded-t-3xl md:rounded-3xl",
    isOpen && " h-2/3 md:h-auto md:w-1/2  md:px-12 pb-0",
    !isOpen && "md:w-0"
  );

  const containerClass = classnames(
    "md:py-16",
    "prose-sm flex flex-col",
    "transition-all duration-500 ease-in-out",
    isOpen && "opacity-1 scale-95 delay-100"
  );

  const icon = getTypeInfo(item?.route, "icon");
  const text = newlineToPtag(item?.description || item?.text);
  const panelTypeClass = [
    "panel-type",
    "p-1 px-4",
    "rounded-full",
    "font-extrabold",
    getTypeInfo(item?.route, "bg-color"),
    getTypeInfo(item?.route, "text-color"),
  ].join(" ");

  return (
    <div className={className}>
      <button
        className="absolute top-8 right-8 text-white"
        onClick={() => setPanelItem({})}
      >
        <span className="mb-4 w-6 h-1  block  bg-white transform rotate-45 origin-center" />
        <span className="mb-4 w-6 h-1  block  bg-white transform  -translate-y-5 -rotate-45 origin-center" />
      </button>
      <div className={containerClass}>
        {/* Panel Header */}
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
          <pre className="max-h-48 overflow-scroll bg-gray-700">
            <code>{JSON.stringify(item, 0, 4)}</code>
          </pre>
        ) : (
          ""
        )}

        {/* Attribute tiles */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 empty:hidden mt-6">
          {attributes.map((attr, index) => (
            <AttributeTile item={item} key={attr} name={attr} index={index} />
          ))}
        </div>

        {/* Text content */}
        <h2 className="description font-extrabold flex-0">Description</h2>
        <div
          className="flex-1 overflow-scroll"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default Panel;

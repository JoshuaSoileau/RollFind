import React, { useState } from "react";
import { classnames, fadeBlipClassName, newlineToPtag } from "../../utils";
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
  "dnd_class",
  "rarity",
];

const Panel = ({ item, isOpen, setPanelItem }) => {
  const [debug, setDebug] = useState(false);

  const boxClass = classnames("rounded-t-3xl md:rounded-3xl");

  const closeBox = classnames(
    boxClass,
    "overflow-hidden",
    "pointer-events-none",
    "fixed md:absolute inset-0 md:inset-y-12 top-56 md:top-12 md:right-12",
    "flex flex-col justify-between",
    !isOpen && "md:translate-x-1/2",
    fadeBlipClassName(isOpen)
  );

  const containerClassName = classnames(
    boxClass,
    "panel",
    "w-full h-full max-h-full",
    "px-4 md:px-16",
    "bg-gray-800 text-white",
    "overflow-auto",
    !isOpen && "md:translate-x-1/2",
    fadeBlipClassName(isOpen)
  );

  const contentClass = classnames(
    "py-8 md:py-16",
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
    <>
      <div className={containerClassName}>
        <div className="relative">
          <div className={contentClass}>
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
                  <button
                    className="ml-4 text-sm"
                    onClick={() => setDebug(!debug)}
                  >
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

            {/* Attribute tiles */}
            <div className="flex flex-wrap mt-8">
              {attributes.map((attr, index) => (
                <AttributeTile
                  item={item}
                  key={attr}
                  name={attr}
                  index={index}
                />
              ))}
            </div>

            {/* Text content */}
            <h2 className="description font-extrabold flex-0">Description</h2>
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
      </div>
      <div className={closeBox}>
        <div className="h-12 md:h-16 inset-x-0 bg-gradient-to-b from-gray-800 z-10"></div>
        <div className="h-28 inset-x-0 bg-gradient-to-t from-gray-800 z-10"></div>
        {/* Close button */}
      </div>
      <button
        className={`fixed md:absolute top-64 md:top-24 right-8 md:right-24 text-white z-10 ${fadeBlipClassName(
          isOpen
        )}`}
        onClick={() => setPanelItem({})}
      >
        <span className="mb-4 w-6 h-1  block  bg-white transform rotate-45 origin-center" />
        <span className="mb-4 w-6 h-1  block  bg-white transform  -translate-y-5 -rotate-45 origin-center" />
      </button>
    </>
  );
};

export default Panel;

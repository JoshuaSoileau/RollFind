import React from "react";
import useResource from "../../hooks/useResource";
import { classnames, fadeBlipClassName, newlineToPtag } from "../../utils";
import Close from "./Close";
import Gradients from "./Gradients";
import Header from "./Header";
import Tiles from "./Tiles";

const topAttributes = ["hit_points", "armor_class"];

const primaryAttributes = [
  "strength",
  "dexterity",
  "constitution",
  "wisdom",
  "charisma",
];

const tertiaryAttributes = [
  "level",
  "school",
  "type",
  "dnd_class",
  "rarity",
  "languages",
];

const Panel = ({ item, isOpen, setPanelItem }) => {
  const data = useResource(item);
  const boxClass = classnames("rounded-t-3xl md:rounded-3xl");

  const containerClassName = classnames(
    boxClass,
    "panel",
    "w-full h-full max-h-full",
    "px-4 md:px-16",
    "bg-gray-800 text-white",
    "overflow-auto",
    "transition duration-300 ease-in-out"
    !isOpen && "md:translate-x-1/2",
    fadeBlipClassName(isOpen),
    !Object.keys(data).length && "opacity-0",
  );

  const contentClass = classnames(
    "py-8 md:py-16",
    "prose-sm flex flex-col",
    "transition-all duration-500 ease-in-out",
    isOpen && "opacity-1 scale-95 delay-100"
  );

  const text = newlineToPtag(data?.description || data?.text || data?.desc);

  return (
    <>
      <Gradients item={data} />
      <Close isOpen={isOpen} setPanelItem={setPanelItem} />

      <div className={containerClassName}>
        <div className="relative">
          <div className={contentClass}>
            <Header item={data} />
            <Tiles item={data} attributes={topAttributes} size="lg" />
            <Tiles item={data} attributes={primaryAttributes} size="lg" />
            <h2 className="description  font-extrabold flex-0">Details</h2>
            <Tiles item={data} attributes={tertiaryAttributes} size="sm" />

            {/* Text content */}
            <h2 className="description font-extrabold flex-0">Description</h2>
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;

import React from "react";
import Markdown from "markdown-to-jsx";

import useResource from "../../hooks/useResource";
import { classnames, legiblize, fadeBlipClassName } from "../../utils";
import Table from "../Table";
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
  "duration",
  "concentration",
  "range",
];

const Panel = ({ item, isOpen, setPanelItem }) => {
  const data = useResource(item);
  const boxClass = classnames("rounded-t-3xl md:rounded-3xl");

  const containerClassName = classnames(
    boxClass,
    "panel",
    "w-full h-full max-h-full",
    "px-4 lg:px-16",
    "bg-gray-800 text-white",
    "overflow-auto",
    "transition duration-300 ease-in-out",
    !isOpen && "md:translate-x-1/2",
    fadeBlipClassName(isOpen),
    !Object.keys(data).length && "opacity-0"
  );

  const contentClass = classnames(
    "py-8 md:py-16",
    "prose-sm flex flex-col",
    "transition-all duration-500 ease-in-out",
    isOpen && "opacity-1 scale-95 delay-100"
  );

  const text = data?.description || data?.text || data?.desc;
  const hasStats = Boolean(
    [...topAttributes, ...primaryAttributes]
      .map((item) => data?.[item])
      .filter(Boolean).length
  );
  const hasDetails = Boolean(
    tertiaryAttributes.map((item) => data?.[item]).filter(Boolean).length
  );

  const actions = data?.actions || [];
  const legendary_actions = data?.legendary_actions || [];
  const hasActions = Boolean(actions.length + legendary_actions.length);

  return (
    <>
      <Gradients item={data} />
      <Close isOpen={isOpen} setPanelItem={setPanelItem} />

      <div className={containerClassName}>
        <div className="relative">
          <div className={contentClass}>
            <Header item={item} details={data} />

            {/* Stats */}
            {hasStats ? (
              <>
                <h2 className="description  font-extrabold flex-0">Stats</h2>
                <Tiles
                  item={data}
                  values={topAttributes
                    .map((item) => ({
                      title: legiblize(item),
                      value: data?.[item],
                    }))
                    .filter((item) => item.value)}
                  size="lg"
                />
                <Tiles
                  item={data}
                  values={primaryAttributes
                    .map((item) => ({
                      title: legiblize(item),
                      value: data?.[item],
                    }))
                    .filter((item) => item.value)}
                  size="lg"
                />
              </>
            ) : (
              ""
            )}

            {/* Details */}
            {hasDetails ? (
              <>
                <h2 className="description  font-extrabold flex-0">Details</h2>
                <Tiles
                  item={data}
                  values={tertiaryAttributes
                    .map((item) => ({
                      title: item,
                      value: data?.[item],
                    }))
                    .filter((item) => item.value)}
                  size="sm"
                />
              </>
            ) : (
              ""
            )}

            {/* Actions */}
            {hasActions ? (
              <>
                <h3 className="text-sm font-extrabold flex-0">Actions</h3>
                <Table
                  rows={[
                    ...actions.map(
                      (item) =>
                        item && {
                          title: item?.name,
                          content: item?.desc,
                        }
                    ),
                    ...legendary_actions.map(
                      (item) =>
                        item && {
                          title: `${item?.name} (legendary)`,
                          content: item?.desc,
                        }
                    ),
                  ]}
                />
              </>
            ) : (
              ""
            )}

            {/* Abilities */}
            {data?.special_abilities ? (
              <>
                <h3 className="text-sm font-extrabold flex-0">Abilities</h3>
                <Table
                  rows={[
                    ...(data?.special_abilities || []).map(
                      (item) =>
                        item && {
                          title: item?.name,
                          content: item?.desc,
                        }
                    ),
                  ]}
                />
              </>
            ) : (
              ""
            )}

            {/* Reactions */}
            {data?.reactions ? (
              <>
                <h3 className="text-sm font-extrabold flex-0">Reactions</h3>
                <Table
                  rows={[
                    ...(data?.reactions || []).map(
                      (item) =>
                        item && {
                          title: item?.name,
                          content: item?.desc,
                        }
                    ),
                  ]}
                />
              </>
            ) : (
              ""
            )}

            {/* Text content */}
            {text ? (
              <>
                <h2 className="description font-extrabold flex-0">
                  Description
                </h2>
                <Markdown options={{ forceBlock: true }}>{text}</Markdown>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;

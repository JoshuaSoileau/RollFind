import React from "react";
import { classnames } from "../../utils";
import Button from "./Button";
const MAX_SUGGESTION_HEIGHT = 384;

const Suggestions = ({ data, setPanelItem, shouldOpen }) => {
  const results = data?.results;
  const hasResults = results?.length;

  const containerClass = classnames(
    "suggestions",
    "absolute top-full inset-x-0 z-10",
    "overflow-auto",
    "rounded-xl mt-4",
    "transition-all duration-500 transform",
    !hasResults && "opacity-0 scale-95"
  );

  const listClass = classnames("p-4", "rounded-xl bg-gray-700");

  const listItemClass = classnames(
    "m-0 mb-4 last:mb-0  p-0",
    "transition-all duration-300 ease-in-out",
    !shouldOpen && "opacity-0 transform scale-95"
  );

  const BASE_DELAY = shouldOpen ? 300 : 0;
  const LIST_HEIGHT = shouldOpen ? MAX_SUGGESTION_HEIGHT : 0;

  return (
    <div
      className={containerClass}
      style={{
        height: `${LIST_HEIGHT}px`,
      }}
    >
      <ul className={listClass}>
        {results?.map((item, index) => (
          <li
            key={item?.document_slug + item?.slug}
            className={listItemClass}
            style={{
              transitionDelay: BASE_DELAY + index * 100 + "ms",
            }}
          >
            <Button item={item} onClick={() => setPanelItem(item)} />
          </li>
        )) || ""}
      </ul>
    </div>
  );
};

export default Suggestions;

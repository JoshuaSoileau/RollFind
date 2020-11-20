import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { classnames } from "../../utils";
import Button from "./Button";
const DEBUG = false;
const MAX_SUGGESTION_HEIGHT = 384;

const Suggestions = ({ data, setPanelOpen, shouldOpen }) => {
  const results = data?.results;
  const hasResults = results?.length;
  const [height, setHeight] = useState(0);
  const listItems = useRef(() => new Array(99));
  const className = ["", "list-style-none m-0 p-4  shadow-2xl"];

  const heightClass = classnames(
    "absolute top-full inset-x-0 z-10",
    "transition-all duration-500 max-h-0",
    "overflow-auto",
    "rounded-xl bg-white",
    hasResults && "max-h-full md:max-h-96 mt-4",
    !hasResults && "opacity-0 scale-95 mt-0"
  );

  const listClass = classnames("p-4", "rounded-xl bg-white");

  const listItemClass = classnames(
    "m-0 mb-4 last:mb-0  p-0",
    "transition-all duration-300 ease-in-out",
    !shouldOpen && "opacity-0 transform scale-95"
  );

  useEffect(() => (listItems.current = new Array(data?.results?.length || 0)), [
    data,
  ]);

  useLayoutEffect(() => {
    // let newHeight =
    //   listItems?.current?.reduce?.(
    //     (total, item) => total + item.offsetHeight,
    //     0
    //   ) || 0;

    // if (newHeight > MAX_SUGGESTION_HEIGHT) newHeight = MAX_SUGGESTION_HEIGHT;

    setHeight(shouldOpen ? MAX_SUGGESTION_HEIGHT : 0);
  }, [shouldOpen]);

  const BASE_DELAY = shouldOpen ? 300 : 0;

  return (
    <div
      className={heightClass}
      style={{
        height: `${height}px`,
      }}
    >
      <ul className={listClass}>
        {results?.map((item, index) => (
          <li
            key={item?.document_slug + item?.slug}
            ref={(el) => (listItems.current[index] = el)}
            className={listItemClass}
            style={{
              transitionDelay: BASE_DELAY + index * 100 + "ms",
            }}
          >
            <Button item={item} onClick={() => setPanelOpen(index)} />
            {DEBUG ? (
              <div className="debugger max-w-full overflow-scroll bg-gray-100">
                <pre>
                  <code>{JSON.stringify(item, 0, 4)}</code>
                </pre>
              </div>
            ) : (
              ""
            )}
          </li>
        )) || ""}
      </ul>
    </div>
  );
};

export default Suggestions;

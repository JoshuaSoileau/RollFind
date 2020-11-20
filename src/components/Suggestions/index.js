import React from "react";
import { classnames } from "../../utils";
import Button from "./Button";
const DEBUG = false;

const Suggestions = ({ data, setPanelOpen }) => {
  const results = data?.results;

  const className = ["", "list-style-none m-0 p-4  shadow-2xl"];

  const hasResults = results?.length;

  const heightClass = classnames(
    "top-full inset-x-0 z-10",
    "transition-all duration-500 max-h-0",
    "rounded-xl bg-white overflow-auto",
    hasResults && "max-h-full md:max-h-96 mt-4",
    !hasResults && "opacity-0 scale-95 mt-0"
  );

  return (
    <div className={heightClass}>
      <ul className={className.join("  ")}>
        {results?.map((item, index) => (
          <li
            key={item?.document_slug + item?.slug}
            className="m-0 mb-4 last:mb-0  p-0"
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

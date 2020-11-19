import React from "react";
import Button from "./Button";
const DEBUG = false;

const Suggestions = ({ data }) => {
  const results = data?.results;

  const className = [
    "absolute top-full inset-x-0",
    "max-h-96 overflow-auto",
    "list-style-none m-0 p-4  shadow-2xl",
  ];

  return (
    <ul className={className.join("  ")}>
      {results?.map((item) => (
        <li key={item?.document_slug + item?.slug} className="m-0 mb-4 p-0">
          <Button item={item} />
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
  );
};

export default Suggestions;

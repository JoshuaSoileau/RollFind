import React from "react";
import { classnames, fadeBlipClassName } from "../../utils";
const QuickSearchOptions = [
  "Sleep",
  "Suggestion",
  "Potion of healing",
  "Fireball",
  "Exhaustion",
  "Starvation",
  "Gnome",
  "Orc",
  "Kobold",
  "Ogre",
  "Deck of many things",
  "Poison",
  "Hideous laughter",
];

const QuickSearch = ({ shouldOpen, setValue }) => {
  const containerClass = classnames(
    "quick-search mt-16 text-center max-w-xl mx-auto",
    shouldOpen && "pointer-events-none",
    fadeBlipClassName(!shouldOpen)
  );
  const quicksearchItemClassName = classnames(
    "inline-block m-1",
    fadeBlipClassName(!shouldOpen)
  );

  return (
    <div className={containerClass}>
      Or, try these:
      <ul className="mt-3">
        {QuickSearchOptions.map((option, index) => (
          <li
            key={option}
            className={quicksearchItemClassName}
            style={{
              transitionDelay: !shouldOpen ? index * 50 + 400 + "ms" : 0,
            }}
          >
            <button
              type="button"
              onClick={() => setValue(option)}
              className="relative inline-block text-white p-1 px-3 text-sm font-bold group"
            >
              <span className="relative z-10">{option}</span>
              <div className="absolute inset-0 bg-green-500 bg-opacity-40  rounded-lg transform duration-200 ease-in-out scale-1 group-hover:scale-105"></div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickSearch;

import React from "react";
import { classnames, fadeBlipClassName } from "../../utils";

const Header = ({ shouldOpen }) => {
  const headerClassName = classnames(
    "header  text-center",
    "mb-12",
    fadeBlipClassName(!shouldOpen)
  );
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
        rel="stylesheet"
      />
      <div className={headerClassName}>
        <h1 className="mb-6 mt-12 md:mt-0 text-4xl md:text-6xl font-extrabold font-sans-special">
          🎲 &nbsp;
          <span className="text-blue-100">Roll</span>
          &nbsp;
          <span className="text-red-300">Find</span>
        </h1>
        <p className="text-xl mb-12">
          Quick search of ⚔️ &nbsp;D&amp;D rules, <br />
          stats, details, and general info.
        </p>
        <p>Simply type in the field below...</p>
      </div>
    </>
  );
};

export default Header;

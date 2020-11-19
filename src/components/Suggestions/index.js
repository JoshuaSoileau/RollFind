import React from "react";

const Suggestions = (props) => {
  return (
    <pre>
      <code>{JSON.stringify(props, 0, 4)}</code>
    </pre>
  );
};

export default Suggestions;

import React from "react";

const Emoji = ({ emojum, label }) => {
  return (
    <span role="img" aria-label={label}>
      {emojum}
    </span>
  );
};

export default Emoji;

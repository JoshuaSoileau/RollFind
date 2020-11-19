export const newlineToBreakTag = (str) => {
  return str?.trim()?.replace(/(?:\r\n|\r|\n)/g, "<br>");
};

export default {
  newlineToBreakTag,
};

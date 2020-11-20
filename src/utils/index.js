export const newlineToBreakTag = (str) => {
  return str?.trim()?.replace(/(?:\r\n|\r|\n)/g, "<br>");
};

export function classnames(...args) {
  if (!args || !args?.length) return "";

  return args.filter(Boolean).join(" ");
}

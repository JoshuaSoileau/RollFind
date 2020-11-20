export const newlineToBreakTag = (str) => {
  return str?.trim()?.replace(/(?:\r\n|\r|\n)/g, "<br>");
};

export function classnames(...args) {
  if (!args || !args?.length) return "";

  return args.filter(Boolean).join(" ");
}

export const newlineToPtag = (str) => {
  return str
    ?.replace(/^(?!<p>)(.*)(?!<\/p>)$/gm, "<p class='empty:hidden'>$1</p>")
    ?.replace(/<p>(.*)<\/p>/, "$1");
};

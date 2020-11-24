export const newlineToBreakTag = (str) => {
  return str?.trim()?.replace(/(?:\r\n|\r|\n)/g, "<br>");
};

export const legiblize = (str) => str.replaceAll("_", " ");

export function classnames(...args) {
  if (!args || !args?.length) return "";

  return args.filter(Boolean).join(" ");
}

export const newlineToPtag = (str) => {
  return str
    ?.replace(
      /^(?!<p>)(.*)(?!<\/p>)$/gm,
      "<p class='description-item  empty:pb-2 empty:m-0'>$1</p>"
    )
    ?.replace(/<p>(.*)<\/p>/, "$1");
};

export const fadeBlipClassName = (condition) =>
  classnames(
    "transition duration-500 ease-in-out",
    !condition &&
      "opacity-0 transform scale-95 translate-y-4 pointer-events-none"
  );

import "twin.macro";
import "./styles/tailwind.css";
import Input from "./components/Input";
import Panel from "./components/Panel";
import { useEffect, useState } from "react";
import useFetchApi from "./hooks/useFetchApi";
import Suggestions from "./components/Suggestions";
import { classnames } from "./utils";
import useDebouncedEffect from "./hooks/useDebouncedEffect";
import QuickSearch from "./components/QuickSearch";
import Header from "./components/Header";
import usePrevious from "./hooks/usePrevious";
import Octocat from "./components/Octocat";

const ALLOWED_CLICK_TARGETS = [
  "a",
  ".panel",
  ".input",
  ".suggestions",
  ".quick-search",
];

const useValue = (initial) => useState(initial);
const useSearch = (initial) => useState(initial);
const useShouldOpen = (initial) => useState(initial);
const usePanelItem = (initial) => useState(initial);
const usePanelOpen = (initial) => useState(initial);

function App() {
  const [value, setValue] = useValue("");
  const prevValue = usePrevious(value);
  const [search, setSearch] = useSearch("");
  const [shouldOpen, setShouldOpen] = useShouldOpen(true);
  const [panelItem, setPanelItem] = usePanelItem({});
  const [panelOpen, setPanelOpen] = usePanelOpen(false);
  const data = useFetchApi(search);

  useEffect(() => setShouldOpen(false), [setShouldOpen]);

  useDebouncedEffect(
    () => {
      if (value !== prevValue) setSearch(value);
    },
    400,
    [prevValue]
  );

  useEffect(() => {
    if (!panelItem || !Object.keys(panelItem).length) {
      setPanelOpen(false);
      return;
    }
    setPanelOpen(true);
  }, [setPanelOpen, panelItem]);

  useEffect(() => {
    if (value?.length < 3) {
      setShouldOpen(false);
      setPanelOpen(false);
    }
  }, [setShouldOpen, setPanelOpen, value]);

  useEffect(() => {
    if (data?.results?.length) {
      setShouldOpen(true);
    } else {
      setShouldOpen(false);
      setPanelOpen(false);
    }
  }, [setShouldOpen, setPanelOpen, data]);

  useEffect(() => setPanelOpen(false), [setPanelOpen, data]);

  useEffect(() => {
    const handleClose = (event) => {
      const searchIsOpen = Boolean(search);
      const targets = ALLOWED_CLICK_TARGETS.map((classname) =>
        document.querySelector(classname)
      ).filter(Boolean);

      if (
        searchIsOpen &&
        !targets.some((target) => target.contains(event.target))
      ) {
        event.stopPropagation();
        event.preventDefault();

        // setPanelItem({});
        setSearch("");
      }
    };

    document.addEventListener("click", handleClose);

    return () => document.removeEventListener("click", handleClose);
  });

  const className = classnames(
    "flex justify-center relative z-10",
    "w-full transform duration-500 ease-in-out",
    shouldOpen && "-translate-y-64 delay-100"
  );

  const leftPanelClass = classnames(
    "relative md:z-10",
    "min-h-full  p-4  md:py-72 lg:py-96",
    // "overflow-hidden",
    "text-white",
    "transition-all duration-700 ease-in-out transform",
    !panelOpen && "md:translate-x-1/2",
    panelOpen && "translate-x-0"
  );

  const rightColClass = classnames(
    "max-h-full",
    "fixed inset-0 top-56 md:top-auto",
    "md:relative",
    "flex flex-col items-center",
    "overflow-hidden",
    "md:p-12 md:pl-0",
    !panelOpen && "pointer-events-none"
  );

  const howClass = classnames(
    "prose text-white  mt-24 md:mt-64",
    "pb-32",
    "max-w-48 mx-auto",
    "transform duration-500 ease-in-out",
    shouldOpen && "-translate-y-64 delay-100 opacity-0"
  );

  return (
    <>
      <div className="md:grid md:grid-cols-2 h-screen min-h-screen bg-gray-900  overflow-scroll">
        <div className={leftPanelClass}>
          <Header shouldOpen={shouldOpen} />
          <div className={className}>
            <div className="w-96 max-w-full relative">
              <Input
                search={search}
                setSearch={setSearch}
                value={value}
                setValue={setValue}
              />
              <Suggestions
                data={data}
                setPanelItem={setPanelItem}
                shouldOpen={shouldOpen}
              />
            </div>
          </div>
          <QuickSearch shouldOpen={shouldOpen} setValue={setValue} />
          <div className={howClass}>
            <h3 tw="text-white! font-bold">What?</h3>
            <p>
              I've been wanting a tool that's just a single input field, that I
              can use to quickly look up things during DnD sessions.
            </p>
            <h3 tw="text-white! font-bold">Why?</h3>
            <p>
              Because I got tired of looking up how many dice to roll for
              a&nbsp;
              <button
                type="button"
                onClick={() => setValue("Potion of Greater Healing")}
                tw="font-extrabold! underline text-pink-500!"
              >
                Potion of Greater Healing
              </button>
              .
            </p>
            <h3 tw="text-white! font-bold">How?</h3>
            <p>
              This tool is really just a fancy wrapper around{" "}
              <a
                href="https://www.open5e.com"
                target="_blank"
                rel="noreferrer"
                tw="font-extrabold! underline text-pink-500!"
              >
                Open5e.com
              </a>
              's api.
            </p>
            <p>It's all open source!</p>
            <p>
              Click on the octocat on the top right hand corner to see all the
              source code.
            </p>
            <h3 tw="text-white! font-bold">
              But here's the TLDR, it's built with:
            </h3>
            <ul>
              <li>
                <a
                  href="https://www.open5e.com"
                  target="_blank"
                  rel="noreferrer"
                  tw="font-extrabold! underline text-pink-500!"
                >
                  Open5e
                </a>
              </li>
              <li>
                <a
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noreferrer"
                  tw="font-extrabold! underline text-pink-500!"
                >
                  React
                </a>
                &nbsp;&amp;&nbsp;
                <a
                  href="https://github.com/facebook/create-react-app"
                  target="_blank"
                  rel="noreferrer"
                  tw="font-extrabold! underline text-pink-500!"
                >
                  create-react-app
                </a>
              </li>
              <li>
                <a
                  href="https://www.tailwindcss.com"
                  target="_blank"
                  rel="noreferrer"
                  tw="font-extrabold! underline text-pink-500!"
                >
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ben-rogerson/twin.macro"
                  target="_blank"
                  rel="noreferrer"
                  tw="font-extrabold! underline text-pink-500!"
                >
                  Twin.Macro
                </a>
              </li>
              <li>
                and is hosted on&nbsp;
                <a
                  href="https://www.netlify.com"
                  target="_blank"
                  rel="noreferrer"
                  tw="font-extrabold! underline text-pink-500!"
                >
                  Netlify
                </a>
              </li>
            </ul>
            <h3 tw="text-white! font-bold">Who am I?</h3>
            <p>
              Hi, I'm{" "}
              <a
                href="https://twitter.com/joshua_soileau"
                target="_blank"
                rel="noreferrer"
                tw="font-extrabold! underline text-pink-500!"
              >
                Josh
              </a>
              .
            </p>
            <p>
              I made this with
              <span tw="mx-4">💢</span>
              and
              <strong tw="text-white! inline-block ml-4">(╯°□°)╯︵ ┻━┻</strong>
            </p>
          </div>
        </div>
        <div className={rightColClass}>
          <Panel
            item={panelItem}
            isOpen={panelOpen}
            setPanelItem={setPanelItem}
          />
        </div>
      </div>
      <Octocat />
    </>
  );
}

export default App;

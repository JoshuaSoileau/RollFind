import "./styles/tailwind.css";
import Input from "./components/Input";
import Panel from "./components/Panel";
import { useEffect, useState } from "react";
import useFetchApi from "./hooks/useFetchApi";
import Suggestions from "./components/Suggestions";
import { classnames, fadeBlipClassName } from "./utils";
import useDebouncedEffect from "./hooks/useDebouncedEffect";

const QuickSearchOptions = [
  "Sleep",
  "Suggestion",
  "Potion of Lesser Healing",
  "Potion of Greater Healing",
  "Fireball",
  "Exhaustion",
  "Starvation",
  "Gnome",
  "Orc",
  "Kobold",
  "Ogre",
];

const useValue = (initial) => useState(initial);
const useSearch = (initial) => useState(initial);
const useShouldOpen = (initial) => useState(initial);
const usePanelItem = (initial) => useState(initial);
const usePanelOpen = (initial) => useState(initial);

function App() {
  const [value, setValue] = useValue("");
  const [search, setSearch] = useSearch("");
  const [shouldOpen, setShouldOpen] = useShouldOpen("");
  const [panelItem, setPanelItem] = usePanelItem({});
  const [panelOpen, setPanelOpen] = usePanelOpen(false);
  const data = useFetchApi(search);

  useDebouncedEffect(
    () => {
      setSearch(value);
    },
    400,
    [value]
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

  const className = classnames(
    "flex justify-center",
    "w-full",
    shouldOpen && "-translate-y-32 delay-100",
    panelOpen && "md:pr-1/2"
  );

  const headerClassName = classnames(
    "header  text-center",
    "mb-12",
    fadeBlipClassName(!shouldOpen)
  );

  const quicksearchItemClassName = classnames(
    "inline-block m-1",
    fadeBlipClassName(!shouldOpen)
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="flex flex-col justify-start md:justify-center items-center h-screen w-screen flex-wrap bg-gray-900 p-4  overflow-hidden text-white">
        <div className={headerClassName}>
          <h1 className="mb-4 text-3xl font-extrabold">🎲 Roll Find</h1>
          <p>Quick search of basically anything ⚔️ &nbsp;D&amp;D.</p>
        </div>
        <div className={className}>
          <div className="w-96 max-w-full relative">
            <Input value={value} setSearch={setSearch} setValue={setValue} />
            <Suggestions
              data={data}
              setPanelItem={setPanelItem}
              shouldOpen={shouldOpen}
            />
          </div>
        </div>
        <Panel
          item={panelItem}
          isOpen={panelOpen}
          setPanelItem={setPanelItem}
        />
        <div className="quick-search mt-16 text-center max-w-xl">
          Or, try these:
          <ul>
            {QuickSearchOptions.map((option, index) => (
              <li
                key={option}
                className={quicksearchItemClassName}
                style={{
                  transitionDelay: !shouldOpen ? index * 50 + "ms" : 0,
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
      </div>
    </>
  );
}

export default App;

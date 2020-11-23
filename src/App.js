import "./styles/tailwind.css";
import Input from "./components/Input";
import Panel from "./components/Panel";
import { useEffect, useState } from "react";
import useFetchApi from "./hooks/useFetchApi";
import Suggestions from "./components/Suggestions";
import { classnames, fadeBlipClassName } from "./utils";
import useDebouncedEffect from "./hooks/useDebouncedEffect";
import QuickSearch from "./components/QuickSearch";
import Header from "./components/Header";
import usePrevious from "./hooks/usePrevious";

const ALLOWED_CLICK_TARGETS = [
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

  useEffect(() => setShouldOpen(false), []);

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
      const targets = ALLOWED_CLICK_TARGETS.map((classname) =>
        document.querySelector(classname)
      ).filter(Boolean);

      if (!targets.some((target) => target.contains(event.target))) {
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
    shouldOpen && "-translate-y-64 delay-100",
    panelOpen && "md:pr-1/2"
  );

  return (
    <>
      <div className="flex flex-col justify-start md:justify-center items-center h-screen w-screen flex-wrap bg-gray-900 p-4  overflow-hidden text-white">
        <Header shouldOpen={shouldOpen} />
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
        <QuickSearch shouldOpen={shouldOpen} setValue={setValue} />
      </div>
    </>
  );
}

export default App;

import "./styles/tailwind.css";
import Input from "./components/Input";
import Panel from "./components/Panel";
import { useEffect, useState } from "react";
import useFetchApi from "./hooks/useFetchApi";
import Suggestions from "./components/Suggestions";
import { classnames } from "./utils";
import useDebouncedEffect from "./hooks/useDebouncedEffect";

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
    "transition-all duration-500 ease-in-out transform",
    "flex justify-center",
    "w-full",
    shouldOpen && "-translate-y-32 delay-100",
    panelOpen && "md:pr-1/2"
  );
  const headerClassName = classnames(
    "header  text-center",
    "mb-12",
    "transition duration-500 ease-in-out",
    shouldOpen && "opacity-0 transform scale-95 translate-y-4"
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="flex flex-col justify-start md:justify-center items-center h-screen w-screen flex-wrap bg-gradient-to-br  from-gray-100 to-gray-300 p-4  overflow-hidden">
        <div className={headerClassName}>
          <h1 className="mb-4 text-3xl font-extrabold">Roll Find</h1>
          <p>Quick search of basically anything D&amp;D.</p>
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
      </div>
    </>
  );
}

export default App;

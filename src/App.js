import "./styles/tailwind.css";
import Input from "./components/Input";
import { useEffect, useState } from "react";
import useFetchApi from "./hooks/useFetchApi";
import Suggestions from "./components/Suggestions";
import { classnames } from "./utils";

function App() {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const data = useFetchApi(search);
  const hasResults = Boolean(data?.results?.length);

  useEffect(() => setSearch(value), [value]);
  useEffect(() => setPanelOpen(false), [data]);

  const className = classnames(
    "transition duration-500 ease-in-out transform",
    "max-w-full",
    hasResults && "-translate-y-32 md:-translate-y-48 delay-100",
    panelOpen && "pr-96"
  );
  const headerClassName = classnames(
    "header  text-center",
    "mb-12",
    "transition duration-500 ease-in-out",
    hasResults && "opacity-0 transform scale-95 translate-y-4"
    // !hasResults && "delay-100"
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
            <Suggestions data={data} setPanelOpen={setPanelOpen} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

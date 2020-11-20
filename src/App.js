import "./styles/tailwind.css";
import Input from "./components/Input";
import { useEffect, useState } from "react";
import useFetchApi from "./hooks/useFetchApi";
import Suggestions from "./components/Suggestions";

function App() {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const data = useFetchApi(search);

  useEffect(() => setSearch(value), [value]);
  useEffect(() => setPanelOpen(false), [data]);

  const className = [
    "transition-spacing duration-300 ease-in-out p-0",
    data?.results?.length && "pb-96",
    panelOpen && "pr-96",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen flex-wrap">
      <div className={className}>
        <div className="w-96 relative">
          <Input value={value} setSearch={setSearch} setValue={setValue} />
          <Suggestions data={data} setPanelOpen={setPanelOpen} />
        </div>
      </div>
    </div>
  );
}

export default App;

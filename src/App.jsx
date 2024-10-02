import React, { useEffect, useState } from "react";
import Visualizer from "./components/visualizer/Visualizer";

function App() {
  const [data, setData] = useState([1]);

  useEffect(() => {
    setInterval(() => {
      setData((prevData) => {
        return [...prevData, Math.floor(Math.random() * 100)];
      });
    }, 1500);
  }, []);

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-lg">Data Diff Checker</h1>
      <Visualizer data={data} />
    </div>
  );
}

export default App;

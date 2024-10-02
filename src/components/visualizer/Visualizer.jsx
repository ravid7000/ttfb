import React from "react";
import { useDiff } from "./useDiff";

function Visualizer({ data }) {
  const list = useDiff(data);

  return (
    <div className="flex flex-wrap">
      {list.map((item, index) => {
        return (
          <div
            key={index}
            className={`w-10 h-10 border border-black inline-flex items-center justify-center ${
              item.isAdded && "bg-green-500"
            } ${item.isRemoved && "bg-red-500"} ${
              item.isChanged && "bg-yellow-400 font-bold"
            }`}
          >
            {item.value}
          </div>
        );
      })}
    </div>
  );
}

export default Visualizer;

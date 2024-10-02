import { useEffect, useMemo, useRef } from "react";

function findDiffInArray(oldData, newData) {
  // we need to add three properties into data, isAdded, isChanged, isRemoved
  // isAdded: true, means the data is added
  // isChanged: true, means the data is changed
  // isRemoved: true, means the data is removed

  // first we need to remove isRemoved marked items from oldData
  oldData = oldData.slice(0).filter((item) => !item.isRemoved);

  let diff = [];
  let maxLen = Math.max(oldData.length, newData.length);

  for (let i = 0; i < maxLen; i++) {
    if (oldData[i] === undefined) {
      diff.push({
        value: newData[i],
        isAdded: true,
      });
    } else if (newData[i] === undefined) {
      diff.push({
        value: oldData[i],
        isRemoved: true,
      });
    } else if (oldData[i] !== newData[i]) {
      diff.push({
        value: newData[i],
        isChanged: true,
      });
    } else {
      diff.push({
        value: oldData[i],
      });
    }
  }

  return diff;
}

export function useDiff(data) {
  const oldData = useRef([]);
  const prevData = useMemo(
    () => findDiffInArray(oldData.current, data),
    [data]
  );

  useEffect(() => {
    oldData.current = data;
  }, [data]);

  return prevData;
}

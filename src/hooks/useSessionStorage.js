import { useState } from "react";

export const useSessionStorage = (key) => {
  const [data, setData] = useState(() => {
    const session = JSON.parse(sessionStorage.getItem(key));
    return session || null;
  });

  const dataHandler = (value) => {
    setData(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [data, dataHandler];
};

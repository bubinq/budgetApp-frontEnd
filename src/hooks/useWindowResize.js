import { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [size, setSize] = useState({ width: undefined, height: undefined });

  useEffect(() => {
    const resizeHandler = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return size;
};

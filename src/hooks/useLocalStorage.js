import { useEffect, useState } from "react";

function useLocalStorage(key , intialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || intialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;

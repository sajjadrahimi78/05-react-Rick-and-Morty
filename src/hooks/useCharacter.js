import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useCharacter(query) {
  // state
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // use web api
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      // error landling
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results);
        // setIsLoading(false);
      } catch (error) {
        // condition when use fetch or axios
        // fetch => error.name === "AbortError"
        // axios => axios.isCancel()
        if (!axios.isCancel()) {
          //* for real project :  error.response.data.message
          // setIsLoading(false);
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    // cleanup function
    return () => {
      // controller
      controller.abort();
    };
  }, [query]);

  return {isLoading , characters}
}

export default useCharacter;

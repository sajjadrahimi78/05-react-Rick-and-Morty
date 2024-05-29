import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  // state
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)

  const handleSelectCharacter = (id) => {
    setSelectedId(privId => privId === id ? null : id);
  }

  // ! Do not fetch data As follows in "render logic"
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => setCharacters(data.results));

  // ============================================================================
  // * we can fetch data with 2 ways
  // 1. use useEffect -> when data louded use useEffect
  // 2. event handler function => for example when user click on button use event handler function
  // ============================================================================

  // --------------------------------- useEffect ---------------------------------
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       // error condition
  //       if (!res.ok) throw new Error("Something went wrong!");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results);
  //       // setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       // setIsLoading(false);
  //       toast.error(err.message);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // * -------------------------- we can use async await --------------------------
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character");

  //       // error condition
  //       if (!res.ok) throw new Error("Something went wrong!");

  //       const data = await res.json();
  //       setCharacters(data.results.slice(0, 5));
  //       // setIsLoading(false);
  //     } catch (error) {
  //       //* for real project :  error.response.data.message
  //       // setIsLoading(false);
  //       toast.error(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // * ---------------------- we can use async await & axios ----------------------

  useEffect(() => {
    async function fetchData() {
      // error landling
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(data.results.slice(0, 5));
        // setIsLoading(false);
      } catch (error) {
        //* for real project :  error.response.data.message
        // setIsLoading(false);
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  // dependency array : role ? => when to run effect function

  // 1. useEffect(() => {}) => run on every renders => //!never used
  // 2. useEffect(() => {} , []) => run on mount mood
  // 3. useEffect(() => {when use state...} , [use state... , props]) => when dependency array change => run effect function
  // ? when useEffect run?
  // state => change => re-render component => browser paint
  // state => change => run effect function => if we use setState in useEffect => re-render component ...

  return (
    <div className="app">
      <Toaster />
      {/* Component composition -> remove additional layers */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult nomOfResult={characters.length} />
      </Navbar>

      <Main characters={characters}>
        <CharacterList characters={characters} isLoading={isLoading} onSelectCharacter={handleSelectCharacter} selectedId={selectedId}/>
        <CharacterDetail selectedId={selectedId}/>
      </Main>
    </div>
  );
}

export default App;

// Component composition -> remove additional layers
function Main({ children }) {
  return <div className="main">{children}</div>;
}

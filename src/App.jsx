import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourits, Search, SearchResult } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // state
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacter(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("Favourites" , []);

  const isAddedToFavourite = favourites
    .map((fav) => fav.id)
    .includes(selectedId);

  const handleSelectCharacter = (id) => {
    setSelectedId((privId) => (privId === id ? null : id));
  };

  const handleFavourite = (char) => {
    setFavourites((privFav) => [...privFav, char]);
  };

  const handleDeleteFavourite = (id) => {
    setFavourites((privFav) => privFav.filter((fev) => fev.id !== id));
  };

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

  // dependency array : role ? => when to run effect function

  // 1. useEffect(() => {}) => run on every renders => //!never used
  // 2. useEffect(() => {} , []) => run on mount mood
  // 3. useEffect(() => {when use state...} , [use state... , props]) => when dependency array change => run effect function
  // ? when useEffect run?
  // state => change => re-render component => browser paint
  // state => change => run effect function => if we use setState in useEffect => re-render component ...

  // clean up function
  // ? what
  // the cleanup function prevents memory leaks and removes some unnecessary and unwanted behaviors. => عملکرد پاکسازی از نشت حافظه جلوگیری می کند و برخی از رفتارهای غیر ضروری و ناخواسته را حذف می کند.
  // ? how to use
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   // side effect
  //   const interval = setInterval(() => setCount((c) => c + 1), 1000);
  //   // cleanup function
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);
  // return <div style={{ color: "#fff" }}>{count}</div>;
  // ? when run
  // 1. when component unmount
  // 2. defor the next re-render (between re-renders)
  // ? where to use
  // in effect funtiond => after unmount or while re-rendering
  // * example -> feath API , timer , eventListener , ...

  return (
    <div className="app">
      <Toaster />
      {/* Component composition -> remove additional layers */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult nomOfResult={characters.length} />
        <Favourits
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>

      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={handleFavourite}
          isAddedToFavourite={isAddedToFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

// Component composition -> remove additional layers
function Main({ children }) {
  return <div className="main">{children}</div>;
}

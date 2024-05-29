import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";

function App() {
  // state
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ! Do not fetch data As follows in "render logic"
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => setCharacters(data.results));
  // * we can fetch data with 2 ways
  // 1. use useEffect -> when data louded use useEffect
  // 2. event handler function => for example when user click on button use event handler function

  // useEffect
  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results));
  // },[]);

  // * we can use async await
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results.slice(0, 5));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      {/* Component composition -> remove additional layers */}
      <Navbar>
        <SearchResult nomOfResult={characters.length} />
      </Navbar>

      <Main characters={characters}>
        <CharacterList characters={characters} isLoading={isLoading}/>
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

// Component composition -> remove additional layers
function Main({ children }) {
  return <div className="main">{children}</div>;
}

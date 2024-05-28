import { useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";

function App() {
  // state
  const [characters, setCharacters] = useState(allCharacters);

  return (
    <div className="app">
      {/* Component composition -> remove additional layers */}
      <Navbar>
        <SearchResult nomOfResult={characters.length} />
      </Navbar>

      <Main characters={characters}>
        <CharacterList characters={characters} />
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

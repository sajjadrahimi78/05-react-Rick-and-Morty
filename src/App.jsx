import { useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  // state
  const [characters, setCharacters] = useState(allCharacters);

  return (
    <div className="app">
      <Navbar nomOfResult={characters.length}/>
      <div className="main">
        <CharacterList characters={characters}/>
        <CharacterDetail/>
      </div>
    </div>
  );
}

export default App;

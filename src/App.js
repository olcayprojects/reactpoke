import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import PokeAPI from "./PokeAPI";
import PokeList from "./PokeList";

function App() {
  return (
    <div className="container-fluid bg-black text-light">
      <h1 className="text-center">POKEMON API</h1>

      <PokeAPI />
    </div>
  );
}

export default App;

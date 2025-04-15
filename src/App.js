import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PokeList from "./PokeList";

// Rastgele sayı oluşturma fonksiyonu
function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  // useState ile rastgele sayıyı yalnızca ilk renderda oluşturuyoruz
  const [num, setNum] = useState(randomNumberInRange(1, 1000));

  return (
    <div className="container-fluid bg-black text-light">
      {/* Logo resmi */}
      <img
        className="img-fluid rounded mx-auto d-block"
        src={require("./POKEMON.png")}
        alt="Pokemon Logo"
      />

      {/* PokeList component'ine rastgele sayıyı gönderiyoruz */}
      <div>
        <PokeList data={num} />
      </div>
    </div>
  );
}

export default App;

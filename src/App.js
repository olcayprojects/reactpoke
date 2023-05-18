import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import PokeAPI from "./PokeAPI";
import PokeList from "./PokeList";

function randomNumberInRange(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  let setNum = randomNumberInRange(1, 1000);
  return (
    <div className="container-fluid bg-black text-light">
      <img
        className="img-fluid rounded mx-auto d-block"
        src={require("./POKEMON.png")}
        alt=""
      />

      <PokeAPI data={setNum} />
      <hr />
      <PokeList data={setNum} />
    </div>
  );
}

export default App;

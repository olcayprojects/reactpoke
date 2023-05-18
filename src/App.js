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
  let setNum = "";

  setNum=randomNumberInRange(1,1000);
  return (
    <div className="container-fluid bg-black text-light">
      <h1 className="text-center">POKEMON API</h1>
    

      <PokeAPI data={setNum} />
      <hr />
      <PokeList data={setNum} />
      
    </div>
  );
}

export default App;

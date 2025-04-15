import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function PokeList(props) {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState({});
  const [showAllMoves, setShowAllMoves] = useState({});
  const [evolutionChains, setEvolutionChains] = useState([]);
  const [selectedEvolution, setSelectedEvolution] = useState(""); 
  const [showCards, setShowCards] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
      const { results } = await response.json();
      const detailResponse = await Promise.all(
        results.map(async ({ url }) => await fetch(url))
      );
      const pokemon = await Promise.all(detailResponse.map((item) => item.json()));
      
      setData(pokemon);

      const evolutionChainsData = await Promise.all(
        pokemon.map(async (item) => {
          const speciesResponse = await fetch(item.species.url);
          const speciesData = await speciesResponse.json();
          const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
          const evolutionChainData = await evolutionChainResponse.json();
          return { id: item.id, name: item.name, evolutionChain: evolutionChainData };
        })
      );
      
      setEvolutionChains(evolutionChainsData); 
    };

    fetchData();
  }, []);

  const handleEvolutionSelection = (e) => {
    const selected = e.target.value;
    setSelectedEvolution(selected);
    setShowCards(selected !== "");
  };

  const getEvolutionChain = (evolutionChain) => {
    let chain = [];
    let currentChain = evolutionChain.chain;

    while (currentChain) {
      chain.push(currentChain.species.name);
      currentChain = currentChain.evolves_to[0]; 
    }
    return chain;
  };

  const getUniqueEvolutionNames = () => {
    const uniqueEvolutions = [];

    evolutionChains.forEach((chain) => {
      const evolutionNames = getEvolutionChain(chain.evolutionChain);
      const evolutionName = evolutionNames[0]; 

      if (!uniqueEvolutions.includes(evolutionName)) {
        uniqueEvolutions.push(evolutionName);
      }
    });

    return uniqueEvolutions;
  };

  const getSelectedPokemonEvolutionChain = () => {
    const evolutionData = evolutionChains.find(
      (chain) => getEvolutionChain(chain.evolutionChain)[0] === selectedEvolution
    );
    return evolutionData ? getEvolutionChain(evolutionData.evolutionChain) : [];
  };

  const toggleMoves = (id) => {
    setShowTable((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const toggleShowAllMoves = (id) => {
    setShowAllMoves((prevState) => ({
      ...prevState,
      [id]: !prevState[id], 
    }));
  };

  return (
    <div className="container-fluid p-0">
      {/* Evrim türü seçme dropdown */}
      <div className="text-center mb-3">
        <select
          className="form-select"
          value={selectedEvolution}
          onChange={handleEvolutionSelection}
        >
          <option value="">Bir Evrim Türü Seçin</option>
          {getUniqueEvolutionNames().map((evolution) => (
            <option key={evolution} value={evolution}>
              {evolution.charAt(0).toUpperCase() + evolution.slice(1)} Evrimi
            </option>
          ))}
        </select>
      </div>

      {showCards && (
        <div className="row row-cols-1 row-cols-lg-4 g-0 justify-content-center m-0">
          {getSelectedPokemonEvolutionChain().map((pokemonName) => {
            const selectedPokemonData = data.find(
              (pokemon) => pokemon.name === pokemonName
            );

            if (!selectedPokemonData) return null; 

            const spriteUrl = selectedPokemonData.sprites?.other["official-artwork"]?.front_shiny || "default_image_url";

            return (
              <div className="col mb-2" key={selectedPokemonData.id}>
                <div className="card text-light h-100 me-1 border bg-dark border-info border-2">
                  <img
                    className="card-img-top mx-auto blink mt-1 bg-info bg-opacity-25 border border-info px-5 border-4"
                    src={spriteUrl}
                    alt={selectedPokemonData.name}
                  />
                  <div className="card-body m-0 bg-info bg-opacity-10 p-0">
                    <h5 className="card-title text-center">#{selectedPokemonData.id}</h5>
                    <h4 className="card-title text-center">
                      <span className="bg-black p-1 text-info fw-bold">
                        {selectedPokemonData.name.toUpperCase()}
                      </span>
                    </h4>
                    <h5 className="card-text">
                      Height: {Number.parseFloat(selectedPokemonData.height) / 10}m
                    </h5>
                    <h5 className="card-text">
                      Weight: {Number.parseFloat(selectedPokemonData.weight) / 10}kg
                    </h5>
                    <hr />
                    {/* Stats Table */}
                    <table className="table table-dark table-striped table-bordered table-sm">
                      <tbody>
                        {selectedPokemonData.stats.map((stat, i) => (
                          <tr key={i}>
                            <td className="text-end align-middle">
                              <span className="bg-black p-2 fw-bold">
                                {stat.stat.name.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-1 w-50">
                              <ProgressBar
                                variant={
                                  stat.stat.name === "hp"
                                    ? "success"
                                    : stat.stat.name === "attack"
                                    ? "warning"
                                    : stat.stat.name === "defense"
                                    ? "info"
                                    : stat.stat.name === "special-attack"
                                    ? "danger"
                                    : stat.stat.name === "special-defense"
                                    ? "primary"
                                    : stat.stat.name === "speed"
                                    ? "secondary"
                                    : null
                                }
                                now={Math.min(stat.base_stat, 100)}
                                label={stat.base_stat}
                                className="progress-bar bg-black progress-bar-animated"
                                animated
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <h5
                      className="text-center bg-black text-info btn fw-bold"
                      onClick={() => toggleMoves(selectedPokemonData.id)}
                    >
                      Show/Hide Moves
                    </h5>

                    {/* Moves Table */}
                    {showTable[selectedPokemonData.id] && (
                      <div className="table-responsive">
                        <table className="table table-dark table-striped table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Lvl</th>
                              <th>Learn Method</th>
                              <th>Version Group</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPokemonData.moves.slice(0, 5).map((move, index) => (
                              <tr key={index}>
                                <td>{move.move.name}</td>
                                <td>{move.version_group_details[0].level_learned_at}</td>
                                <td>{move.version_group_details[0].move_learn_method.name}</td>
                                <td>{move.version_group_details[0].version_group.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Show More / Show Less */}
                        {selectedPokemonData.moves.length > 5 && (
                          <button
                            className="btn btn-info w-100"
                            onClick={() => toggleShowAllMoves(selectedPokemonData.id)}
                          >
                            {showAllMoves[selectedPokemonData.id] ? "Show Less" : "Show More"}
                          </button>
                        )}

                        {/* Show more moves if needed */}
                        {showAllMoves[selectedPokemonData.id] && (
                          <table className="table table-dark table-striped table-bordered table-sm">
                            <tbody>
                              {selectedPokemonData.moves.slice(5).map((move, index) => (
                                <tr key={index}>
                                  <td>{move.move.name}</td>
                                  <td>{move.version_group_details[0].level_learned_at}</td>
                                  <td>{move.version_group_details[0].move_learn_method.name}</td>
                                  <td>{move.version_group_details[0].version_group.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PokeList;

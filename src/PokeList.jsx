import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function PokeList(props) {
  const [data, setData] = useState();
  const [showTable, setshowTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?20&offset=" + props.data
      );
      const { results } = await response.json();
      const detailResponse = await Promise.all(
        results.map(async ({ url }) => await fetch(url))
      );
      const pokemon = await Promise.all(
        detailResponse.map((item) => item.json())
      );
      setData(pokemon);
    };
    fetchData();
  }, []);

  return (
    <div className="row justify-content-center">
      {data?.map((item, index) => {
        return (
          <div className="col-auto col-lg-2 p-0 mb-2" key={index}>
            <div className="card bg-dark text-light h-100 mx-1">
              <img
                className="card-img-top mx-auto blink mt-1 bg-black border border-info px-5 border-4"
                src={item.sprites.other["official-artwork"].front_shiny}
                alt=""
              />
              <div className="card-body m-0 bg-dark">
                <h5 className="card-title text-center">#{item.id}</h5>
                <h4 className="card-title text-center">
                  <span className="bg-black p-1 text-info fw-bold">
                    {String(item.name).toUpperCase()}
                  </span>
                </h4>
                <h5 className="card-text">
                  Height: {Number.parseFloat(item.height) / 10}m
                </h5>
                <h5 className="card-text">
                  Weight: {Number.parseFloat(item.weight) / 10}kg
                </h5>
                <p className="card-text">
                  <span className="fw-bold fs-5">Abilities:</span>

                  {item.abilities.map((items, index) => {
                    return (
                      <li key={index}>
                        {items.ability.name} {items.slot}
                      </li>
                    );
                  })}
                </p>
                <h6>
                  <span className="fw-bold">Forms: </span>
                  {item.forms[0].name}
                </h6>
                <h6>
                  <span className="fw-bold">Species: </span>
                  {item.species.name}
                </h6>
                <p>
                  <span className="fw-bold">Type: </span>
                  {item.types.map((type, index) => {
                    return <span key={index}>{type.type.name} </span>;
                  })}
                </p>
                <hr />
                <table className="table table-dark table-striped">
                  <tbody key={index}>
                    {item.stats.map((stat, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-end align-middle" style={{}}>
                            <span className="bg-black p-2 fw-bold">
                              {String(stat.stat.name).toUpperCase()}
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
                              now={
                                stat.base_stat > 100 ? "100" : stat.base_stat
                              }
                              label={stat.base_stat}
                              className="progress-bar bg-black progress-bar-animated"
                              animated
                            />{" "}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="text-end">
                        <span className="bg-black fw-bolder p-2 align-middle">
                          BASE EXPERIENCE
                        </span>
                      </td>
                      <td>
                        <ProgressBar
                          variant="black"
                          label={item.base_experience}
                          now={
                            item.base_experience > 100
                              ? "100"
                              : item.base_experience
                          }
                          className="progress-bar bg-black progress-bar-animated"
                          animated
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <p>Location area encounters: {item.location_area_encounters}</p> */}

                <h5
                  className="text-center bg-black text-info btn fw-bold"
                  onClick={() => setshowTable(!showTable)}
                >
                  Show/Hidden Moves
                </h5>
                {showTable ? (
                  <table className="table table-dark table-striped table-bordered ">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Level Learned at</th>
                        <th>Move Learn Method</th>
                        <th>Version Group</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.moves.map((move, index) => {
                        return (
                          <tr key={index}>
                            <td>{move.move.name}</td>
                            <td>
                              {move.version_group_details[0].level_learned_at}
                            </td>
                            <td>
                              {
                                move.version_group_details[0].move_learn_method
                                  .name
                              }
                            </td>
                            <td>
                              {move.version_group_details[0].version_group.name}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PokeList;

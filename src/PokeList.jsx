import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function PokeList(props) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?20&offset=" + props.data
      );
      const { results } = await response.json();
      const detailResponse = await Promise.all(
        results.map(async ({ url }: { url: string }) => await fetch(url))
      );
      const pokemon = await Promise.all(
        detailResponse.map((item) => item.json())
      );
      setData(pokemon);
    };
    fetchData();
  }, []);

  return (
    <div className="row justify-content-md-center">
      {data?.map((item, index) => {
        return (
          <div className="col-6 col-md-4 p-0 mb-2" key={index}>
            <div className="card bg-dark text-light h-100 mx-1">
              <img
                className="card-img-top bg-black blink"
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
                  <tbody>
                    {item.stats.map((stat, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-end align-middle" style={{}}>
                            {String(stat.stat.name).toUpperCase()}
                          </td>
                          <td className="px-1 w-75">
                            <ProgressBar
                              now={stat.base_stat}
                              label={stat.base_stat}
                              className="progress-bar bg-success progress-bar-animated"
                              animated
                            />{" "}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>BASE EXPERIENCE</td>
                      <td>
                        <ProgressBar
                          now={item.base_experience}
                          label={item.base_experience}
                          className="progress-bar bg-success progress-bar-animated"
                          animated
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                {/* <p>Location area encounters: {item.location_area_encounters}</p> */}
                <hr />

                <span>
                  <h5 className="text-center">Moves</h5>
                  <table className="table table-dark table-striped table-bordered">
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
                          <>
                            <tr>
                              <td>{move.move.name}</td>
                              <td>
                                {move.version_group_details[0].level_learned_at}
                              </td>
                              <td>
                                {
                                  move.version_group_details[0]
                                    .move_learn_method.name
                                }
                              </td>
                              <td>
                                {
                                  move.version_group_details[0].version_group
                                    .name
                                }
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PokeList;

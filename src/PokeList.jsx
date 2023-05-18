import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function PokeList(props) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?10&offset=" + props.data
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
                className="card-img-top bg-black border border-info border-1"
                src={item.sprites.other["official-artwork"].front_shiny}
                alt=""
              />
              <div className="card-body m-0 bg-dark">
                <h5 className="card-title text-center">{item.id}</h5>
                <h5 className="card-title text-center">
                  {String(item.name).toUpperCase()}
                </h5>
                <p className="card-text">
                  Height: {Number.parseFloat(item.height) / 10}m
                </p>
                <p className="card-text">
                  Weight: {Number.parseFloat(item.weight) / 10}kg
                </p>
                <p className="card-text ">
                  Abilities:{" "}
                  {item.abilities.map((items) => {
                    return <li>{items.ability.name}</li>;
                  })}
                </p>
                <p>
                  Type:{" "}
                  {item.types.map((type, index) => {
                    return <li>{type.type.name}</li>;
                  })}
                </p>
                <hr />

                {item.stats.map((stat, i) => {
                  return (
                    <div key={i}>
                      <table>
                        <tr>
                          <td style={{ width: "130px", textAlign: "end" }}>
                            {String(stat.stat.name).toUpperCase()}
                          </td>
                          <td style={{ width: "68%" }}>
                            <ProgressBar
                              now={stat.base_stat}
                              label={stat.base_stat}
                              className="progress-bar bg-success progress-bar-animated"
                              animated
                            />{" "}
                          </td>
                        </tr>
                      </table>
                    </div>
                  );
                })}
                <hr />
                <p>base_experience: {item.base_experience}</p>
                <p>location_area_encounters: {item.location_area_encounters}</p>
                <hr />

                <pre>
                  <b>moves:</b>{" "}
                  {item.moves.map((move, index) => {
                    return move.move.name;
                  })}
                </pre>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PokeList;

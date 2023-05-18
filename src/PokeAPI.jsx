import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokeAPI(props) {
  const [Data, setData] = useState();

  useEffect(() => {
    async function getData() {
      let res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset="+props.data);
      
      // console.log(res);
      setData(res.data.results);
    }

    getData();
  }, []);

  return (
    <div className="row row-cols-5 row-cols-md-6 g-1 justify-content-md-center">
      {Data?.map((item, index) => {
        // console.log(item);
        return (
          <div className="col point" key={index}>
            <div className="card text-light bg-dark h-100">
              <img
                className="card-img-top"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  String(item.url).split("/")[6]
                }.png`}
                alt=""
              />
              <div className="card-body">
                <p className="card-title text-center">
                  #{String(item.url).split("/")[6]}
                </p>
                <p className="card-title text-center">{String(item.name)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

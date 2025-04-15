import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokeAPI(props) {
  const [data, setData] = useState([]); // Başlangıçta boş dizi

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          // `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${props.data}`
          `https://pokeapi.co/api/v2/pokemon?limit=100000`
        );
        setData(res.data.results);
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    }

    getData();
  }, [props.data]); // `props.data`'yı bağımlılık olarak ekledik

  return (
    <div className="row row-cols-5 row-cols-md-6 g-1 justify-content-md-center">
      {data?.map((item, index) => (
        <div className="col point" key={index}>
          <div className="card text-light bg-dark h-100">
            <img
              className="card-img-top"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                String(item.url).split("/")[6]
              }.png`}
              alt={item.name} // Alt metin ekledim
            />
            <div className="card-body">
              <p className="card-title text-center">
                #{String(item.url).split("/")[6]}
              </p>
              <p className="card-title text-center">{item.name.toUpperCase()}</p> {/* Büyük harf kullanımı */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

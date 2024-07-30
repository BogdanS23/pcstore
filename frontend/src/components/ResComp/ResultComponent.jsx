import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";

function ResultComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/component")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <>

      <section className="container">
        <div className="res-cont">
          <header className="mini-header"></header>
          <div className="content">
            <div className="filters">
              <aside className="filter-column">
                <div className="filter-box">
                  <div className="filter-title">ФИЛЬТРЫ</div>
                  <button className="filter-button">ФИЛЬТР</button>
                </div>
              </aside>
              <div className="filter-results">
                {data.map(item => (
                  <ResultCard
                    key={item.id}
                    name={`${item.manufacturer} ${item.model}`}
                    price={item.price}
                    specs={`Производитель: ${item.manufacturer} Модель:${item.model}`}
                    image=""
                    buttonTitle="Выбрать"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResultComponent;

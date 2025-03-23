import VectorItem from "#/atoms/vectors/vector.jsx";
import React from "react";
import './vectors.css';

export default function Vectors ({ vectors }) {
  return (
    <div className="vectors__wrapper">
      <h2 className="vectors__title">Векторы развития</h2>
      <div className="vectors">
        {
          vectors.map((vector) => {
            return <VectorItem key={vector.title} image={vector.image} route={vector.route} title={vector.title} profits={ vector.profits }/>
          })
        }
      </div>
    </div>
  )
}

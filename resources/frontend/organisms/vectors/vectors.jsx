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
            return <VectorItem id={vector.id} key={vector.name} image={vector.image_main} name={vector.name} sections={ vector.sections }/>
          })
        }
      </div>
    </div>
  )
}

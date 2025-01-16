import React from "react";
import './package.css'

export default function Package({title, description, onClick}) {
  return (
    <button className="package" onClick={onClick}>
      <div className="package__title">{ title }</div>
      <div className="package__description">{ description }</div>
    </button>
  )
}

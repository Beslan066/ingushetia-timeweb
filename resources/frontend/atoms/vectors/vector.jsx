import './vector.css';
import AppLink from "#/atoms/buttons/link.jsx";
import Checkmark from "#/atoms/icons/checkmark.jsx";
import React from "react";

export default function VectorItem({ name, image, sections, id }) {
  return (
    <div className="vector">
      <div className="vector__image">
        <img src={ `/storage/${image}` } alt={ `Изображение ${ name }` }/>
      </div>

      <div className="vector__body">
        <h2 className="vector__title">{name}</h2>
        <div className="vector__profits">
          {sections?.map((section) => (
            <div className="vector__profit-container" key={section.id}>
              <div className="vector__checkmark">
                <Checkmark color="primary-medium" />
              </div>
              <div className="vector__profit">
                {/* Выводим заголовок секции (section.title) */}
                {section.title}
              </div>
            </div>
          ))}
        </div>
        <AppLink href title="Подробнее" to={`/vectors/${id}`} />
      </div>
    </div>
  );
}

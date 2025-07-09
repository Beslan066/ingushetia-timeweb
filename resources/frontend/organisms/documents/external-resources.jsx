import './external-resources.css';
import React, { useState } from "react";
import ExternalResource from "#/atoms/links/external-resource.jsx";
import LeftArrowIcon from "#/atoms/icons/left-arrow-icon.jsx";
import RightArrowIcon from "#/atoms/icons/right-arrow-icon.jsx";

export default function ExternalResources({ resources }) {
  if (!resources || !resources.length) {
    return null;
  }

  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      (prevIndex + 1) % resources.length
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      (prevIndex - 1 + resources.length) % resources.length
    );
  };

  const visibleResources = resources.slice(startIndex, startIndex + itemsToShow);
  if (visibleResources.length < itemsToShow) {
    visibleResources.push(...resources.slice(0, itemsToShow - visibleResources.length));
  }

  return (
    <div className="external-resources__wrapper">
      <h2 className="external-resources__title">Полезные ресурсы</h2>
      <div className="external-resources">
        {visibleResources.map((resource) => (
          <ExternalResource key={resource.id} title={resource.title} link={resource.link} />
        ))}
      </div>
      <div className="external-resources__controls">
        <button onClick={handlePrev}>
          <LeftArrowIcon color={'neutral-black'} />
        </button>
        <button onClick={handleNext}>
          <RightArrowIcon color={'neutral-black'} />
        </button>
      </div>
    </div>
  );
}

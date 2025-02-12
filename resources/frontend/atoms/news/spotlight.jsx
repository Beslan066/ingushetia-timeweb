import "./spotlight.css";
import VideoIcon from "#/atoms/icons/video.jsx";
import React from "react";
import { format } from "#/utilities/date.js";

export default function Spotlight({ id, date, category, title, url, onPost, hasVideo = false }) {
  const formattedDate = format(date);

  return (
    <div className="spotlight">
      <div className="spotlight__keys">
        <div className="spotlight__date">{formattedDate}</div>
        <div className="spotlight__category">{category}</div>
        {hasVideo ? <div className="spotlight__video"><VideoIcon /></div> : ""}
      </div>
      <div onClick={() => onPost({ id, title, url })} style={{ cursor: "pointer" }}>
        <h2 className="spotlight__title">{title}</h2>
      </div>
    </div>
  );
}

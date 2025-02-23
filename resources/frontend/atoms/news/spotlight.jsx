import "./spotlight.css";
import VideoIcon from "#/atoms/icons/video.jsx";
import React from "react";
import { format } from "#/utilities/date.js";
import {Link} from "@inertiajs/react";

export default function Spotlight({ id, date, category, title, url, onPost, hasVideo = false, categoryId }) {
  const formattedDate = format(date);

  return (
    <div className="spotlight">
      <div className="spotlight__keys">
        <div className="spotlight__date">{formattedDate}</div>
        {categoryId &&
          <Link href={route('posts.by.tag', categoryId)}>
          <div className="spotlight__category">{category}</div>
          </Link>
        }
        {hasVideo ? <div className="spotlight__video"><VideoIcon /></div> : ""}
      </div>
      <div onClick={() => onPost({ id, title, url })} style={{ cursor: "pointer" }}>
        <h2 className="spotlight__title">{title}</h2>
      </div>
    </div>
  );
}

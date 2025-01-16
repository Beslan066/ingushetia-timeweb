import './downloadable.css'
import DownloadIcon from "@/Components/DownloadIcon.jsx";
export default function Downloadable({title, description, link}) {
  return (
    <div className="downloadable">
      <div className="downloadable__info">
        <div className="downloadable__title">{ title }</div>
        <div className="downloadable__description">{ description }</div>
      </div>
      <div className="downloadable__icon-container">
        <a href={ link } download={ true }><DownloadIcon /></a>
      </div>
    </div>
  )
}

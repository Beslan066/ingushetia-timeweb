import './spotlights.css';
import Spotlight from "#/atoms/news/spotlight.jsx";
import AppLink from "#/atoms/buttons/link.jsx";

export default function Spotlights({ news, onPost }) {
  return (
    <div className="spotlight-sidebar">
      <div className="spotlights">
        {
          news.map((item) => {
            return (
              <Spotlight key={ item.id } id={ item.id } title={ item.title } category={ item?.category?.title } date={ item.published_at } hasVideo={ item.video } onPost={ onPost }/>
            )
          })
        }
      </div>

      <AppLink to="/news" title="Еще новости" className="spotlight__link"/>
    </div>
  )
}

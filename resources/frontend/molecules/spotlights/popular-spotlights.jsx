import './spotlights.css'
import Spotlight from "#/atoms/news/spotlight.jsx";

export default function PopularSpotlights({news, className, style, onPost}) {
  return (
    <div className={"spotlight-sidebar spotlight-sidebar--gray " + className} style={style}>
      <h4>Популярное</h4>
      <hr/>
      <div className="spotlights">
        {
          news.map((item) => {
            return (
              <Spotlight key={item.id} id={item.id} title={item.title} category={item?.category?.title}
                         date={item.published_at} hasVideo={item.video} onPost={onPost}/>
            )
          })
        }
      </div>
    </div>
  )
}

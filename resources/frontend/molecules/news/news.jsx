import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import './news.css';

export default function News({ news, onPost }) {
  return (
    <div className="news">
      {
        news.map((item) => {
          return <AgencyNewsItem key={ item.id }
                                 id={ item.id }
                                 url={ item.url }
                                 category={ item?.category?.title }
                                 image={ item?.image_main }
                                 imageWebp={ item?.image_webp }
                                 date={ item.published_at }
                                 title={ item.title }
                                 onPost={ onPost }
          />
        })
      }
    </div>
  )
}

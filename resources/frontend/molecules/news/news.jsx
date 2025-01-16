import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import './news.css';

export default function News({ news, handlePost }) {
  return (
    <div className="news">
      {
        news.map((item) => {
          return <AgencyNewsItem key={ item.id }
                                 id={ item.id }
                                 category={ item?.category?.title }
                                 image={ item?.image_main }
                                 date={ item.published_at }
                                 title={ item.title }
                                 onPost={ handlePost }
          />
        })
      }
    </div>
  )
}

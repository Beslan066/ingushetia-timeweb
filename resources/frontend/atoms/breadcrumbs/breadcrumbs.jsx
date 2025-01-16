import './breadcrumbs.css';

export default function Breadcrumbs({ breadcrumbs }) {
  if (!breadcrumbs || !breadcrumbs.length) {
    return null;
  }

  return (
    <div className="breadcrumbs">
      {
        breadcrumbs.map((item) => {
          if (!item.title) {
            return;
          }

          return (
            <div className="breadcrumb" key={ item.title }>
              { item.title }
            </div>
          )
        })
      }
    </div>
  )
}

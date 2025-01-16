import InternalTriggerLink from "#/atoms/links/internal-trigger-link.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import './activity.css'

export default function Activities({ activities }) {
  if (!activities) {
    return;
  }

  return (
    <div className="activities">
      <h2 className="activities__title">Деятельность</h2>
      <div className="activities__container">
        {
          activities && activities.map((activity) => {
            return <InternalTriggerLink key={activity.id} title={activity.title} />
          })
        }
      </div>
      <AppLink title="Все виды деятельности" to=""/>
    </div>
  )
}

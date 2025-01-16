import './banner.css'

export default function AnniversaryBanner() {
  return (
    <div className="anniversary-banner">
      <div className="anniversary__content">
        <div className="anniversary__logo">
          <img src="/img/100yearlogo.svg" alt="100 лет Республике Ингушетия"/>
        </div>
        <div className="anniversary__description">
          <div className="anniversary__title">Республике Ингушетия исполнилось 100 лет</div>
          <div className="anniversary__text">
            7 июля 2024 года Республике Ингушетия исполнилось 100 лет со дня
            образования ингушской государственности. В честь этой знаменательной даты прошло центральное масштабное
            мероприятие.
          </div>
        </div>
      </div>
    </div>
  )
}

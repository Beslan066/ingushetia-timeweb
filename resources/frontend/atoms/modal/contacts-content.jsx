import React from "react";
import './contacts-content.css'
import Button from "#/atoms/buttons/button.jsx";

export default function ContactsContent({ onClose }) {
  return (
    <div className="contacts-content">
      <div className="contacts__body-wrapper">
        <div className="contacts-modal__body">
          <div className="contacts__header">
            <h2 className="contacts__title">Обращение в пресс-службу</h2>
            <div className="contacts__description">Обратите внимание, что данное обращение будет рассмотренно в течение 2х суток</div>
          </div>
          <form className="contacts__content" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label htmlFor="type">Тип обращения</label>
              <select name="type" id="type">
                <option value="" disabled>Выберите тип обращения</option>
                <option value="Запрос">Запрос</option>
                <option value="Комментарий">Комментарий</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="surname">Фамилия</label>
              <input type="text" id="surname" name="surname" placeholder="Введите вашу фамилию"/>
            </div>
            <div className="input-group">
              <label htmlFor="name">Имя</label>
              <input type="text" id="name" name="name" placeholder="Введите ваше имя"/>
            </div>
            <div className="input-group">
              <label htmlFor="phone">Телефон</label>
              <input type="text" id="phone" name="phone" placeholder="Укажите ваш телефон"/>
            </div>
            <div className="input-group">
              <label htmlFor="email">Адрес эл. почты</label>
              <input type="text" id="email" name="email" placeholder="Укажите ваш адрес эл. почты"/>
            </div>
            <div className="input-group">
              <label htmlFor="content">Адрес эл. почты</label>
              <textarea id="content" name="content" placeholder="Введите текст обращения"/>
            </div>

            <div className="actions">
              <Button>Отправить</Button>
              <Button severity="secondary" handleClick={() => onClose()}>Отменить</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

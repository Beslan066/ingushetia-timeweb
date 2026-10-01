import React, { useState } from "react";
import './contacts-content.css'
import Button from "#/atoms/buttons/button.jsx";

export default function ContactsContent({ onClose }) {
  const [isPersonalDataChecked, setIsPersonalDataChecked] = useState(false);
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    user_family: "",
    user_name: "",
    user_phone: "",
    user_email: "",
    user_message: "",
  });

  const isSubmitDisabled =
    !isPersonalDataChecked || !isPrivacyPolicyChecked || isSubmitting;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitDisabled) return;

    setIsSubmitting(true);

    try {
      // CSRF-токен из meta-тега (см. пункт 3)
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

      const response = await fetch("/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Ошибка:", data);
        alert(data.message || "Ошибка отправки");
        return;
      }

      alert("Обращение успешно отправлено!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Ошибка сети");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contacts-content">
      <div className="contacts__body-wrapper">
        <div className="contacts-modal__body">
          <div className="contacts__header">
            <h2 className="contacts__title">Обращение в пресс-службу</h2>
            <div className="contacts__description">
              Обратите внимание, что данное обращение будет рассмотрено в течение 2х суток
            </div>
          </div>

          <form className="contacts__content" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="type">Тип обращения</label>
              <select name="type" id="type">
                <option value="" disabled>Выберите тип обращения</option>
                <option value="Запрос">Запрос</option>
                <option value="Комментарий">Комментарий</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="user_family">Фамилия</label>
              <input
                type="text"
                id="user_family"
                name="user_family"
                placeholder="Введите вашу фамилию"
                value={formData.user_family}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="user_name">Имя</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                placeholder="Введите ваше имя"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="user_phone">Телефон</label>
              <input
                type="text"
                id="user_phone"
                name="user_phone"
                placeholder="Укажите ваш телефон"
                value={formData.user_phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="user_email">Адрес эл. почты</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                placeholder="Укажите ваш адрес эл. почты"
                value={formData.user_email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="user_message">Текст обращения</label>
              <textarea
                id="user_message"
                name="user_message"
                placeholder="Введите текст обращения"
                value={formData.user_message}
                onChange={handleChange}
              />
            </div>

            <div className="consent-checkboxes">
              <label className="checkbox-group">
                <input
                  type="checkbox"
                  checked={isPersonalDataChecked}
                  onChange={(e) => setIsPersonalDataChecked(e.target.checked)}
                />
                <span>Согласен на обработку персональных данных</span>
              </label>

              <label className="checkbox-group">
                <input
                  type="checkbox"
                  checked={isPrivacyPolicyChecked}
                  onChange={(e) => setIsPrivacyPolicyChecked(e.target.checked)}
                />
                <span>Согласен с политикой конфиденциальности</span>
              </label>
            </div>

            <div className="actions">
              <Button type="submit" disabled={isSubmitDisabled}>
                {isSubmitting ? "Отправка..." : "Отправить"}
              </Button>
              <Button
                type="button"
                severity="secondary"
                handleClick={() => onClose()}
              >
                Отменить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

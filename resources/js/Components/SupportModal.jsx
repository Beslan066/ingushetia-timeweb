import { useState } from 'react';
import axios from 'axios';

export default function SupportModal({ active, onClose }) {
    const [formData, setFormData] = useState({
        user_family: '',
        user_name: '',
        user_phone: '',
        user_email: '',
        user_message: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Проверка на ввод только цифр для номера телефона
        if (name === 'user_phone') {
            const onlyNumbers = value.replace(/\D/g, ''); // Удаление всех символов, кроме цифр
            setFormData({
                ...formData,
                [name]: onlyNumbers,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        try {
            const response = await axios.post('/support', formData);
            setSuccessMessage(response.data.message);

            // Сброс формы после успешной отправки
            setFormData({
                user_family: '',
                user_name: '',
                user_phone: '',
                user_email: '',
                user_message: '',
            });

            // Закрытие модального окна через 3 секунды после успешной отправки
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 3000);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Ошибка отправки данных', error);
            }
        }
    };

    return (
        <div className={`overlay support-modal ${active ? 'active' : ''}`}>
            <div className="wrapper">
                <div className={'d-flex align-items-center justify-content-between support-modal-title'}>
                    <h3>Обращение в пресс-службу</h3>
                    <button onClick={onClose}>
                        <img src="/img/icons/Close.svg" alt=""/>
                    </button>
                </div>
                <p>Обратите внимание, что данное обращение будет рассмотренно в течение 2х суток</p>

                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className={'d-flex flex-column'}>
                        <label htmlFor={'user_family'}>Фамилия</label>
                        <input
                            type="text"
                            name={'user_family'}
                            id={'user_family'}
                            placeholder={'Введите вашу фамилию'}
                            value={formData.user_family}
                            onChange={handleChange}
                        />
                        {errors.user_family && <span className="error-message">{errors.user_family[0]}</span>}
                    </div>
                    <div className={'d-flex flex-column'}>
                        <label htmlFor={'user_name'}>Имя</label>
                        <input
                            type="text"
                            name={'user_name'}
                            id={'user_name'}
                            placeholder={'Введите ваше имя'}
                            value={formData.user_name}
                            onChange={handleChange}
                        />
                        {errors.user_name && <span className="error-message">{errors.user_name[0]}</span>}
                    </div>
                    <div className={'d-flex flex-column'}>
                        <label htmlFor={'user_phone'}>Телефон</label>
                        <input
                            type="text"
                            name={'user_phone'}
                            id={'user_phone'}
                            placeholder={'Укажите ваш телефон'}
                            value={formData.user_phone}
                            onChange={handleChange}
                        />
                        {errors.user_phone && <span className="error-message">{errors.user_phone[0]}</span>}
                    </div>
                    <div className={'d-flex flex-column'}>
                        <label htmlFor={'user_email'}>Адрес эл. почты</label>
                        <input
                            type="email"
                            name={'user_email'}
                            id={'user_email'}
                            placeholder={'Укажите ваш адрес эл. почты'}
                            value={formData.user_email}
                            onChange={handleChange}
                        />
                        {errors.user_email && <span className="error-message">{errors.user_email[0]}</span>}
                    </div>
                    <div className={'d-flex flex-column'}>
                        <label htmlFor={'user_message'}>Текст обращения</label>
                        <textarea
                            name={'user_message'}
                            id={'user_message'}
                            placeholder={'Введите текст обращения'}
                            rows={'4'}
                            value={formData.user_message}
                            onChange={handleChange}
                        />
                        {errors.user_message && <span className="error-message">{errors.user_message[0]}</span>}
                    </div>
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    )
}

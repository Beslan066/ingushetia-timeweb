<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SurveyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $satisfaction = [
            'Полностью удовлетворен',
            'Скорее удовлетворен, чем не удовлетворен',
            'Скорее не удовлетворен, чем удовлетворен',
            'Совсем не удовлетворен',
            'Затрудняюсь ответить',
        ];

        $cultureTax = [
            'Удовлетворен',
            'Скорее удовлетворен, чем не удовлетворен',
            'Не удовлетворен',
        ];

        return [
            // Используем Rule::in() вместо строки с запятыми!
            'transport'      => ['required', Rule::in($satisfaction)],
            'roads'          => ['required', Rule::in($satisfaction)],
            'water'          => ['required', Rule::in($satisfaction)],
            'electricity'    => ['required', Rule::in($satisfaction)],
            'gas'            => ['required', Rule::in($satisfaction)],
            'local_admin'    => ['required', Rule::in($satisfaction)],
            'council'        => ['required', Rule::in($satisfaction)],
            'head_admin'     => ['required', Rule::in($satisfaction)],

            'timezone' => ['required', Rule::in([
                'Я хочу вернуть сезонные переводы времени (зимнее и летнее время)',
                'Оставить как сейчас и ничего не менять (зимнее время)',
                'Я за перевод на час вперед +1 к МСК (летнее время)',
            ])],

            'culture' => ['required', Rule::in($cultureTax)],
            'tax'     => ['required', Rule::in($cultureTax)],

            'education' => ['required', Rule::in([
                'Начальное', 'Неполное среднее', 'Среднее',
                'Среднее специальное', 'Незаконченное высшее', 'Высшее',
            ])],

            'social_category' => ['required', Rule::in([
                'Студент', 'Служащий/офисные работники', 'Предприниматель/фермер',
                'Домашняя хозяйка', 'Безработный', 'Пенсионер',
            ])],

            'age_group' => ['required', Rule::in([
                '18-24 лет', '25-34 лет', '35-44 лет', '45-59 лет', '60 лет и старше',
            ])],

            'location' => ['required', Rule::in([
                'г. Магас', 'г. Назрань', 'г. Карабулак', 'г. Малгобек', 'г. Сунжа',
                'Назрановский муниципальный район', 'Сунженский муниципальный район',
                'Малгобекский муниципальный район', 'Джейрахский муниципальный район',
            ])],

            'gender' => ['required', Rule::in(['Муж.', 'Жен.'])],
        ];
    }
}
<?php

namespace App\Http\Requests\Admin\NewsIng;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */



    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'lead' => 'required|string',
            'content' => 'required',
            'image_main' => 'required|image|mimes:jpg,jpeg,webp,png',
            'category_id' => 'nullable',
            'user_id' => 'required',
            'agency_id' => 'required',
            'published_at' => 'required|date_format:Y-m-d\TH:i',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения',
            'title.max' => 'Длина заголовка не должна превышать 255 символов',
            'lead.required' => 'Заполните краткое описание',
            'content.required' => 'Заполните содержимое новости',
            'image_main.required' => 'Необходимо выбрать изображение',
            'image_main.image' => 'Файл должен быть изображением',
            'category_id.required' => 'Выберите категорию',
            'news_ing.required' => 'Выберите перевод',
            'news_ing.in' => 'Выберите правильное значение для перевода',
            'published_at.required' => 'Укажите дату публикации',
            'published_at.date' => 'Некорректный формат даты',
            'user_id.required' => 'Ошибка при определении пользователя',
            'agensy_id.required' => 'Ошибка при определении организации',
        ];
    }
}

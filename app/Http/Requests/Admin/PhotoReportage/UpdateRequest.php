<?php

namespace App\Http\Requests\Admin\PhotoReportage;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'image_main' => 'nullable|image|mimes:webp|max:130',
            'remove_slides' => 'nullable',
            'slides' => 'nullable|array',
            'slides.*' => 'image',
            'user_id' => 'required|integer',
            'news_id' => 'nullable|integer',
            'agency_id' => 'required|integer',
            'published_at' => 'required|date_format:Y-m-d\TH:i',
        ];
    }



    public function messages()
    {
        return [
            'title.required' => 'Это поле необходимо для заполнения',
            'title.string' => 'Проверьте правильность ввода',
            'title.max' => 'Максимальная длина заголовка — 255 символов',

            'image_main.nullable' => 'Это поле может быть пустым',
            'image_main.image' => 'Необходимо выбрать изображение',

            'slides.nullable' => 'Поле слайдов может быть пустым',
            'slides.array' => 'Поле слайдов должно быть массивом',

            'remove_slides.nullable' => 'Поле удаляемых слайдов может быть пустым',
            'remove_slides.*.string' => 'Каждый элемент удаляемых слайдов должен быть строкой',

            'user_id.required' => 'Идентификатор пользователя обязателен',
            'user_id.integer' => 'Идентификатор пользователя должен быть числом',

            'news_id.nullable' => 'Идентификатор новости может быть пустым',
            'news_id.integer' => 'Идентификатор новости должен быть числом',

            'agency_id.required' => 'Идентификатор агентства обязателен',
            'agency_id.integer' => 'Идентификатор агентства должен быть числом',

            'published_at.required' => 'Дата и время публикации обязательны',
            'published_at.date_format' => 'Дата и время публикации должны соответствовать формату Y-m-d\TH:i',
        ];
    }
}

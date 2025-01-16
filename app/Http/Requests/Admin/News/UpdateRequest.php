<?php

namespace App\Http\Requests\Admin\News;

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
            'title' => 'required|string',
            'lead' => 'required|string|max:255',
            'content' => 'required',
            'image_main' => 'nullable|image|mimes:jpg,jpeg,webp,png',
            'category_id' => 'nullable',
            'news_ing' => 'nullable',
            'main_material' => 'nullable',
            'user_id' => 'required',
            'agency_id' => 'required',
            'image_author' => 'nullable|string|max:255',
            'image_description' => 'nullable|string|max:255',
            'published_at' => 'nullable|date_format:Y-m-d\TH:i',
            'video_id' => 'nullable',
            'reportage_id' => 'nullable',
            'url' => 'nullable',

        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения.',
            'title.string' => 'Заголовок должен быть строкой.',
            'lead.required' => 'Заполните краткое описание.',
            'lead.string' => 'Краткое описание должно быть строкой.',
            'lead.max' => 'Длина краткого описания не должна превышать 255 символов.',
            'content.required' => 'Заполните содержимое новости.',
            'image_main.required' => 'Необходимо выбрать изображение.',
            'image_main.image' => 'Файл должен быть изображением.',
            'image_main.mimes' => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',
            'category_id.nullable' => 'Выбор категории не обязателен.',
            'news_ing.nullable' => 'Выбор перевода не обязателен.',
            'main_material.nullable' => 'Это поле не обязательно для заполнения.',
            'user_id.required' => 'Ошибка при определении пользователя.',
            'agency_id.required' => 'Ошибка при определении организации.',
            'published_at.required' => 'Укажите дату публикации.',
            'published_at.date_format' => 'Некорректный формат даты, используйте формат ГГГГ-ММ-ДДTЧЧ:ММ.',
            'image_author.required' => 'Заполните краткое image_author.',
            'image_author.string' => 'Краткое image_author должно быть строкой.',
            'image_author.max' => 'Длина краткого image_author не должна превышать 255 символов.',
            'image_description.required' => 'Заполните краткое image_description.',
            'image_description.string' => 'Краткое image_description должно быть строкой.',
            'image_description.max' => 'Длина краткого image_description не должна превышать 255 символов.',
        ];
    }
}

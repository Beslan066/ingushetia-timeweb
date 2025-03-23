<?php

namespace App\Http\Requests\Admin\Video;

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
            'lead' => 'nullable|string|max:255',
            'video' => 'nullable|mimes:mp4,avi,mov,wmv,flv,mkv|max:512000',
            'image_main' => 'nullable|image|mimes:webp|max:130',
            'news_id' => 'nullable',
            'user_id' => 'required',
            'agency_id' => 'required',
            'published_at' => 'required|date_format:Y-m-d\TH:i',
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
            'video.required' => 'Необходимо выбрать видео.',
            'video.image' => 'Файл должен быть видео.',
            'video.mimes' => 'Видео должно быть в формате: jpg, jpeg, webp, png.',
            'news_id.nullable' => 'Выбор новости не обязателен.',
            'user_id.required' => 'Ошибка при определении пользователя.',
            'agency_id.required' => 'Ошибка при определении организации.',
            'published_at.required' => 'Укажите дату публикации.',
            'published_at.date_format' => 'Некорректный формат даты, используйте формат ГГГГ-ММ-ДДTЧЧ:ММ.',
            'image_main.required' => 'Необходимо выбрать изображение.',
            'image_main.image' => 'Файл должен быть изображением.',
            'image_main.mimes' => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',
        ];
    }
}

<?php

namespace App\Http\Requests\Admin\PhotoReportage;

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
      'title' => 'required|string|max:255|min:3',
      'image_main' => 'required|mimes:webp|max:130',
      'slides' => 'nullable|array|max:40',
      'slides.*' => 'mimes:webp,jpeg,png,jpg|max:250',
      'user_id' => 'required|exists:users,id',
      'news_id' => 'nullable|exists:news,id',
      'agency_id' => 'required|exists:agencies,id',
      'published_at' => 'required|date_format:Y-m-d\TH:i',
      'lead' => 'nullable|string|max:500',
    ];
  }

  public function messages(): array
  {
    return [
      // Общие сообщения
      'required' => 'Поле :attribute обязательно для заполнения.',
      'max' => 'Поле :attribute не должно превышать :max символов.',
      'min' => 'Поле :attribute должно содержать минимум :min символов.',

      // Специфичные сообщения
      'title.required' => 'Название фоторепортажа обязательно.',
      'title.max' => 'Название не должно превышать 255 символов.',
      'title.min' => 'Название должно содержать минимум 3 символа.',

      'image_main.required' => 'Главное изображение обязательно.',
      'image_main.mimes' => 'Главное изображение должно быть в формате: webp, jpeg, png, jpg.',
      'image_main.max' => 'Размер главного изображения не должен превышать 130КБ.',
      'image_main.dimensions' => 'Главное изображение должно быть минимум 600x400 пикселей.',

      'slides.max' => 'Можно загрузить не более 40 слайдов.',
      'slides.*.mimes' => 'Слайды должны быть в формате: webp, jpeg, png, jpg.',
      'slides.*.max' => 'Размер каждого слайда не должен превышать 250KB.',
      'slides.*.dimensions' => 'Слайды должны быть минимум 600x400 пикселей.',

      'user_id.exists' => 'Выбранный автор не существует.',
      'agency_id.exists' => 'Выбранное агентство не существует.',
      'news_id.exists' => 'Выбранная новость не существует.',

      'published_at.required' => 'Укажите дату публикации.',
      'published_at.date_format' => 'Некорректный формат даты, используйте формат ГГГГ-ММ-ДДTЧЧ:ММ.',

      'lead.max' => 'Лид не должен превышать 500 символов.',
    ];
  }

  public function attributes(): array
  {
    return [
      'title' => 'Название',
      'content' => 'Контент',
      'image_main' => 'Главное изображение',
      'slides' => 'Слайды',
      'user_id' => 'Автор',
      'agency_id' => 'Агентство',
      'published_at' => 'Дата публикации',
      'lead' => 'Лид',
    ];
  }
}

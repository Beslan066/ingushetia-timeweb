<?php

namespace App\Http\Requests\Admin\Event;

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
            'address' => 'required|string',
            'user_id' => 'required',
            'agency_id' => 'required',
            'date' => 'required|date_format:Y-m-d\TH:i',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения',
            'title.max' => 'Длина заголовка не должна превышать 255 символов',
            'address.required' => 'Заполните краткое описание',
            'published_at.required' => 'Укажите дату публикации',
            'published_at.date' => 'Некорректный формат даты',
            'user_id.required' => 'Ошибка при определении пользователя',
            'agency_id.required' => 'Ошибка при определении организации',
        ];
    }
}

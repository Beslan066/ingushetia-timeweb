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
            'title' => 'required|string|max:255',
            'content' => 'nullable',
            'image_main' => 'required',
            'slides' => 'nullable|array',
            'user_id' => 'required',
            'news_id' => 'nullable',
            'agency_id' => 'required',
            'mountain_reportage' => 'nullable',
            'published_at' => 'required|date_format:Y-m-d\TH:i',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Это поле необходимо для заполнения',
            'title.string' => 'Проверьте правильность ввода',
            'image_main.required' => 'Это поле необходимо выбрать',
            'image_main.file' => 'Необходимо выбрать изображение ',
            'mountain_reportage.nullable' => 'Это поле не обязательно для заполнения.',

        ];
    }
}

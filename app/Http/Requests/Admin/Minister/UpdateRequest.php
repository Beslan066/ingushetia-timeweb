<?php

namespace App\Http\Requests\Admin\Minister;

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
            'name' => 'required|string',
            'position' => 'required|string',
            'user_id' => 'required',
            'bio' => 'nullable',
            'priority' => 'nullable',
            'image_main' => 'nullable|image|mimes:jpg,jpeg,webp,png',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения.',
            'title.string' => 'Заголовок должен быть строкой.',
            'position.required' => 'Заполните краткое описание.',
            'position.string' => 'Краткое описание должно быть строкой.',
            'position.max' => 'Длина краткого описания не должна превышать 255 символов.',
            'image_main.required' => 'Необходимо выбрать изображение.',
            'image_main.image' => 'Файл должен быть изображением.',
            'image_main.mimes' => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',

        ];
    }
}

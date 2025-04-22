<?php

namespace App\Http\Requests\Admin\Administration;

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
            'name' => 'required|string',
            'position' => 'required|string',
            'bio' => 'nullable',
            'user_id' => 'required',
            'priority' => 'nullable',
            'image_main' => 'nullable|image|mimes:jpg,jpeg,webp,png',
            'administration_types_id' => 'required',
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
            'image_main.image' => 'Файл должен быть изображением.',
            'image_main.mimes' => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',
            'administration_types_id.required' => 'Поле обязательно для заполнения',

        ];
    }
}

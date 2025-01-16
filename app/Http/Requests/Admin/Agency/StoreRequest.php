<?php

namespace App\Http\Requests\Admin\Agency;

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
            'supervisor_id' => 'required',
            'supervisor_type' => 'nullable',
            'slug' => 'nullable',
            'full_title' => 'required|string',
            'logo' => 'required|image|mimes:jpg,jpeg,webp,png,svg',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Заголовок обязателен для заполнения',
            'name.max' => 'Длина заголовка не должна превышать 255 символов',
            'full_title.required' => 'Полное наименование обязателен для заполнения',
            'full_title.max' => 'Длина наименования не должна превышать 255 символов',
            'logo.required' => 'Необходимо выбрать изображение.',
            'logo.image' => 'Файл должен быть изображением.',
            'logo.mimes' => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',
        ];
    }
}

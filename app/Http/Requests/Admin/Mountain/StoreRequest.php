<?php

namespace App\Http\Requests\Admin\Mountain;

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
            'year' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'coordinates' => 'nullable|string|max:255',
            'see_height' => 'nullable|string|max:255',
            'structure' => 'nullable|string|max:255',
            'content' => 'required',
            'image_main' => 'nullable|image|mimes:webp|max:130',
            'image_author' => 'nullable|string|max:255',
            'image_description' => 'nullable|string|max:255',
            'user_id' => 'nullable',
            'reportage_id' => 'nullable',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения.',
            'title.string' => 'Заголовок должен быть строкой.',
            'lead.required' => 'Заполните краткое описание.',
            'lead.string' => 'Краткое описание должно быть строкой.',

            'year.string' => 'Краткое year должно быть строкой.',
            'year.max' => 'Длина краткого year не должна превышать 255 символов.',

           'location.string' => 'Краткое location должно быть строкой.',
            'location.max' => 'Длина краткого location не должна превышать 255 символов.',


            'coordinates.string' => 'Краткое coordinates должно быть строкой.',
            'coordinates.max' => 'Длина краткого coordinates не должна превышать 255 символов.',

            'see_height.string' => 'Краткое see_height должно быть строкой.',
            'see_height.max' => 'Длина краткого see_height не должна превышать 255 символов.',

            'structure.string' => 'Краткое structure должно быть строкой.',
            'structure.max' => 'Длина краткого structure не должна превышать 255 символов.',

            'content.required' => 'Заполните содержимое новости.',
            'image_main.required' => 'Необходимо выбрать изображение.',
            'image_main.image' => 'Файл должен быть изображением.',
            'image_main.mimes' => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',

            'image_author.string' => 'Краткое image_author должно быть строкой.',
            'image_author.max' => 'Длина краткого image_author не должна превышать 255 символов.',

            'image_description.string' => 'Краткое image_description должно быть строкой.',
            'image_description.max' => 'Длина краткого image_description не должна превышать 255 символов.',

            'user_id.required' => 'Ошибка при определении пользователя.',
        ];
    }
}

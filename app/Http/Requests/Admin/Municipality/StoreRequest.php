<?php

namespace App\Http\Requests\Admin\Municipality;

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
            'year' => 'required|integer',
            'population' => 'required|integer',
            'content' => 'nullable',
            'square' => 'required',
            'user_id' => 'required',
            'type' => 'required',
            'supervisor_id' => 'required',
            'image_main' => 'required|image|mimes:jpg,jpeg,webp,png',
            'arms' => 'required|image|mimes:jpg,jpeg,webp,png',
            'phone_number' => 'required',
            'fax_number' => 'required',
            'email' => 'required|email',
            'address' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения.',
            'title.string' => 'Заголовок должен быть строкой.',
            'image_main.required' => 'Необходимо выбрать изображение.',
            'image_main.image' => 'Файл должен быть изображением.',
            'image_main.mimes' => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',

            'arms.required' => 'Необходимо выбрать изображение.',
            'arms.image' => 'Файл должен быть изображением.',
            'arms.mimes' => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',

            'phone_number.required' => 'Телефон обязателен для заполнения.',
            'phone_number.regex' => 'Телефон должен быть в формате: 8-928-090-48-33.',
            'fax_number.required' => 'Факс обязателен для заполнения.',
            'fax_number.regex' => 'Факс должен быть в формате: 8 (8732) 37 48 94.',
            'email.required' => 'Электронная почта обязательна.',
            'email.email' => 'Введите корректный адрес электронной почты.',
            'address.required' => 'Адрес обязателен для заполнения.',
            'address.string' => 'Адрес должен быть строкой.',
            'address.max' => 'Адрес не может превышать 255 символов.',

        ];
    }
}

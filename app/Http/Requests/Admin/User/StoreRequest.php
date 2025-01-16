<?php

namespace App\Http\Requests\Admin\User;

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
            'email' => 'required| string|email|unique:users',
            'agency_id' => 'nullable',
            'role' => 'required| integer',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,webp,png',
            'password' => 'required',
            'password_confirmation' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Поле "Имя" обязательно для заполнения.',
            'name.string' => 'Поле "Имя" должно быть строкой.',
            'email.required' => 'Поле "Email" обязательно для заполнения.',
            'email.string' => 'Поле "Email" должно быть строкой.',
            'email.email' => 'Поле "Email" должно быть корректным адресом электронной почты.',
            'email.unique' => 'Пользователь с таким Email уже существует.',
            'agency_id.nullable' => 'Поле "Агентство" может быть пустым.',
            'role.required' => 'Поле "Роль" обязательно для заполнения.',
            'role.integer' => 'Поле "Роль" должно быть числом.',
            'avatar.nullable' => 'Поле "Аватар" может быть пустым.',
            'avatar.image' => 'Поле "Аватар" должно быть изображением.',
            'avatar.mimes' => 'Поле "Аватар" должно быть файлом одного из следующих типов: jpg, jpeg, webp, png.',
            'password.required' => 'Поле "Пароль" обязательно для заполнения.',
            'password_confirmation.nullable' => 'Поле "Подтверждение пароля" может быть пустым.',
        ];
    }

}

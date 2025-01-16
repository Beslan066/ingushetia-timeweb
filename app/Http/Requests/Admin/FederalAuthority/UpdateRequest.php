<?php

namespace App\Http\Requests\Admin\FederalAuthority;

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
            'link' => 'required|string',
            'user_id' => 'required',
            'agency_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения.',
            'title.string' => 'Заголовок должен быть строкой.',
            'link.required' => 'Заполните краткое описание.',
            'link.string' => 'Краткое описание должно быть строкой.',
            'user_id.required' => 'Ошибка при определении пользователя.',
            'agency_id.required' => 'Ошибка при определении организации.',
        ];
    }
}

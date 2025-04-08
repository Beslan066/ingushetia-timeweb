<?php

namespace App\Http\Requests\Admin\ManagmentReserve;

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
            'file' => 'required|file|mimes:pdf,docx,xlsx,doc',
            'type' => 'required|integer',
            'published_at' => 'required|date_format:Y-m-d\TH:i',
            'agency_id' => 'required',

        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения',
            'title.max' => 'Длина заголовка не должна превышать 255 символов',
            'agency_id.required' => 'Ошибка при определении организации.',
        ];
    }
}

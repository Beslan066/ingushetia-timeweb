<?php

namespace App\Http\Requests\Admin\AwardPolitic;

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
            'file' => 'required|file|mimes:docx,pdf,doc|max:200000',
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
            'file.required' => "You must use the 'Choose file' button to select which file you wish to upload",
            'file.max' => "Maximum file size to upload is 8MB (8192 KB). If you are uploading a photo, try to reduce its resolution to make it under 8MB"
        ];
    }
}

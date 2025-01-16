<?php

namespace App\Http\Requests\Admin\Anticorruption;

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
            'document' => 'required|file|mimes:pdf,docx,doc',
            'agency_id' => 'required',
            'user_id' => 'required'
        ];
    }
}

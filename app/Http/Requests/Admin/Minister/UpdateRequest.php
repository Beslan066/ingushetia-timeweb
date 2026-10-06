<?php

namespace App\Http\Requests\Admin\Minister;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name'         => 'required|string|max:255',
      'position'     => 'required|string|max:255',
      'user_id'      => 'required|exists:users,id',
      'bio'          => 'nullable|string',
      'priority'     => 'nullable|integer',
      'contact'      => 'nullable|string|max:255',

      'image_main'   => 'nullable|image|mimes:jpg,jpeg,webp,png|max:5120',
      'remove_image' => 'nullable|in:0,1',
    ];
  }

  public function messages(): array
  {
    return [
      'name.required'      => 'Заголовок обязателен для заполнения.',
      'name.string'        => 'Заголовок должен быть строкой.',
      'position.required'  => 'Заполните должность.',
      'position.string'    => 'Должность должна быть строкой.',
      'position.max'       => 'Длина должности не должна превышать 255 символов.',
      'image_main.image'   => 'Файл должен быть изображением.',
      'image_main.mimes'   => 'Изображение должно быть в формате: jpg, jpeg, webp, png.',
      'image_main.max'     => 'Размер изображения не должен превышать 5 МБ.',
    ];
  }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SupportController extends Controller
{
    public function store(Request $request)
    {
        // Валидация данных
        $validator = Validator::make($request->all(), [
            'user_family' => 'required|string|max:255',
            'user_name' => 'required|string|max:255',
            'user_phone' => 'required|string|max:20',
            'user_email' => 'required|email|max:255',
            'user_message' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Экранирование тегов для защиты от XSS
        $data = $request->only(['user_family', 'user_name', 'user_phone', 'user_email', 'user_message']);
        $data['user_message'] = e($data['user_message']); // Экранирование HTML-тегов

        // Сохранение данных в таблицу Application
        try {
            Application::create($data);
            return response()->json(['message' => 'Обращение успешно отправлено'], 200);
        } catch (\Exception $e) {
            Log::error('Ошибка сохранения обращения: ' . $e->getMessage());
            return response()->json(['message' => 'Ошибка отправки обращения'], 500);
        }
    }
}

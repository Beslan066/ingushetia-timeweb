<?php

namespace App\Http\Controllers;

use App\Http\Requests\SurveyRequest;
use App\Models\Survey;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function index()
    {
        return Inertia::render('Survey/Index', [
            'meta' => [
                'title' => 'Социальный опрос населения Ингушетии',
                'description' => 'Социологическое исследование: оценка населением результатов деятельности органов местного самоуправления Республики Ингушетия.',
            ],
        ]);
    }

    public function store(SurveyRequest $request)
    {
        $data = $request->validated();
        $data['ip_address'] = $request->ip();

        $survey = Survey::firstOrCreate($data);

        return redirect()->route('survey.success');
    }

    public function success()
    {
        return Inertia::render('Survey/Success', [
            'meta' => [
                'title' => 'Спасибо за участие в опросе',
                'description' => 'Ваш ответ успешно учтён.',
            ],
        ]);
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SocialEconomicDevelopment\UpdateRequest;
use App\Http\Requests\Admin\SocialEconomicDevelopment\StoreRequest;
use App\Models\SocialEconomicDevelopment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SocialEconomicDevelopmentController extends Controller
{
    public function index()
    {

        $socialEconomicDevelopment = SocialEconomicDevelopment::query()->orderBy('id', 'desc')->paginate(10);
        return view('admin.social-economic-development.index', [
            'socialEconomicDevelopment' => $socialEconomicDevelopment
        ]);

    }
    public function create()
    {

        return view('admin.social-economic-development.create');
    }

    public function store(StoreRequest $request)
    {

        $data = $request->validated();

        // Проверка на наличие загруженного документа
        if (isset($data['document'])) {
            // Сохранение файла в директорию 'documents' в публичной файловой системе
            $path = Storage::put('documents', $data['document']);
            // Сохранение пути к документу в массив данных
            $data['document_path'] = $path ?? null;

            // Обработка MIME-типа, убираем "application/"
            $mimeType = $data['document']->getClientMimeType();
            $data['document_type'] = str_replace('application/', '', $mimeType);

            // Получаем размер документа в байтах
            $sizeInBytes = $data['document']->getSize();

            // Преобразование размера в КБ или МБ
            if ($sizeInBytes >= 1048576) { // 1 МБ = 1048576 байт
                $data['document_size'] = round($sizeInBytes / 1048576, 2) . ' MB';
            } else {
                $data['document_size'] = round($sizeInBytes / 1024, 2) . ' KB';
            }

            // Удаляем оригинальный файл из массива данных, так как он уже сохранен
            unset($data['document']);
        }


        $socialEconomicDevelopment = SocialEconomicDevelopment::create($data);

        return redirect()->route('admin.socialEconomicDevelopments.index');


    }

    public function edit(SocialEconomicDevelopment $socialEconomicDevelopment)
    {

        return view('admin.social-economic-development.edit', compact('socialEconomicDevelopment'));

    }

    public function update(UpdateRequest $request, SocialEconomicDevelopment $socialEconomicDevelopment)
    {
        // Получение данных из запроса
        $data = $request->validated();

        // Проверка на наличие загруженного документа
        if (isset($data['document'])) {
            // Удаление старого документа, если он существует
            if ($socialEconomicDevelopment->document_path) {
                Storage::delete($socialEconomicDevelopment->document_path);
            }

            // Сохранение нового файла в директорию 'documents' в публичной файловой системе
            $path = Storage::put('documents', $data['document']);
            // Сохранение пути к документу в массив данных
            $data['document_path'] = $path ?? null;

            // Обработка MIME-типа, убираем "application/"
            $mimeType = $data['document']->getClientMimeType();
            $data['document_type'] = str_replace('application/', '', $mimeType);

            // Получаем размер документа в байтах
            $sizeInBytes = $data['document']->getSize();

            // Преобразование размера в КБ или МБ
            if ($sizeInBytes >= 1048576) { // 1 МБ = 1048576 байт
                $data['document_size'] = round($sizeInBytes / 1048576, 2) . ' MB';
            } else {
                $data['document_size'] = round($sizeInBytes / 1024, 2) . ' KB';
            }

            // Удаляем оригинальный файл из массива данных, так как он уже сохранен
            unset($data['document']);
        }

        // Обновляем запись в базе данных
        $socialEconomicDevelopment->update($data);

        // Редирект на индексную страницу
        return redirect()->route('admin.socialEconomicDevelopments.index');
    }


    public function delete()
    {

    }
}

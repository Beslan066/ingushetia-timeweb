<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Implementation\StoreRequest;
use App\Http\Requests\Admin\Implementation\UpdateRequest;
use App\Models\Implementation;
use App\Models\SocialEconomicDevelopment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImplementationController extends Controller
{
    public function index()
    {

        $implementations = Implementation::query()->orderBy('id', 'desc')->paginate(10);
        return view('admin.implementation.index', [
            'implementations' => $implementations
        ]);

    }
    public function create()
    {

        return view('admin.implementation.create');
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


        $implementation = Implementation::create($data);

        return redirect()->route('admin.implementations.index');


    }

    public function edit(Implementation $implementation)
    {
        return view('admin.implementation.edit', compact('implementation'));
    }

    public function update(UpdateRequest $request, Implementation $implementation)
    {
        // Получение данных из запроса
        $data = $request->validated();

        // Проверка на наличие загруженного документа
        if (isset($data['document'])) {
            // Удаление старого документа, если он существует
            if ($implementation->document_path) {
                Storage::delete($implementation->document_path);
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
        $implementation->update($data);

        // Редирект на индексную страницу
        return redirect()->route('admin.implementations.index');
    }

    public function delete()
    {

    }
}

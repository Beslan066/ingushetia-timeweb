@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{ route('admin.videos.update', $video->id) }}" method="post" enctype="multipart/form-data" id="upload-form">
                    @csrf
                    @method('patch')
                    <div class="card-body">
                        <!-- Заголовок -->
                        <div class="form-group w-50">
                            <label for="">Заголовок</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title" value="{{ old('title', $video->title) }}">
                        </div>
                        @error('title')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <!-- Короткое описание -->
                        <div class="form-group w-50">
                            <label for="exampleFormControlTextarea1">Короткое описание</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="height: 101px;" placeholder="Введите лид" name="lead">{{ old('lead', $video->lead) }}</textarea>
                        </div>
                        @error('lead')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <!-- Отображение текущего видео с иконкой "X" -->
                        <div class="form-group w-50 position-relative">
                            @if($video->video)
                                <label for="currentVideo">Текущее видео</label>
                                <div id="videoContainer" style="position: relative;">
                                    <video id="currentVideo" width="100%" controls>
                                        <source src="{{ Storage::url($video->video) }}" type="video/mp4">
                                        Ваш браузер не поддерживает видео.
                                    </video>

                                </div>
                                <input type="hidden" name="remove_video" id="removeVideoInput" value="0">
                            @endif
                        </div>

                        <!-- Выбор видео файла -->
                        <div class="form-group w-50">
                            <label for="videoInput">Выберите новое видео файл</label>
                            <input type="file" class="form-control-file" id="videoInput" name="video" accept="video/*">
                        </div>

                        <div class="progress mt-3 w-50" style="height: 25px;">
                            <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                        </div>

                        @error('video')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror



                        <!-- Изображение новости -->
                        <div class="row w-50">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Превью для видео</h4>
                                        <input type="file" class="dropify" data-height="300" name="image_main" multiple />
                                    </div>
                                </div>
                            </div>
                        </div>

                        @error('image_main')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <!-- Дата и время публикации -->
                        <div class="form-group w-50">
                            <input type="datetime-local" class="datetime_input" name="published_at" style="color: #495057; width: 250px; border: 1px solid #ced4da; padding: 5px !important;" value="{{ old('published_at', $video->published_at->format('Y-m-d\TH:i')) }}">
                        </div>
                        @error('published_at')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <!-- Автор -->
                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Автор</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="user_id">
                                <option value="{{ auth()->user()->id }}">{{ auth()->user()->name }}</option>
                            </select>
                        </div>
                        @error('user_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <!-- Агенство -->
                        <div class="form-group w-50 mt-2">
                            <select class="form-control" id="exampleFormControlSelect1" name="agency_id">
                                <option value="{{ auth()->user()->agency->id }}">{{ auth()->user()->agency->name }}</option>
                            </select>
                        </div>
                        @error('agency_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <!-- Кнопки формы -->
                        <div class="btn-group">
                            <a href="{{ route('admin.videos.index') }}" class="btn btn-light mr-2">Назад</a>
                            <button type="submit" class="btn btn-primary">Обновить</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>


@endsection


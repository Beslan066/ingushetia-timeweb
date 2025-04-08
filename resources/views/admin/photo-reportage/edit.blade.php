@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">
                <form action="{{ route('admin.photoReportage.update', $reportage->id) }}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('patch')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title" value="{{ old('title', $reportage->title) }}">
                            </div>

                            @error('title')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="image_main">Главное изображение</label>
                                <input type="file" id="image_main" name="image_main" class="dropify" data-height="300" data-default-file="{{ $reportage->image_main ? asset('storage/' . $reportage->image_main) : '' }}" />
                            </div>

                            @error('image_main')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="slides">Слайд-шоу фотографий</label>
                                <input type="file" id="slides" name="slides[]" class="dropify" data-height="300" multiple />
                            </div>


                            <input type="hidden" id="removedSlidesInput" name="remove_slides">

                            <!-- Контейнер для миниатюр -->
                            <div id="thumbnails" class="d-flex flex-wrap mt-3">
                                @if($reportage->slides)
                                    @foreach(json_decode($reportage->slides) as $slide)
                                        <div class="thumbnail-container">
                                            <img src="{{ asset('storage/' . $slide) }}" />
                                            <span class="remove-thumbnail" data-filename="{{ $slide }}">X</span>
                                        </div>
                                    @endforeach
                                @endif
                            </div>

                            @error('slides[]')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <input type="datetime-local" class="datetime_input" name="published_at"
                                       style="color: #495057; width: 250px; border: 1px solid #ced4da; padding: 5px !important;"
                                       value="{{ old('published_at', $reportage->published_at ? \Carbon\Carbon::parse($reportage->published_at)->format('Y-m-d\TH:i') : '') }}">
                            </div>
                            @error('published_at')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            @error('news_id')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="exampleFormControlSelect1">Автор</label>
                                <select class="form-control" id="exampleFormControlSelect1" name="user_id">
                                    <option value="{{ auth()->user()->id }}">{{ auth()->user()->name }}</option>
                                </select>
                            </div>
                            @error('user_id')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50 mt-2">
                                <select class="form-control" id="exampleFormControlSelect1" name="agency_id">
                                    <option value="{{ auth()->user()->agency->id }}">{{ auth()->user()->agency->name }}</option>
                                </select>
                            </div>

                            @error('agency_id')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror


                            @if($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif


                            <div class="btn-group">
                                <a href="{{ route('admin.photoReportage.index') }}" class="btn btn-light mr-2">Назад</a>
                                <button type="submit" class="btn btn-primary">Обновить</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="{{asset('assets/js/jquery.min.js')}}"></script>

    <script>
        $(document).ready(function() {
            var removedSlides = [];
            var existingSlides = {!! json_encode($reportage->slides ? json_decode($reportage->slides) : []) !!};

            // Обработка удаления миниатюры
            $(document).on('click', '.remove-thumbnail', function() {
                var slideToRemove = $(this).data('filename');

                // Удаляем блок миниатюры
                $(this).closest('.thumbnail-container').remove();

                // Добавляем удаленный слайд в массив удаленных
                removedSlides.push(slideToRemove);

                // Обновляем скрытое поле для удалённых слайдов
                $('#removedSlidesInput').val(JSON.stringify(removedSlides));
            });

            // Обработка изменения новых слайдов
            $('#slides').on('change', function(event) {
                var files = event.target.files;

                // Чтение и отображение новых файлов
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        var thumbnailContainer = $('<div>').addClass('thumbnail-container');
                        var img = $('<img>').attr('src', e.target.result);
                        var removeIcon = $('<span>').addClass('remove-thumbnail').text('X').data('filename', file.name);

                        thumbnailContainer.append(img).append(removeIcon);
                        $('#thumbnails').append(thumbnailContainer);
                    };

                    reader.readAsDataURL(file);
                }
            });

            // Обновление скрытых полей перед отправкой формы
            $('form').on('submit', function() {
                var dataTransfer = new DataTransfer();

                // Обновляем скрытое поле для удалённых слайдов
                $('#removedSlidesInput').val(JSON.stringify(removedSlides)); // Передаем как JSON
            });
        });
    </script>

@endsection

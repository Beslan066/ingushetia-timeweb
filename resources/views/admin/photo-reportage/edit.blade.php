@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">
        <form action="{{ route('admin.photoReportage.update', $reportage->id) }}" method="post" enctype="multipart/form-data" id="photoReportageForm">
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
                <label for="exampleFormControlTextarea1">Лид</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="height: 101px;"
                          placeholder="Введите лид" name="lead">{{ old('lead', $reportage->lead) }}</textarea>
              </div>
              @error('lead')
              <div class="text-danger">{{ $message }}</div>
              @enderror

              <div class="form-group w-50">
                <label for="image_main">Главное изображение</label>
                <input type="file" id="image_main" name="image_main" class="dropify" data-height="300" data-default-file="{{ $reportage->image_main ? asset('storage/' . $reportage->image_main) : '' }}" />
              </div>

              @error('image_main')
              <div class="text-danger">{{ $message }}</div>
              @enderror

              <!-- Скрытое поле для удалённых слайдов -->
              <input type="hidden" name="removed_slides" id="removed_slides" value="">

              <div class="form-group mt-3 w-50">
                <label>Текущие слайды:</label>
                <div id="slides-preview" class="d-flex flex-wrap gap-2">
                  @php
                    $slides = $reportage->slides_array;
                    $baseStoragePath = 'storage/photo_reportages/slides/';
                  @endphp

                  @foreach($slides as $index => $slide)
                    @php
                      $filename = basename($slide);
                      $fullPath = public_path($baseStoragePath . $filename);
                      $publicUrl = asset($baseStoragePath . $filename);
                    @endphp

                    @if(file_exists($fullPath))
                      <div class="slide-item existing-slide position-relative" data-filename="{{ $slide }}">
                        <img src="{{ $publicUrl }}"
                             class="img-thumbnail permanent-slide"
                             style="width: 150px; height: 100px; object-fit: cover;">
                        <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 remove-existing-slide">
                          <i class="fas fa-times"></i>
                        </button>
                        <span class="badge bg-primary position-absolute bottom-0 end-0">{{ $index + 1 }}</span>
                      </div>
                    @else
                      <div class="alert alert-warning p-2">
                        Файл {{ $filename }} не найден в хранилище
                      </div>
                    @endif
                  @endforeach
                </div>
              </div>

              <div class="form-group w-50">
                <label for="slides">Добавить новые слайды</label>
                <input type="file" class="form-control" name="slides[]" id="slides" multiple>
                <small class="text-muted">Максимум 50 слайдов (включая текущие)</small>
              </div>

              @error('slides')
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

              <div class="form-group w-50">
                <label for="news_select">Новость для репортажа</label>
                <select class="form-control select2" id="news_select" name="news_id">
                  @if(isset($reportage->news))
                    <option value="{{ $reportage->news->id }}">{{ $reportage->news->title }}</option>
                  @else
                    <option value="">Выберите новость</option>
                  @endif
                  @foreach($news as $item)
                    <option value="{{ $item->id }}" {{ old('news_id') == $item->id ? 'selected' : '' }}>{{ $item->title }}</option>
                  @endforeach
                </select>
              </div>
              @error('news_id')
              <div class="invalid-feedback d-block">{{ $message }}</div>
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
@endsection

@section('scripts')
  <script>
    $(document).ready(function () {




      // Специфичные для редактирования переменные
      let newSlidesFiles = [];
      let removedExistingSlides = [];



      // Блокируем возможные другие обработчики
      $('#slides-preview').off();

      // Удаление слайдов с подтверждением
      $(document).on('click', '.remove-existing-slide', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (confirm('Вы уверены, что хотите удалить этот слайд?')) {
          const slideItem = $(this).closest('.slide-item');
          const filename = slideItem.data('filename');

          // Добавляем в список удаленных
          let removed = JSON.parse($('#removed_slides').val() || '[]');
          removed.push(filename);
          $('#removed_slides').val(JSON.stringify(removed));

          // Плавное удаление
          slideItem.fadeOut(400, function() {
            $(this).remove();
            updateSlidesCounter();
          });
        }
      });

      // Обновление нумерации слайдов
      function updateSlidesCounter() {
        $('#slides-preview .existing-slide').each(function(index) {
          $(this).find('.badge').text(index + 1);
        });

        if ($('#slides-preview .existing-slide').length === 0) {
          $('#slides-preview').html('<div class="text-muted">Нет загруженных слайдов</div>');
        }
      }
    });

      // Удаление существующего слайда
      $(document).on('click', '.remove-existing-slide', function () {
        const slideItem = $(this).closest('.slide-item');
        const filename = slideItem.data('filename');

        removedExistingSlides.push(filename);
        slideItem.remove();
        $('#removed_slides').val(JSON.stringify(removedExistingSlides));

        // Если не осталось слайдов, показываем сообщение
        if ($('#slides-preview .slide-item').length === 0) {
          $('#slides-preview').html('<div class="text-muted">Нет загруженных слайдов</div>');
        }
      });

      // Обработка новых слайдов
      $('#slides').on('change', function() {
        const files = Array.from(this.files);
        const preview = $('#slides-preview');
        const existingSlidesCount = $('#slides-preview .existing-slide').length;
        const maxAllowed = 50 - existingSlidesCount;

        // Очищаем предыдущие новые слайды
        $('.new-slide').remove();
        newSlidesFiles = [];

        if (files.length > maxAllowed) {
          alert(`Можно добавить максимум ${maxAllowed} файлов`);
          $(this).val('');
          return;
        }

        // Убираем сообщение "Нет загруженных слайдов", если оно есть
        if ($('#slides-preview .text-muted').length) {
          $('#slides-preview').empty();
        }

        files.forEach((file, index) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const slideItem = $(`
                            <div class="slide-item new-slide position-relative">
                                <img src="${e.target.result}" class="img-thumbnail" style="width: 150px; height: 100px; object-fit: cover;">
                                <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 remove-new-slide" data-index="${index}">
                                    <i class="fas fa-times"></i>
                                </button>
                                <span class="badge bg-success position-absolute bottom-0 end-0">Новый ${index + 1}</span>
                            </div>
                        `);
            preview.append(slideItem);
          };
          reader.readAsDataURL(file);
          newSlidesFiles.push(file);
        });
      });

      // Удаление нового слайда
      $(document).on('click', '.remove-new-slide', function() {
        const index = $(this).data('index');
        $(this).closest('.slide-item').remove();
        newSlidesFiles.splice(index, 1);

        // Обновляем input files
        const dataTransfer = new DataTransfer();
        newSlidesFiles.forEach(file => dataTransfer.items.add(file));
        $('#slides')[0].files = dataTransfer.files;

        // Если не осталось слайдов, показываем сообщение
        if ($('#slides-preview .slide-item').length === 0) {
          $('#slides-preview').html('<div class="text-muted">Нет загруженных слайдов</div>');
        }
      });

      // Валидация формы
      $('#photoReportageForm').on('submit', function(e) {
        const totalSlides = $('#slides-preview .slide-item').length;

        if (totalSlides === 0) {
          e.preventDefault();
          alert('Должен быть хотя бы один слайд');
          return false;
        }

        return true;
      });
    });
  </script>
@endsection

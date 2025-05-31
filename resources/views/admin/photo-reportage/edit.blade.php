@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">
        @if($errors->any())
          <div class="alert alert-danger">
            <ul class="mb-0">
              @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div>
        @endif

        @if(session('success'))
          <div class="alert alert-success">
            {{ session('success') }}
          </div>
        @endif

        <form action="{{ route('admin.photoReportage.update', $reportage->id) }}" method="post" enctype="multipart/form-data" id="photoReportageForm">
          @csrf
          @method('patch')
          <input type="hidden" name="removed_slides" id="removedSlidesInput" value="[]">

          <div class="card-body">
            <div>
              <div class="form-group w-50">
                <label for="title">Заголовок</label>
                <input class="form-control form-control-lg mb-3 @error('title') is-invalid @enderror"
                       type="text"
                       placeholder="Введите заголовок"
                       name="title"
                       value="{{ old('title', $reportage->title) }}"
                       id="title">
                @error('title')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror
              </div>

              <div class="form-group w-50">
                <label for="exampleFormControlTextarea1">Лид</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="height: 101px;"
                          placeholder="Введите лид" name="lead">{{ old('lead', $reportage->lead) }}</textarea>
              </div>
              @error('lead')
              <div class="text-danger">{{ $message }}</div>
              @enderror

              <div class="form-group w-50">
                <label for="image_main">Главное изображение (WEBP, макс. 130KB)</label>
                <input type="file"
                       id="image_main"
                       name="image_main"
                       class="dropify @error('image_main') is-invalid @enderror"
                       data-height="300"
                       data-max-file-size="130K"
                       data-allowed-file-extensions="webp"
                       data-default-file="{{ $reportage->image_main_url }}"/>
                @error('image_main')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror
              </div>

              <div class="form-group w-50">
                <label for="slides">Добавить новые слайды (макс. 50 файлов всего)</label>
                <input type="file"
                       id="slides"
                       name="slides[]"
                       class="form-control @error('slides') is-invalid @enderror @error('slides.*') is-invalid @enderror"
                       multiple
                       data-max-files="50">
                <small class="text-muted">Выберите дополнительные изображения</small>

                <!-- Контейнер для предпросмотра существующих и новых слайдов -->
                <div id="slides-preview" class="d-flex flex-wrap mt-2 gap-2">
                  @foreach($reportage->slides_array as $index => $slide)
                    <div class="position-relative slide-preview-item" data-slide-path="{{ $slide }}">
                      <img src="{{ Storage::url($slide) }}" class="img-thumbnail">
                      <span class="badge bg-primary position-absolute top-0 start-0">{{ $index + 1 }}</span>
                      <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 remove-existing-slide">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  @endforeach
                </div>

                @error('slides')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror

                @error('slides.*')
                <div class="invalid-feedback d-block">
                  Ошибка в слайде #{{ $message->customAttributes['slides_index'] ?? 'N/A' }}: {{ $message }}
                </div>
                @enderror
              </div>

              <div class="form-group w-50">
                <label for="published_at">Дата публикации</label>
                <input type="datetime-local"
                       id="published_at"
                       class="form-control @error('published_at') is-invalid @enderror"
                       name="published_at"
                       value="{{ old('published_at', $reportage->published_at ? \Carbon\Carbon::parse($reportage->published_at)->format('Y-m-d\TH:i') : '') }}">

                @error('published_at')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror
              </div>

              <div class="form-group w-50">
                <label for="news_select">Новость для репортажа</label>
                <select class="form-control select2" id="news_select" name="news_id">
                  <option value="">Выберите новость</option>
                  @foreach($news as $item)
                    <option value="{{ $item->id }}" {{ $reportage->news_id == $item->id ? 'selected' : '' }}>{{ $item->title }}</option>
                  @endforeach
                </select>
              </div>
              @error('news_id')
              <div class="invalid-feedback d-block">{{ $message }}</div>
              @enderror

              <div class="form-group w-50">
                <label for="user_id">Автор</label>
                <select class="form-control @error('user_id') is-invalid @enderror"
                        name="user_id"
                        id="user_id">
                  <option value="{{ auth()->user()->id }}">{{ auth()->user()->name }}</option>
                </select>
                @error('user_id')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror
              </div>

              <div class="form-group w-50 mt-2">
                <label for="agency_id">Агентство</label>
                <select class="form-control @error('agency_id') is-invalid @enderror"
                        name="agency_id"
                        id="agency_id">
                  <option value="{{ auth()->user()->agency->id }}">{{ auth()->user()->agency->name }}</option>
                </select>
                @error('agency_id')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror
              </div>

              <div class="btn-group mt-3">
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

@push('scripts')
  <script src="{{asset('assets/js/jquery.min.js')}}"></script>
  <script src="https://cdn.jsdelivr.net/npm/dropify/dist/js/dropify.min.js"></script>

  <script>
    $(document).ready(function () {
      // Инициализация Dropify
      $('.dropify').dropify({
        messages: {
          'default': 'Перетащите файл или кликните для выбора',
          'replace': 'Перетащите или кликните для замены',
          'remove': 'Удалить',
          'error': 'Ошибка'
        },
        error: {
          'fileSize': 'Файл слишком большой (макс. {{ config('app.upload_max_size') ?? '130K' }}).',
          'fileExtension': 'Разрешены только файлы .webp'
        }
      });

      // Хранилище для новых файлов
      let newSlidesFiles = [];
      // Массив для удаляемых существующих слайдов
      let removedExistingSlides = [];

      // Обработчик изменения input файлов
      $('#slides').on('change', function(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
          handleFileSelection(files);
        }
        // Очищаем значение input
        $(this).val('');
      });

      // Обработчик drag and drop
      $('#slides-preview').on('dragover', function(e) {
        e.preventDefault();
        $(this).addClass('border-primary');
      }).on('dragleave', function(e) {
        e.preventDefault();
        $(this).removeClass('border-primary');
      }).on('drop', function(e) {
        e.preventDefault();
        $(this).removeClass('border-primary');
        const files = Array.from(e.originalEvent.dataTransfer.files);
        if (files.length) {
          handleFileSelection(files);
        }
      });

      // Функция обработки выбранных файлов
      function handleFileSelection(files) {
        const maxTotalSlides = 50;
        const existingSlidesCount = $('.slide-preview-item[data-slide-path]').length - removedExistingSlides.length;
        const availableSlots = maxTotalSlides - (existingSlidesCount + newSlidesFiles.length);

        if (files.length > availableSlots) {
          alert(`Можно добавить только ${availableSlots} слайдов (максимум ${maxTotalSlides} всего)`);
          return;
        }

        files.forEach(file => {
          const isDuplicate = newSlidesFiles.some(
            existingFile => existingFile.name === file.name &&
              existingFile.size === file.size &&
              existingFile.type === file.type
          );

          if (!isDuplicate) {
            newSlidesFiles.push(file);
          }
        });

        updatePreview();
      }

      // Функция обновления предпросмотра
      function updatePreview() {
        const preview = $('#slides-preview');

        // Очищаем только предпросмотр новых слайдов
        preview.find('.new-slide-preview').remove();

        // Добавляем новые слайды с правильной нумерацией
        newSlidesFiles.forEach((file, index) => {
          const reader = new FileReader();

          reader.onload = function(e) {
            const previewItem = $(
              `<div class="position-relative slide-preview-item new-slide-preview" data-file-index="${index}">
              <img src="${e.target.result}" class="img-thumbnail">
              <span class="badge bg-success position-absolute top-0 start-0">Новый ${index + 1}</span>
              <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 remove-new-slide">
                <i class="fas fa-times"></i>
              </button>
            </div>`
            );

            preview.append(previewItem);
          };

          reader.readAsDataURL(file);
        });

        // Обновляем индикатор удаленных слайдов
        $('.slide-preview-item[data-slide-path]').each(function() {
          const slidePath = $(this).data('slide-path');
          const $this = $(this);

          if (removedExistingSlides.includes(slidePath)) {
            $this.addClass('border-danger opacity-50');
            $this.find('.remove-existing-slide').html('<i class="fas fa-undo"></i>');
          } else {
            $this.removeClass('border-danger opacity-50');
            $this.find('.remove-existing-slide').html('<i class="fas fa-times"></i>');
          }
        });

        $('#removedSlidesInput').val(JSON.stringify(removedExistingSlides));
      }

      // Обработчик удаления нового слайда
      $(document).on('click', '.remove-new-slide', function() {
        const $item = $(this).closest('.new-slide-preview');
        const fileIndex = parseInt($item.data('file-index'));

        if (!isNaN(fileIndex) && fileIndex >= 0 && fileIndex < newSlidesFiles.length) {
          newSlidesFiles.splice(fileIndex, 1);
          updatePreview();
        }
      });

      // Обработчик удаления/восстановления существующего слайда
      $(document).on('click', '.remove-existing-slide', function() {
        const $item = $(this).closest('.slide-preview-item');
        const slidePath = $item.data('slide-path');

        const index = removedExistingSlides.indexOf(slidePath);
        if (index === -1) {
          removedExistingSlides.push(slidePath);
        } else {
          removedExistingSlides.splice(index, 1);
        }

        updatePreview();
      });

      // Обработчик отправки формы
      $('#photoReportageForm').on('submit', function(e) {
        e.preventDefault();

        const form = this;
        const formData = new FormData(form);

        // Добавляем новые файлы в FormData
        newSlidesFiles.forEach((file, index) => {
          formData.append('slides[]', file);
        });

        // Проверка количества слайдов
        const existingSlidesCount = $('.slide-preview-item[data-slide-path]').length;
        const remainingSlides = existingSlidesCount - removedExistingSlides.length + newSlidesFiles.length;

        if (remainingSlides === 0) {
          alert('Пожалуйста, оставьте хотя бы один слайд');
          return false;
        }

        // Показываем индикатор загрузки
        const submitBtn = $(form).find('button[type="submit"]');
        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Сохранение...');

        // Отправка формы через AJAX
        $.ajax({
          url: $(form).attr('action'),
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function(response) {
            if (response.redirect) {
              window.location.href = response.redirect;
            } else {
              window.location.reload();
            }
          },
          error: function(xhr) {
            submitBtn.prop('disabled', false).html('Обновить');

            if (xhr.status === 419) {
              alert('Сессия истекла. Пожалуйста, перезагрузите страницу и попробуйте снова.');
            } else if (xhr.responseJSON && xhr.responseJSON.errors) {
              // Обработка ошибок валидации
              let errorMessages = [];
              $.each(xhr.responseJSON.errors, function(key, messages) {
                errorMessages = errorMessages.concat(messages);
              });
              alert('Ошибки:\n' + errorMessages.join('\n'));
            } else {
              alert('Произошла ошибка: ' + (xhr.responseJSON?.message || xhr.statusText));
            }
          }
        });
      });
    });
  </script>
@endpush

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

        <form action="{{route('admin.photoReportage.store')}}" method="post" enctype="multipart/form-data" id="photoReportageForm">
          @csrf
          @method('post')
          <div class="card-body">
            <div>
              <div class="form-group w-50">
                <label for="title">Заголовок</label>
                <input class="form-control form-control-lg mb-3 @error('title') is-invalid @enderror"
                       type="text"
                       placeholder="Введите заголовок"
                       name="title"
                       value="{{ old('title') }}"
                       id="title">
                @error('title')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror
              </div>

              <div class="form-group w-100 d-flex align-items-center">
                <div class="w-50">
                                <textarea class="summernote @error('content') is-invalid @enderror"
                                          placeholder="Введите контент"
                                          name="content">{{ old('content') }}</textarea>
                  @error('content')
                  <div class="invalid-feedback d-block">{{ $message }}</div>
                  @enderror
                </div>
              </div>

              <div class="form-group w-50">
                <label for="image_main">Главное изображение (WEBP, макс. 130KB)</label>
                <input type="file"
                       id="image_main"
                       name="image_main"
                       class="dropify @error('image_main') is-invalid @enderror"
                       data-height="300"
                       data-max-file-size="130K"
                       data-allowed-file-extensions="webp"
                       data-default-file="{{ old('image_main') }}"/>
                @error('image_main')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror
              </div>

              <div class="form-group w-50">
                <label for="slides">Слайд-шоу фотографий (макс. 20 файлов, WEBP)</label>
                <input type="file"
                       id="slides"
                       name="slides[]"
                       class="form-control @error('slides') is-invalid @enderror @error('slides.*') is-invalid @enderror"
                       multiple
                       data-max-files="20">
                <small class="text-muted">Выберите до 20 изображений в формате WEBP</small>

                <!-- Контейнер для предпросмотра -->
                <div id="slides-preview" class="d-flex flex-wrap mt-3 gap-2"></div>

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
                       class="form-control @error('published_at') is-invalid @enderror"
                       name="published_at"
                       value="{{ old('published_at') }}"
                       id="published_at">
                @error('published_at')
                <div class="invalid-feedback d-block">{{ $message }}</div>
                @enderror
              </div>

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
                <button type="submit" class="btn btn-primary">Создать</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
@endsection

@push('scripts')
  <script src="https://cdn.jsdelivr.net/npm/dropify/dist/js/dropify.min.js"></script>
  <script>
    $(document).ready(function() {
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

      // Обработка формы
      $('#photoReportageForm').on('submit', function(e) {
        e.preventDefault();

        let form = $(this);
        let formData = new FormData(this);

        $.ajax({
          url: form.attr('action'),
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
            if(response.redirect) {
              window.location.href = response.redirect;
            }
          },
          error: function(xhr) {
            if(xhr.status === 422) {
              let errors = xhr.responseJSON.errors;
              let errorHtml = '<div class="alert alert-danger"><ul>';

              $.each(errors, function(key, value) {
                errorHtml += '<li>' + value[0] + '</li>';
                $('#'+key).addClass('is-invalid');
                $('#'+key+'-error').remove();
                $('#'+key).after('<div class="invalid-feedback">'+value[0]+'</div>');
              });

              errorHtml += '</ul></div>';

              $('.alert-danger').remove();
              form.prepend(errorHtml);
            }
          }
        });
      });

      // Предпросмотр слайдов
      $('#slides').on('change', function() {
        let preview = $('#slides-preview');
        preview.empty();

        if (this.files && this.files.length > 0) {
          if (this.files.length > 20) {
            alert('Максимальное количество слайдов - 20');
            $(this).val('');
            return;
          }

          Array.from(this.files).forEach((file, index) => {
            if (!file.type.match('image.*')) {
              alert('Файл ' + file.name + ' не является изображением');
              return;
            }

            let reader = new FileReader();
            reader.onload = function(e) {
              preview.append(`
                        <div class="position-relative" style="width: 150px; margin: 5px;">
                            <img src="${e.target.result}" class="img-thumbnail" style="width:100%; height:100px; object-fit:cover;">
                            <span class="badge bg-primary position-absolute top-0 start-0">${index+1}</span>
                            <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" onclick="$(this).parent().remove(); updateFileInput()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `);
            }
            reader.readAsDataURL(file);
          });
        }
      });
    });

    function updateFileInput() {
      let input = $('#slides')[0];
      let dataTransfer = new DataTransfer();

      $('#slides-preview img').each(function() {
        Array.from(input.files).forEach(file => {
          if (this.src.includes(file.name)) {
            dataTransfer.items.add(file);
          }
        });
      });

      input.files = dataTransfer.files;
    }
  </script>
@endpush

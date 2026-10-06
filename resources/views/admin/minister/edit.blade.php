@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">

        @if(session('success'))
          <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        @if($errors->any())
          <div class="alert alert-danger">
            <ul class="mb-0">
              @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div>
        @endif

        <form action="{{ route('admin.ministers.update', $minister->id) }}"
              method="post"
              enctype="multipart/form-data">
          @csrf
          @method('patch')

          <div class="card-body">
            <div>
              <div class="form-group w-50">
                <label for="name">Заголовок</label>
                <input class="form-control form-control-lg mb-3"
                       type="text"
                       id="name"
                       placeholder="ФИО"
                       name="name"
                       value="{{ old('name', $minister->name) }}">
              </div>
              @error('name')
              <div class="text-danger">{{ $message }}</div>
              @enderror

              <div class="form-group w-50">
                <label for="position">Должность</label>
                <input class="form-control form-control-lg mb-3"
                       type="text"
                       id="position"
                       placeholder="Должность"
                       name="position"
                       value="{{ old('position', $minister->position) }}">
              </div>
              @error('position')
              <div class="text-danger">{{ $message }}</div>
              @enderror

              <div class="form-group w-50">
                <label for="summernote">Биография</label>
                <textarea id="summernote"
                          class="summernote"
                          placeholder="Введите немного биографии"
                          name="bio">{{ old('bio', $minister->bio) }}</textarea>
              </div>
              @error('bio')
              <div class="text-danger">{{ $message }}</div>
              @enderror

              {{-- ===== Изображение ===== --}}
              <div class="row w-50">
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Изображение</h4>
                      <input type="file"
                             class="dropify"
                             id="image_main"
                             data-height="300"
                             name="image_main"
                             data-default-file="{{ $minister->image_main ? Storage::disk('public')->url($minister->image_main) : '' }}"/>

                      {{-- Флаг "удалить текущее фото" --}}
                      <input type="hidden" name="remove_image" id="remove_image" value="0">
                    </div>
                  </div>
                </div>
              </div>
              @error('image_main')
              <div class="text-danger">{{ $message }}</div>
              @enderror
            </div>

            <div class="form-group w-50">
              <label for="priority">Приоритет (чем больше цифра — тем ниже будет на странице)</label>
              <input class="form-control form-control-lg mb-3"
                     type="number"
                     id="priority"
                     placeholder="Выберите цифру"
                     name="priority"
                     value="{{ old('priority', $minister->priority) }}">
            </div>
            @error('priority')
            <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="form-group w-50">
              <label for="contact">Контакт</label>
              <input class="form-control form-control-lg mb-3"
                     type="text"
                     id="contact"
                     placeholder="Email или номер"
                     name="contact"
                     value="{{ old('contact', $minister->contact) }}">
            </div>
            @error('contact')
            <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="form-group w-50">
              <label for="user_id">Автор</label>
              <select class="form-control" id="user_id" name="user_id">
                <option value="{{ auth()->user()->id }}">{{ auth()->user()->name }}</option>
              </select>
            </div>
            @error('user_id')
            <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="btn-group">
              <a href="{{ route('admin.ministers.index') }}" class="btn btn-light mr-2">Назад</a>
              <button type="submit" class="btn btn-primary">Обновить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
@endsection

@push('scripts')
  <script>
    $(document).ready(function () {
      // НЕ инициализируем dropify повторно — он уже инициализирован в layout

      // Клик по кнопке "Удалить" в dropify (dropify сам создаёт .dropify-clear)
      $(document).on('click', '.dropify-clear', function () {
        $('#remove_image').val('1');
      });

      // Если пользователь выбрал новый файл — сбрасываем флаг
      $(document).on('change', '#image_main', function () {
        $('#remove_image').val('0');
      });
    });
  </script>
@endpush

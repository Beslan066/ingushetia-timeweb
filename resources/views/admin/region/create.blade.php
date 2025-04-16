@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">
        <form action="{{ route('admin.regions.store') }}" method="post" enctype="multipart/form-data">
          @csrf
          <div class="card-body">
            <h4>Основная информация о регионе</h4>

            <div class="form-group w-50">
              <label for="name">Название региона</label>
              <input class="form-control form-control-lg mb-3" type="text"
                     placeholder="Введите название региона" name="name" id="name" required>
              @error('name')
              <div class="text-danger">{{ $message }}</div>
              @enderror
            </div>

            <div class="form-group w-50">
              <label for="description">Описание региона</label>
              <textarea class="form-control summernote"
                        placeholder="Введите описание региона"
                        name="description" id="description"></textarea>
              @error('description')
              <div class="text-danger">{{ $message }}</div>
              @enderror
            </div>

            <div class="row w-50">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">

                    <h4 class="card-title">Изображение новости</h4>
                    <input type="file" class="dropify" data-height="300" name="image_main" multiple/>

                  </div>
                </div>
              </div>
            </div>

            @error('image_main')
            <div class="text-danger">{{ $message }}</div>
            @enderror

            <hr class="my-4">

            <h4>Секции региона</h4>
            <div id="sections-container">
              <!-- Секции будут добавляться здесь -->
            </div>

            <div class="mb-4">
              <button type="button" class="btn btn-secondary mt-3" id="add-section">
                <i class="fas fa-plus"></i> Добавить секцию
              </button>
            </div>

            <div class="btn-group mt-4">
              <a href="{{ route('admin.regions.index') }}" class="btn btn-light mr-2">Назад</a>
              <button type="submit" class="btn btn-primary">Создать регион</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
@endsection

@push('scripts')
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      let sectionCount = 0;
      const container = document.getElementById('sections-container');

      document.getElementById('add-section').addEventListener('click', function() {
        sectionCount++;
        const sectionId = `section-${sectionCount}`;

        const sectionHtml = `
                <div class="card mb-3 w-50" id="${sectionId}">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Секция #${sectionCount}</h5>
                        <button type="button" class="btn btn-sm btn-danger remove-section" data-section="${sectionId}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="section-title-${sectionCount}">Заголовок секции</label>
                            <input type="text" class="form-control"
                                   id="section-title-${sectionCount}"
                                   name="sections[${sectionCount}][title]" required>
                        </div>
                        <div class="form-group">
                            <label for="section-content-${sectionCount}">Содержимое секции</label>
                            <textarea class="form-control summernote-section"
                                      id="section-content-${sectionCount}"
                                      name="sections[${sectionCount}][content]" required></textarea>
                        </div>
                    </div>
                </div>
            `;

        container.insertAdjacentHTML('beforeend', sectionHtml);

        // Инициализация Summernote для новой секции
        $(`#section-content-${sectionCount}`).summernote({
          height: 200,
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']],
          ]
        });
      });

      // Удаление секции
      container.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-section') ||
          e.target.closest('.remove-section')) {
          const sectionId = e.target.closest('.remove-section').dataset.section;
          document.getElementById(sectionId).remove();
        }
      });

      // Добавляем первую секцию по умолчанию
      document.getElementById('add-section').click();
    });
  </script>
@endpush


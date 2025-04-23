<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="utf-8"/>
  <title>Административная-панель</title>
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta content="Административная-панель" name="description"/>
  <meta content="MyraStudio" name="author"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

  <!-- App favicon -->
  <link rel="shortcut icon" href="{{asset('assets/images/favicon.ico')}}">

  <!-- App css -->
  <link href="{{asset('plugins/datatables/dataTables.bootstrap4.css')}}" rel="stylesheet" type="text/css"/>
  <link href="{{asset('assets/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css"/>
  <link href="{{asset('assets/css/icons.min.css')}}" rel="stylesheet" type="text/css"/>
  <link href="{{asset('assets/css/theme.min.css')}}" rel="stylesheet" type="text/css"/>
  <link href="{{asset('plugins/dropify/dropify.min.css')}}" rel="stylesheet" type="text/css"/>
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />


  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="{{asset('plugins/summernote/summernote-bs4.min.css')}}">


  <style>
    .thumbnail-container {
      position: relative;
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .thumbnail-container img {
      height: 75px;
      border: 1px solid #ddd;
      padding: 2px;
    }

    .thumbnail-container .remove-thumbnail {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: red;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
    }

    .page-link {
      border-radius: 5px !important;
    }

    li.page-item {
      margin-right: 10px;
    }

    #slides-preview {
      min-height: 120px;
    }
    #slides-preview .img-thumbnail {
      cursor: pointer;
      transition: transform 0.2s;
    }
    #slides-preview .img-thumbnail:hover {
      transform: scale(1.05);
    }
    .remove-slide {
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .remove-slide:hover {
      opacity: 1;
    }

    .position-relative.slide-preview-item {
      max-width: 180px;
      height: 100px;
      margin-right: 30px;
    }

    .position-relative.slide-preview-item img {
      height: 100%;
    }

    .slide-wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  </style>
</head>

<body>

<!-- Begin page -->
<div id="layout-wrapper">

  <header id="page-topbar">
    <div class="navbar-header">

      <div class="d-flex align-items-left">
        <button type="button" class="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect"
                id="vertical-menu-btn">
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <div class="dropdown d-none d-sm-inline-block">
          <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="mdi mdi-plus"></i> Добавить
            <i class="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
          </button>
          <div class="dropdown-menu">

            <!-- item-->
            <a href="{{route('admin.news.create')}}" class="dropdown-item notify-item">
              Новость
            </a>

            <!-- item-->
            <a href="{{route('admin.categories.create')}}" class="dropdown-item notify-item">
              Категорию
            </a>

            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item notify-item">
              Мероприятие
            </a>

            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item notify-item">
              Фоторепортаж
            </a>
          </div>
        </div>
      </div>

      <div class="d-flex align-items-center">

        <div class="dropdown d-none d-sm-inline-block ml-2">
          <button type="button" class="btn header-item noti-icon waves-effect"
                  id="page-header-search-dropdown" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
            <i class="mdi mdi-magnify"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
               aria-labelledby="page-header-search-dropdown">

            <form class="p-3" action="{{ route('admin.search') }}" method="GET">
              <div class="form-group m-0">
                <div class="input-group">
                  <input type="text" class="form-control"
                         name="query"
                         placeholder="Search ..."
                         value="{{ request('query') }}">
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="mdi mdi-magnify"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>


        <div class="dropdown d-inline-block ml-2">
          <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img class="rounded-circle header-profile-user" src="{{asset('assets/images/users/avatar-3.jpg')}}"
                 alt="Header Avatar">
            <span class="d-none d-sm-inline-block ml-1">{{auth()->user()->name}}</span>
            <i class="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item d-flex align-items-center justify-content-between"
               href="javascript:void(0)">
              <span>Inbox</span>
              <span>
                                    <span class="badge badge-pill badge-info">3</span>
                                </span>
            </a>
            <a class="dropdown-item d-flex align-items-center justify-content-between"
               href="javascript:void(0)">
              <span>Profile</span>
              <span>
                                    <span class="badge badge-pill badge-warning">1</span>
                                </span>
            </a>
            <a class="dropdown-item d-flex align-items-center justify-content-between"
               href="javascript:void(0)">
              Settings
            </a>
            <a class="dropdown-item d-flex align-items-center justify-content-between"
               href="javascript:void(0)">
              <span>Lock Account</span>
            </a>

            <form action="{{route('logout')}}" method="post">
              @csrf
              @method('post')

              <button type="submit">Выйти</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </header>

  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">

    <div data-simplebar class="h-100">

      <div class="navbar-brand-box">


      </div>

            <!--- Sidemenu -->
            <div id="sidebar-menu">
                <!-- Left Menu Start -->
                <ul class="metismenu list-unstyled" id="side-menu">
                    <li>
                        <a href="{{route('admin')}}" class="waves-effect"><i class='bx bx-home-smile'></i><span>Дашборд</span></a>
                    </li>

                    <li><a href="{{route('admin.news.index')}}" class=" waves-effect"><i class="bx bx-news"></i><span>Новости</span></a></li>
                    <!--                    <li><a href="{{route('admin.newsIng.index')}}" class=" waves-effect"><i class="bx bx-globe"></i><span>Переводы</span></a></li>
 -->
                    <li><a href="{{route('admin.documents.index')}}" class=" waves-effect"><i
                          class="bx bx-file"></i><span>Документы</span></a></li>

                    <li><a href="{{route('admin.photoReportage.index')}}" class=" waves-effect"><i
                          class="bx bx-news"></i><span>Фоторепортажи</span></a></li>
                    <li><a href="{{route('admin.videos.index')}}" class=" waves-effect"><i
                          class="bx bx-video"></i><span>Видео</span></a></li>




                    @if(auth()->user()->agency_id !== 5)
                    <li><a href="{{route('admin.agenciesActivity.index')}}" class=" waves-effect"><i
                          class="bx bx-buildings"></i><span>Деятельность министерств</span></a></li>
                  @endif

                  @if(auth()->user()->role == 10 )
                    <li><a href="{{route('admin.categories.index')}}" class=" waves-effect"><i
                          class="bx bx-tag"></i><span>Категории</span></a></li>
                    <li><a href="{{route('admin.ministers.index')}}" class=" waves-effect"><i
                          class="bx bxs-user-badge"></i><span>Состав правительства</span></a></li>
                    <li><a href="{{route('admin.supervisors.index')}}" class=" waves-effect"><i
                          class="bx bxs-user-badge"></i><span>Руководители</span></a></li>
                    <li><a href="{{route('admin.municipalities.index')}}" class=" waves-effect"><i
                          class="bx bxs-city"></i><span>Муниципальные образования</span></a></li>
                    <li><a href="{{route('admin.agencies.index')}}" class=" waves-effect"><i
                          class="bx bx-buildings"></i><span>Министерства</span></a></li>

                    <li><a href="{{route('admin.administrationTypes.index')}}" class=" waves-effect"><i
                          class="bx bx-buildings"></i><span>Категории Администрации Главы</span></a></li>

                    <li><a href="{{route('admin.administrations.index')}}" class=" waves-effect"><i
                          class="bx bx-buildings"></i><span>Администрация Главы</span></a></li>

                    <li><a href="{{route('admin.mountains.index')}}" class=" waves-effect"><i
                          class="bx bx-mountain"></i><span>Родина башен</span></a></li>
                    <li>
                      <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                          class="bx bx-file"></i><span>Регион</span></a>
                      <ul class="sub-menu" aria-expanded="false">
                        <li>
                          <a href="{{route('admin.regions.index')}}" class="waves-effect">Основная информация</a></li>
                        <li><a href="{{route('admin.natProjects.index')}}" class=" waves-effect"><i class="bx bxs-city"></i><span>Национальные проекты</span></a></li>
                        <li><a href="{{route('admin.implementations.index')}}" class=" waves-effect"><i
                              class='bx bxs-pen'></i><span>Реализация указов Президента</span></a></li>
                        <li><a href="{{route('admin.economicSupports.index')}}" class=" waves-effect"><i
                              class='bx bx-money'></i><span>Поддержка экономики</span></a></li>
                        <li><a href="{{route('admin.socialEconomicDevelopments.index')}}" class=" waves-effect"><i
                              class='bx bx-trending-up'></i><span>Социально-экономическое развитие</span></a></li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                          class="bx bx-file"></i><span>Страницы меню</span></a>
                      <ul class="sub-menu" aria-expanded="false">
                        <li>
                          <a href="{{route('admin.page.index')}}" class="waves-effect">
                            <span>Типовые страницы</span>
                          </a>
                        </li>
                        <li>
                          <a href="{{route('admin.konkurses.index')}}" class=" waves-effect">
                            <span>Конкурсы в органах исполнительной власти Республики Ингушетия</span>
                          </a>
                        </li>
                        <li>
                          <a href="{{route('admin.managmentReserves.index')}}" class=" waves-effect">
                            <span>Резерв управленческих кадров</span>
                          </a>
                        </li>
                        <li>
                          <a href="{{route('admin.federalAuthorities.index')}}" class=" waves-effect">
                            <span>Территориальные органы федеральных органов власти</span>
                          </a>
                        </li>
                        <li>
                          <a href="{{route('admin.antinars.index')}}" class=" waves-effect">
                            <span>Антинаркотическая комиссия РИ</span>
                          </a>
                        </li>
                        <li>
                          <a href="{{route('admin.awardPolitics.index')}}" class=" waves-effect">
                            <span>Наградная политика</span>
                          </a>
                        </li>
                        <li><a href="{{route('admin.civilReserves.index')}}" class=" waves-effect">
                            <span>Государственная служба</span>
                          </a>
                        <li><a href="{{route('admin.anticorruptions.index')}}" class=" waves-effect">
                            <span>Противодействие коррупции</span></a></li>
                        <li>
                          <a href="{{route('admin.militarySupport.index')}}" class=" waves-effect">
                            <span>Поддержка СВО</span></a></li>
                      </ul>
                    </li>

                    <li><a href="{{route('admin.contacts.index')}}" class="waves-effect"><i
                          class="bx bxs-file-find"></i><span>Контакты</span></a></li>
                    <li><a href="{{route('admin.users.index')}}" class=" waves-effect"><i class="bx bx-user"></i><span>Пользователи</span></a></li>


                  @endif

                    <li><a href="{{route('admin.resources.index')}}" class=" waves-effect"><i
                          class="bx bx-link"></i><span>Полезные ресурсы</span></a></li>


                    <li>
                        <a href="javascript: void(0);" class="waves-effect"><i class="bx bx-cog"></i><span
                            class="badge badge-pill badge-danger float-right">6</span><span>Настройки</span></a>
                        <ul class="sub-menu" aria-expanded="false">
                            <li><a href="forms-elements.html">Elements</a></li>
                            <li><a href="forms-plugins.html">Plugins</a></li>
                            <li><a href="forms-validation.html">Validation</a></li>
                            <li><a href="forms-mask.html">Masks</a></li>
                            <li><a href="forms-quilljs.html">Quilljs</a></li>
                            <li><a href="forms-uploads.html">File Uploads</a></li>
                        </ul>
                    </li>


                </ul>
            </div>
                          <!-- Sidebar -->
    </div>
  </div>
  <!-- Left Sidebar End -->

  <!-- ============================================================== -->
  <!-- Start right Content here -->
  <!-- ============================================================== -->
  <div class="main-content">

    <div class="page-content">
      @yield('content')
    </div>
    <!-- End Page-content -->

    <footer class="footer">
      <div class="container-fluid">
        <div class="row">

        </div>
      </div>
    </footer>

  </div>
  <!-- end main content-->

</div>
<!-- END layout-wrapper -->

<!-- Overlay-->
<div class="menu-overlay"></div>


@stack('scripts')
<!-- jQuery  -->
<script src="{{asset('assets/js/jquery.min.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
<script src="{{asset('assets/js/bootstrap.bundle.min.js')}}"></script>
<script src="{{asset('assets/js/metismenu.min.js')}}"></script>
<script src="{{asset('assets/js/waves.js')}}"></script>
<script src="{{asset('assets/js/simplebar.min.js')}}"></script>
<script src="{{asset('plugins/summernote/summernote-bs4.min.js')}}"></script>


<!-- Morris Js-->
<script src="{{asset('plugins/morris-js/morris.min.js')}}"></script>
<!-- Raphael Js-->
<script src="{{asset('plugins/raphael/raphael.min.js')}}"></script>

<!-- Morris Custom Js-->
<script src="{{asset('assets/pages/dashboard-demo.js')}}"></script>

<!-- App js -->
<script src="{{asset('assets/js/theme.js')}}"></script>
<script src="{{asset('plugins/dropify/dropify.min.js')}}"></script>
<script src="{{asset('assets/pages/fileuploads-demo.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/i18n/ru.js"></script>


<!-- Init js-->
<script>
  $(document).ready(function () {
    // Define the custom button
    var QuoteButton = function (context) {
      var ui = $.summernote.ui;

      // Create button
      var button = ui.button({
        contents: '<i class="note-icon-quote"/><span> Цитата</span>',
        tooltip: 'Insert Quote',
        click: function () {
          // Invoke insertText method with 'quote' on editor module.
          context.invoke('editor.insertText', '<quote>Вставьте сюда цитату</quote>');
        }
      });

      return button.render();   // Return button as jQuery object
    }


    $('.select2-ajax').select2({
      ajax: {
        url: $(this).data('url'),
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term, // search term
            page: params.page
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;

          return {
            results: data.results,
            pagination: {
              more: (params.page * 20) < data.total_count
            }
          };
        },
        cache: true
      },
      minimumInputLength: 1,
      placeholder: 'Начните вводить название новости',
      allowClear: true,
      language: 'ru'
    });

    // Инициализация обычного Select2 для других селектов
    $('select:not(.select2-ajax)').select2({
      language: 'ru'
    });


    // Initialize Summernote
    $('.summernote').summernote({
      height: 300,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']],
        ['mybutton', ['quote']]  // Custom button group

      ],
      buttons: {
        quote: QuoteButton
      }
    });

    if (typeof CodeMirror !== 'undefined') {
      CodeMirror.fromTextArea(document.getElementById("codeMirrorDemo"), {
        mode: "htmlmixed",
        theme: "monokai"
      });
    }
  });

  // Загрузка видео


  if (document.getElementById('videoInput')) {
    document.getElementById('videoInput').addEventListener('change', function () {
      const form = document.getElementById('upload-form');
      const formData = new FormData(form);
      const progressBar = document.querySelector('.progress-bar');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', form.action, true);

      xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          progressBar.style.width = percentComplete + '%';
          progressBar.setAttribute('aria-valuenow', percentComplete);
          progressBar.textContent = percentComplete + '%';
        }
      };

      xhr.onload = function () {
        if (xhr.status === 200) {
          alert('Видео успешно загружено!');
          progressBar.style.width = '0%';
          progressBar.setAttribute('aria-valuenow', 0);
          progressBar.textContent = '0%';
        } else {
          alert('Произошла ошибка при загрузке видео.');
        }
      };

      xhr.send(formData);
    });
  }

  if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
      var phoneInput = document.getElementById('phone_number');
      var faxInput = document.getElementById('fax_number');

      var phonePattern = /^(8 \(\d{3}\) \d{2} \d{2} \d{2}|^\+7\(\d{3}\)|8-\d{3}-\d{3}-\d{2}-\d{2})$/;
      var faxPattern = /^8 \(\d{4}\) \d{2} \d{2} \d{2}$/;

      if (!phonePattern.test(phoneInput.value)) {
        alert('Введите номер в формате: 8 (928) 49 38 39, +7(928) или 8-928-090-48-33');
        event.preventDefault();
      }

      if (!faxPattern.test(faxInput.value)) {
        alert('Введите номер факса в формате: 8 (8732) 37 48 94');
        event.preventDefault();
      }
    });
  }


</script>

<script>
  $(document).ready(function() {
    // Хранилище для файлов
    let slidesFiles = [];

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
      }
    });

    // Обработчик изменения input файлов
    $('#slides').on('change', function() {
      handleFileSelection(this.files);
    });

    // Обработчик drag and drop (дополнительная функциональность)
    $('#slides-preview').on('dragover', function(e) {
      e.preventDefault();
      $(this).addClass('border-primary');
    }).on('dragleave', function(e) {
      e.preventDefault();
      $(this).removeClass('border-primary');
    }).on('drop', function(e) {
      e.preventDefault();
      $(this).removeClass('border-primary');
      if (e.originalEvent.dataTransfer.files.length) {
        handleFileSelection(e.originalEvent.dataTransfer.files);
      }
    });

    // Функция обработки выбранных файлов
    function handleFileSelection(files) {
      const maxFiles = 19;
      const newFiles = Array.from(files);

      // Проверка на максимальное количество файлов
      if (slidesFiles.length + newFiles.length > maxFiles) {
        alert(`Максимальное количество слайдов - ${maxFiles}`);
        return;
      }


      // Добавляем новые файлы в хранилище
      slidesFiles = [...slidesFiles, ...newFiles];

      // Обновляем предпросмотр
      updatePreview();

      // Обновляем input files
      updateFileInput();
    }

    // Функция обновления предпросмотра
    function updatePreview() {
      const preview = $('#slides-preview');
      preview.empty();

      if (slidesFiles.length === 0) {
        preview.html('<div class="text-muted w-100 text-center">Нет загруженных изображений</div>');
        return;
      }

      slidesFiles.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = function(e) {
          const previewItem = $(`
                    <div class="position-relative slide-preview-item" data-index="${index}">
                        <img src="${e.target.result}" class="img-thumbnail">
                        <span class="badge bg-primary position-absolute top-0 start-0">${index + 1}</span>
                        <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 remove-slide">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `);

          preview.append(previewItem);
        };

        reader.readAsDataURL(file);
      });
    }

    // Функция обновления input files
    function updateFileInput() {
      const dataTransfer = new DataTransfer();
      slidesFiles.forEach(file => dataTransfer.items.add(file));
      $('#slides')[0].files = dataTransfer.files;
    }

    // Обработчик удаления слайда
    $(document).on('click', '.remove-slide', function() {
      const index = $(this).closest('.slide-preview-item').data('index');
      slidesFiles.splice(index, 1);
      updatePreview();
      updateFileInput();
    });

    // Валидация при отправке формы
    $('#photoReportageForm').on('submit', function(e) {
      if (slidesFiles.length === 0) {
        e.preventDefault();
        alert('Пожалуйста, добавьте хотя бы один слайд');
        return false;
      }
      return true;
    });

    // Инициализация предпросмотра при загрузке страницы
    updatePreview();
  });
</script>

</body>

</html>

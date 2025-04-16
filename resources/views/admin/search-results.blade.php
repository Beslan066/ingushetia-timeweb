@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="mb-2 d-flex justify-content-between">
            <h2>Результаты поиска: "{{ $query }}"</h2>
          </div>

          <div class="table-responsive">
            <table class="table dt-responsive nowrap">
              <thead>
              <tr>
                <th>Тип</th>
                <th>Заголовок</th>
                <th>Дата публикации</th>
                <th>Действия</th>
              </tr>
              </thead>
              <tbody>
              @forelse($results as $result)
                <tr>
                  <td>{{ $result->type }}</td>
                  <td>{{ Str::limit($result->title, 80) }}</td>
                  <td>{{ $result->published_at }}</td>
                  <td>
                    @if($result->type === 'Новость')
                     <div class="btn-group">
                       <a href="{{ route('admin.news.edit', $result->url) }}"
                          class="btn btn-outline-primary btn-sm">
                         Редактировать
                       </a>
                       <form action="{{route('admin.news.delete', $result->url)}}" method="post">
                         @csrf
                         @method('delete')
                         <button type="submit" class="btn btn-outline-danger waves-effect waves-light">Удалить
                         </button>
                       </form>
                     </div>
                    @elseif($result->type === 'Документ')
                     <div class="btn-group">
                       <a href="{{ route('admin.documents.edit', $result->id) }}"
                          class="btn btn-outline-primary btn-sm">
                         Редактировать
                       </a>
                       <form action="{{route('admin.documents.delete', $result->id)}}" method="post">
                         @csrf
                         @method('destroy')
                         <button type="button" class="btn btn-outline-danger waves-effect waves-light">Удалить
                         </button>
                       </form>
                     </div>
                    @elseif($result->type === 'Фоторепортаж')
                      <div class="btn-group">
                        <a href="{{ route('admin.photoReportage.edit', $result->id) }}"
                           class="btn btn-outline-primary btn-sm">
                          Редактировать
                        </a>
                        <form action="{{route('admin.photoReportage.delete', $result->id)}}" method="post">
                          @csrf
                          @method('delete')
                          <button type="submit" class="btn btn-outline-danger waves-effect waves-light">Удалить
                          </button>
                        </form>
                      </div>
                    @elseif($result->type === 'Видео')
                      <div class="btn-group">
                        <a href="{{ route('admin.videos.edit', $result->id) }}"
                           class="btn btn-outline-primary btn-sm">
                          Редактировать
                        </a>
                        <form action="{{route('admin.videos.delete', $result->id)}}" method="post">
                          @csrf
                          @method('delete')
                          <button type="submit" class="btn btn-outline-danger waves-effect waves-light">Удалить
                          </button>
                        </form>
                      </div>
                    @endif
                  </td>
                </tr>
              @empty
                <tr>
                  <td colspan="4" class="text-center">Ничего не найдено</td>
                </tr>
              @endforelse
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">

        <div class="card-body">
          <div class="mb-2 d-flex justify-content-between">
            <div>
              <h2>Новости</h2>
            </div>

            <div>
              <a href="{{route('admin.news.create')}}">
                <button type="button" class="btn btn-primary waves-effect waves-light">Добавить</button>
              </a>
            </div>

          </div>


          <div id="selection-datatable_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">

            <div class="row">
              <div class="col-sm-12">
                <table id="selection-datatable"
                       class="table dt-responsive nowrap dataTable no-footer dtr-inline collapsed" role="grid"
                       aria-describedby="selection-datatable_info" style="width: 1577px;">
                  <thead>
                  <tr role="row">
                    <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1"
                        style="width: 272px;" aria-label="Name: activate to sort column ascending">id
                    </th>
                    <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1"
                        style="width: 272px;" aria-label="Name: activate to sort column ascending">Заголовок
                    </th>
                    <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1"
                        style="width: 394px;" aria-label="Position: activate to sort column ascending">Автор
                    </th>
                    <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1"
                        style="width: 200px;" aria-label="Office: activate to sort column ascending">Категория
                    </th>
                    <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1"
                        style="width: 200px;" aria-label="Office: activate to sort column ascending">Видеорепортаж
                    </th>
{{--                    <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1"--}}
{{--                        style="width: 107px; " aria-label="Age: activate to sort column ascending">Перевод--}}
{{--                    </th>--}}
                    <th class="sorting_asc" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1"
                        style="width: 193px;" aria-label="Start date: activate to sort column descending"
                        aria-sort="ascending">Опубликованно
                    </th>
                    <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1"
                        style="width: 159px; " aria-label="Salary: activate to sort column ascending">Действие
                    </th>
                  </tr>
                  </thead>

                  <tbody>

                  @if(auth()->user()->role == 10)
                    @if(isset($news))
                      @foreach($news as $item)
                        <tr role="row" class="odd">
                          <td class="" tabindex="0">{{$item->id}}</td>
                          <td class="" tabindex="0">{{mb_substr($item->title, 0, 80)}}</td>
                          <td>{{$item->user->name}}</td>

                          <td>
                            @if(isset($item->category))
                              {{$item->category->title}}
                            @else
                              Нет категории
                            @endif
                          </td>

                          @if($item->video)
                            <td class="">{{$item->category->title}}</td>
                          @endif
                          <td class="">
                            @if($item->video)
                              {{$item->video->title}}
                            @else
                              Нет видео
                            @endif
                          </td>
                          <td class="sorting_1">{{$item->published_at}}</td>
                          <td style="">
                            <div class="btn-group">
{{--                              <button type="button" class="btn btn-outline-success waves-effect waves-light">Перевод--}}
{{--                              </button>--}}
                              <a href="{{route('admin.news.edit', $item->id)}}"
                                 class="btn btn-outline-primary waves-effect waves-light">Редактировать</a>
                              <form action="{{route('admin.news.delete', $item->id)}}" method="post">
                                @csrf
                                @method('delete')
                                <button type="submit" class="btn btn-outline-danger waves-effect waves-light">Удалить
                                </button>
                              </form>

                            </div>
                          </td>
                        </tr>
                      @endforeach
                    @endif
                  @else
                    @if(isset($agencyNews))
                      @foreach($agencyNews as $item)
                        <tr role="row" class="odd">
                          <td class="" tabindex="0">{{$item->id}}</td>
                          <td class="" tabindex="0">{{mb_substr($item->title, 0, 80)}}</td>
                          <td>{{$item->user->name}}</td>
                          <td class="">{{$item->category->title}}</td>
                          <td class="">
                            @if($item->video)
                              Есть
                            @else
                              Нет
                            @endif
                          </td>
                          <td style="display: none;">Нет</td>
                          <td class="sorting_1">{{$item->published_at}}</td>
                          <td style="">
                            <div class="btn-group">
{{--                              <button type="button" class="btn btn-outline-success waves-effect waves-light">Перевод--}}
{{--                              </button>--}}
                              <a href="{{route('admin.news.edit', $item->id)}}"
                                 class="btn btn-outline-primary waves-effect waves-light">Редактировать</a>
                              <form action="{{route('admin.news.delete', $item->id)}}" method="post">
                                @csrf
                                @method('delete')
                                <button type="submit" class="btn btn-outline-danger waves-effect waves-light">Удалить
                                </button>
                              </form>

                            </div>
                          </td>
                        </tr>
                      @endforeach
                    @endif
                  @endif


                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              {{$news->links()}}
            </div>
          </div>

        </div> <!-- end card body-->
      </div> <!-- end card -->
    </div><!-- end col-->
  </div>
@endsection

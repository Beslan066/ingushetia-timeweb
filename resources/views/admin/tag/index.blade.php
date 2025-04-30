@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">

        <div class="card-body">
          <div class="mb-2 d-flex justify-content-between">
            <div>
              <h2>Теги</h2>
            </div>

            <div>
              <a href="{{route('admin.tags.create')}}">
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
                        style="width: 107px; " aria-label="Age: activate to sort column ascending">Перевод
                    </th>
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

                  @if(isset($tags))
                    @foreach($tags as $tag)
                      <tr role="row" class="odd">
                        <td class="" tabindex="0">{{$tag->id}}</td>
                        <td class="" tabindex="0">{{$tag->title}}</td>
                        <td>Нет</td>
                        <td class="sorting_1">{{$tag->created_at}}</td>
                        <td style="">
                          <div class="btn-group">
                            <a href="{{route('admin.tags.edit', $tag->id)}}"
                               class="btn btn-outline-primary waves-effect waves-light mr-2">Редактировать</a>
                            <button type="button" class="btn btn-outline-danger waves-effect waves-light">Удалить
                            </button>

                          </div>
                        </td>
                      </tr>
                    @endforeach
                  @endif
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              {{$tags->links()}}
            </div>
          </div>

        </div> <!-- end card body-->
      </div> <!-- end card -->
    </div><!-- end col-->
  </div>
@endsection

@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">

        <div class="card-body">
          <div class="mb-2 d-flex justify-content-between">
            <div>
              <h2>Основная информация правительства</h2>
            </div>

            @if($governmentCount < 1)
              <div>
                <a href="{{route('admin.governments.create')}}">
                  <button type="button" class="btn btn-primary waves-effect waves-light">Добавить</button>
                </a>
              </div>
            @endif
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
                        style="width: 272px;" aria-label="Name: activate to sort column ascending">Название
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

                  @if($governmentCount !== 0)
                      <tr role="row" class="odd">
                        @if(isset($government->id))
                          <td class="" tabindex="0">{{$government->id}}</td>
                        @endif

                        @if(isset($government->name))
                           <td class="" tabindex="0">{{mb_substr($government->name, 0, 80)}}</td>
                        @endif
                        @if(isset($government->created_at))
                            <td>{{$government->created_at}}</td>
                        @endif
                        <td style="">
                          <div class="btn-group">
                            @if(isset($government->id))
                              <a href="{{route('admin.governments.edit', $government->id)}}"
                                 class="btn btn-outline-primary waves-effect waves-light">Редактировать</a>
                            @endif

                            @if(isset($government->id))
                                <form action="{{route('admin.governments.delete', $government->id)}}" method="post">
                                  @csrf
                                  @method('delete')
                                  <button type="submit" class="btn btn-outline-danger waves-effect waves-light">Удалить
                                  </button>
                                </form>
                            @endif

                          </div>
                        </td>
                      </tr>
                  @endif
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

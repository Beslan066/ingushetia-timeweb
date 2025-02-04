@extends('layouts.admin')

@section('content')
  <div class="row">
    <div class="col-12">
      <div class="card">

        <div class="card-body">
          <div class="mb-2 d-flex justify-content-between">
            <div>
              <h2>Муниципалитеты</h2>
            </div>

            <div>
              <a href="{{route('admin.municipalities.create')}}">
                <button type="button" class="btn btn-primary waves-effect waves-light">Добавить</button>
              </a>
            </div>
          </div>


          <div id="selection-datatable_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="dataTables_length" id="selection-datatable_length"><label>Показать <select
                      name="selection-datatable_length" aria-controls="selection-datatable"
                      class="custom-select custom-select-sm form-control form-control-sm">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select> записей</label></div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div id="selection-datatable_filter" class="dataTables_filter"><label>Search:<input type="search"
                                                                                                    class="form-control form-control-sm"
                                                                                                    placeholder=""
                                                                                                    aria-controls="selection-datatable"></label>
                </div>
              </div>
            </div>
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

                  @if(isset($municipalities))
                    @foreach($municipalities as $item)
                      <tr role="row" class="odd">
                        <td class="" tabindex="0">{{$item->id}}</td>
                        <td class="" tabindex="0">{{$item->title}}</td>
                        <td style="">
                          <div class="btn-group">
                            <a href="{{route('admin.municipalities.edit', $item->id)}}"
                               class="btn btn-outline-primary waves-effect waves-light">Редактировать</a>
                            <form action="{{route('admin.municipalities.delete', $item->id)}}" method="post">
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
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              {{$municipalities->links()}}
            </div>
          </div>

        </div> <!-- end card body-->
      </div> <!-- end card -->
    </div><!-- end col-->
  </div>
@endsection

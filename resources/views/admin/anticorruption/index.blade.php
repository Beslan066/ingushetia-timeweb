@extends('layouts.admin')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-body">
                    <div class="mb-2 d-flex justify-content-between">
                        <div>
                            <h2>Противодействие коррупции</h2>
                        </div>

                        <div>
                            <a href="{{route('admin.anticorruptions.create')}}">
                                <button type="button" class="btn btn-primary waves-effect waves-light">Добавить</button>
                            </a>
                        </div>
                    </div>


                    <div id="selection-datatable_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer"><div class="row"><div class="col-sm-12 col-md-6"><div class="dataTables_length" id="selection-datatable_length"><label>Показать <select name="selection-datatable_length" aria-controls="selection-datatable" class="custom-select custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> записей</label></div></div><div class="col-sm-12 col-md-6"><div id="selection-datatable_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="selection-datatable"></label></div></div></div><div class="row"><div class="col-sm-12"><table id="selection-datatable" class="table dt-responsive nowrap dataTable no-footer dtr-inline collapsed" role="grid" aria-describedby="selection-datatable_info" style="width: 1577px;">
                                    <thead>
                                    <tr role="row">
                                        <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1" style="width: 272px;" aria-label="Name: activate to sort column ascending">id</th>
                                        <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1" style="width: 272px;" aria-label="Name: activate to sort column ascending">Заголовок</th>
                                        <th class="sorting_asc" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1" style="width: 193px;" aria-label="Start date: activate to sort column descending" aria-sort="ascending">Опубликованно</th>
                                        <th class="sorting" tabindex="0" aria-controls="selection-datatable" rowspan="1" colspan="1" style="width: 159px; " aria-label="Salary: activate to sort column ascending">Действие</th>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    @if(isset($anticorruptions))
                                        @foreach($anticorruptions as $anticorruption)
                                            <tr role="row" class="odd">
                                                <td class="" tabindex="0">{{$anticorruption->id}}</td>
                                                <td class="" tabindex="0">{{$anticorruption->title}}</td>
                                                <td class="sorting_1">{{$anticorruption->created_at}}</td>
                                                <td style="">
                                                    <div class="btn-group">
                                                        <a href="{{route('admin.anticorruptions.edit', $anticorruption->id)}}" class="btn btn-outline-primary waves-effect waves-light mr-2">Редактировать</a>
                                                        <button type="button" class="btn btn-outline-danger waves-effect waves-light">Удалить</button>

                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    @endif
                                    </tbody>
                                </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="selection-datatable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="selection-datatable_paginate"><ul class="pagination pagination-rounded"><li class="paginate_button page-item previous disabled" id="selection-datatable_previous"><a href="#" aria-controls="selection-datatable" data-dt-idx="0" tabindex="0" class="page-link"><i class="mdi mdi-chevron-left"></i></a></li><li class="paginate_button page-item active"><a href="#" aria-controls="selection-datatable" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="selection-datatable" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="selection-datatable" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="selection-datatable" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="selection-datatable" data-dt-idx="5" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="selection-datatable" data-dt-idx="6" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="selection-datatable_next"><a href="#" aria-controls="selection-datatable" data-dt-idx="7" tabindex="0" class="page-link"><i class="mdi mdi-chevron-right"></i></a></li></ul></div></div></div></div>

                </div> <!-- end card body-->
            </div> <!-- end card -->
        </div><!-- end col-->
    </div>
@endsection

@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-body">
                    <form action="{{route('admin.agencies.store')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group w-50">
                            <label for="">Заголовок</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="name">
                        </div>
                        @error('name')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <label for="">Заголовок</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите полное наименование" name="full_title">
                        </div>
                        @error('full_title')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <label for="">Slug</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Оставьте пустым для автоматического заполнения" name="slug">
                        </div>

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Глава</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="supervisor_id">
                                <option value="">Выберите руководителя</option>
                                @foreach($peoples as $people)
                                    <option value="{{$people->id}}">{{$people->name}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group w-50">
                            <label for="">Министр</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Впишите министр или и.о. министра заголовок" name="supervisor_type">
                        </div>
                        @error('supervisor_type')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="row w-50">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Официальный логотип</h4>
                                        <input type="file" class="dropify" data-height="300" name="logo" multiple/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary me-2">Создать</button>
                        <button class="btn btn-light">Отмена</button>
                    </form>
                </div>
            </div>
        </div>
@endsection

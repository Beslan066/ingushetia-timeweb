@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.natProjects.store')}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('post')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title">
                            </div>
                            @error('title')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                            <div class="form-group w-50">
                                <textarea id="summernote" class="summernote" placeholder="Проекты включенные в федеральную программу" name="lead"></textarea>
                            </div>
                            @error('lead')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror


                            <div class="form-group w-50">
                                <textarea id="summernote" class="summernote" placeholder="Реализуются в ингушетии" name="content"></textarea>
                            </div>
                            @error('content')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

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
                        </div>
                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Фоторепортаж</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="reportage_id">
                                <option value="">Выберите видео</option>
                                @foreach($reportages as $reportage)
                                    <option value="{{$reportage->id}}">{{$reportage->title}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group w-50">
                            <input type="datetime-local" class="datetime_input" name="published_at" style="color: #495057; width: 250px; border: 1px solid #ced4da; padding: 5px !important; ">
                        </div>
                        @error('published_at')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Автор</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="user_id">
                                <option value="{{auth()->user()->id}}">{{auth()->user()->name}}</option>
                            </select>
                        </div>
                        @error('user_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror


                        <div class="btn-group">
                            <button class="btn btn-light mr-2">Назад</button>
                            <button type="submit" class="btn btn-primary">Создать</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
@endsection

@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.photoReportage.store')}}" method="post" enctype="multipart/form-data" >
                    @csrf
                    @method('post')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title">
                            </div>



                            <div class="form-group w-100 d-flex align-items-center">
                                <div class="w-50">
                                    <textarea class="summernote" placeholder="Введите что-нибудь" name="content"></textarea>
                                </div>

                        </div>

                            <div class="form-group w-50">
                                <label for="image_main">Главное изображение</label>
                                <input type="file" id="image_main" name="image_main" class="dropify" data-height="300"/>
                            </div>


                            @error('image_main')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="slides">Слайд-шоу фотографий</label>
                                <input type="file" id="slides" name="slides[]" class="dropify" data-height="300" multiple/>
                            </div>

                            <!-- Контейнер для миниатюр слайдов -->
                            <div id="thumbnails" class="d-flex flex-wrap mt-3"></div>


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


                        <div class="form-group w-50 mt-2">

                            <select class="form-control" id="exampleFormControlSelect1" name="agency_id">
                                <option value="{{auth()->user()->agency->id}}">{{auth()->user()->agency->name}}</option>
                            </select>
                        </div>

                        @error('agency_id')
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

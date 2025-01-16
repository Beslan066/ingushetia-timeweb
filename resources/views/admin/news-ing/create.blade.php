@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.newsIng.store')}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('post')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title">
                            </div>

                            <div class="form-group w-50">
                                <label for="exampleFormControlTextarea1">Лид новости</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="height: 101px;"
                                          placeholder="Введите лид" name="lead"></textarea>
                            </div>

                            <div class="form-group w-50">
                                <textarea class="summernote" placeholder="Введите что-нибудь" name="content"></textarea>
                            </div>

                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <h4 class="card-title">Изображение новости</h4>
                                            <input type="file" class="dropify" data-height="300" name="image_main" multiple/>

                                        </div> <!-- end card-body-->
                                    </div> <!-- end card-->
                                </div> <!-- end col -->
                            </div>

                            @error('image_main')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Категория</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="category_id">
                                <option value="">Выберите категорию</option>
                                @foreach($categories as $category)
                                    <option value="{{$category->id}}">{{$category->title}}</option>
                                @endforeach
                            </select>
                        </div>

                        @error('category_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50 mt-2">
                            <select class="form-control" id="exampleFormControlSelect1" name="news_ing">

                                <option value="">Выберите перевод</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        @error('news_ing')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

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

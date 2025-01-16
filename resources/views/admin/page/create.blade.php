@extends('layouts.admin')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.page.store')}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('post')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title">
                            </div>


                            <div class="form-group w-50">
                                <label for="">Slug</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Оставьте пустым для автоматического заполнения" name="url">
                            </div>


                            <div class="form-group w-50">
                                <textarea class="summernote" placeholder="Введите что-нибудь" name="content"></textarea>
                            </div>

                        </div>

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Автор</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="user_id">
                                <option value="{{auth()->user()->id}}">{{auth()->user()->name}}</option>
                            </select>
                        </div>
                        @error('user_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Родительская страница</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="parent_id">
                                <option value="">Выберите страницу</option>
                                @foreach($pages as $page)
                                    <option value="{{$page->id}}">{{$page->title}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group w-50 mt-2">

                            <select class="form-control" id="exampleFormControlSelect1" name="agency_id">
                                <option value="{{auth()->user()->agency->id}}">{{auth()->user()->agency->name}}</option>
                            </select>
                        </div>

                        @error('agency_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="col-sm-10 mb-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="important">
                                <label class="form-check-label">Важная страница</label>
                            </div>
                        </div>


                        <div class="btn-group">
                            <button class="btn btn-light mr-2">Назад</button>
                            <button type="submit" class="btn btn-primary">Создать</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
@endsection

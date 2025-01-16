@extends('layouts.admin')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.page.update', $page->id)}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('patch')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title" value="{{$page->title}}">
                            </div>

                            <div class="form-group w-50">
                                <label for="">Slug</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Оставьте пустым для автоматического заполнения" name="url" value="{{$page->url}}">
                            </div>


                            <div class="form-group w-50">
                                <textarea id="summernote" class="summernote" placeholder="Введите что-нибудь" name="content">{{$page->content}}</textarea>
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
                                @if(isset($page->parent_id))
                                    <option value="{{$page->parent_id}}">{{$page->parent->title}}</option>
                                @else
                                    <option value="">Выберите страницу</option>
                                @endif
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
                                <input class="form-check-input" type="checkbox" name="important"

                                       @if($page->important == 1)
                                           checked
                                    @endif

                                       >
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

@extends('layouts.admin')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.ministers.update', $minister->id)}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('patch')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="ФИО" name="name" value="{{$minister->name}}">
                            </div>
                            @error('title')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="">Должность</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="ФИО" name="position" value="{{$minister->position}}">
                            </div>
                            @error('position')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <textarea id="summernote" class="summernote" placeholder="Введите немного биографии" name="bio">{{$minister->bio}}</textarea>
                            </div>
                            @error('content')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <input type="file" class="dropify" data-height="300" name="image_main" @if($minister->image_main)
                                                data-default-file="{{ asset('storage/' . $minister->image_main) }}"
                                                @endif/>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            @error('image_main')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group w-50">
                          <label for="">Приоритет(чем больше цифра тем ниже будет на странице Состав Правитльства)</label>
                          <input class="form-control form-control-lg mb-3" type="number" placeholder="Выберите цифру" name="priority" value="{{$minister->priority}}">
                        </div>
                        @error('priority')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <label for="">Контакт</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Email или номер" name="contact" value="{{$administration->contact}}">
                        </div>
                        @error('title')
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

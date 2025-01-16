@extends('layouts.admin')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.supervisors.update', $supervisor->id)}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('patch')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="ФИО" name="name" value="{{$supervisor->name}}">
                            </div>
                            @error('title')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="">Должность</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="ФИО" name="position" value="{{$supervisor->position}}">
                            </div>
                            @error('position')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <textarea id="summernote" class="summernote" placeholder="Введите немного биографии" name="bio">{{$supervisor->bio}}</textarea>
                            </div>
                            @error('content')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <input type="file" class="dropify" data-height="300" name="image_main" @if($supervisor->image_main)
                                                data-default-file="{{ asset('storage/' . $supervisor->image_main) }}"
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

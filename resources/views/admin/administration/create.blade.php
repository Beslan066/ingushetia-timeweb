@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.administrations.store')}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('post')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="ФИО" name="name">
                            </div>
                            @error('title')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror


                            <div class="form-group w-50">
                                <label for="">Должность</label>
                                <input class="form-control form-control-lg mb-3" type="text" name="position">
                            </div>
                            @error('position')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <textarea class="summernote" placeholder="Введите немного биографии" name="bio"></textarea>
                            </div>
                            @error('content')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <h4 class="card-title">Изображение</h4>
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
                        <label for="">Контакт</label>
                        <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите email или номер телефона" name="contact">
                      </div>


                      <div class="form-group w-50">
                        <label for="exampleFormControlSelect1">Категория</label>
                        <select class="form-control" id="exampleFormControlSelect1" name="administration_types_id">
                          <option value="">Выберите категорию</option>
                          @foreach($types as $type)
                            <option value="{{$type->id}}">{{$type->name}}</option>
                          @endforeach
                        </select>
                      </div>

                      <div class="form-group w-50">
                        <label for="">Приоритет(чем больше цифра тем ниже будет на странице Состав Правитльства)</label>
                        <input class="form-control form-control-lg mb-3" type="number" placeholder="Выберите цифру" name="priority">
                      </div>
                      @error('priority')
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

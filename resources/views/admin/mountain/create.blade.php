@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.mountains.store')}}" method="post" enctype="multipart/form-data">
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

                            <div class="form-row w-50 mb-4">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Дата начала строительства" name="year">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Расположение" name="location">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Координаты" name="coordinates">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Высота над уровнем моря" name="see_height">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Состав" name="structure">
                                </div>
                            </div>

                          <div class="form-group w-50">
                            <label for="exampleFormControlTextarea1">Лид новости</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="height: 101px;"
                                      placeholder="Введите лид" name="lead"></textarea>
                          </div>
                          @error('lead')
                          <div class="text-danger">{{ $message }}</div>
                          @enderror

                            <div class="form-group w-50">
                                <textarea class="summernote" placeholder="Введите что-нибудь" name="content"></textarea>
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

                        <div class="form-row w-50 mb-4">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Автор фотографии" name="image_author">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Описание фотографии" name="image_description">
                            </div>
                        </div>

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Фоторепортаж</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="reportage_id">
                                <option value="">Выберите репортаж</option>
                                @foreach($reportages as $reportage)
                                    <option value="{{$reportage->id}}">{{$reportage->title}}</option>
                                @endforeach
                            </select>
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

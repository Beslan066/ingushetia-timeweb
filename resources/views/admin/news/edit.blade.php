@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.news.update', $news->url)}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('patch')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title" value="{{$news->title}}">
                            </div>
                            @error('title')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="">Slug</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Оставьте пустым для автоматического заполнения" name="url" value="{{$news->url}}">
                            </div>


                            <div class="form-group w-50">
                                <label for="exampleFormControlTextarea1">Лид новости</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="height: 101px;"
                                          placeholder="Введите лид" name="lead">{{$news->lead}}</textarea>
                            </div>
                            @error('lead')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <textarea class="summernote" placeholder="Введите что-нибудь" name="content">{{$news->content}}</textarea>
                            </div>
                            @error('content')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <h4 class="card-title">Изображение новости</h4>
                                            <input type="file" class="dropify" data-height="300" name="image_main" multiple
                                                   @if($news->image_main)
                                                       data-default-file="{{ asset('storage/' . $news->image_main) }}"
                                                @endif
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            @error('image_main')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-row w-50 mb-4">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Автор фотографии" name="image_author" value="{{$news->image_author}}">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Описание фотографии" name="image_description" value="{{$news->image_description}}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Категория</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="category_id">
                                @if(isset($news->category->id))
                                    <option value="{{$news->category->id}}">{{$news->category->title}}</option>
                                @endif
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
                            <label for="exampleFormControlSelect1">Видеорепортаж</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="video_id">
                                <option value="">Выбрать видеорепортаж</option>
                                @if(isset($news->video_id))
                                    <option value="{{$news->video_id}}" selected>{{$news->video->title}}</option>
                                @else
                                  @foreach($videos as $video)
                                      <option value="{{$video->id}}" @if($news->video_id == $video->id) selected @endif>{{$video->title}}</option>
                                  @endforeach
                                @endif
                            </select>
                        </div>

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect2">Фоторепортаж</label>
                            <select class="form-control" id="exampleFormControlSelect2" name="reportage_id">
                                <option value="">Выбрать фоторепортаж</option>
                                @if(isset($news->reportage_id))
                                    <option value="{{$news->reportage_id}}" selected>{{$news->reportage->title}}</option>
                                @endif
                                @foreach($reportages as $reportage)
                                    <option value="{{$reportage->id}}" @if($news->reportage_id == $reportage->id) selected @endif>{{$reportage->title}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group w-50">
                            <input type="datetime-local" class="datetime_input" name="published_at"
                                   style="color: #495057; width: 250px; border: 1px solid #ced4da;
                                   padding: 5px !important; "
                                   value="{{ $news->published_at ? date('Y-m-d\TH:i', strtotime($news->published_at)) : '' }}"                            >
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

                        <div class="col-sm-10 mb-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="main_material"
                                    @if($news->main_material == 1)
                                        checked
                                    @endif
                                >
                                <label class="form-check-label">Главный материал</label>
                            </div>
                        </div>


                        <div class="btn-group">
                            <button class="btn btn-light mr-2">Назад</button>
                            <button type="submit" class="btn btn-primary">Обновить</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
@endsection

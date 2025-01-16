@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-body">
                    <form action="{{route('admin.economicSupports.update', $economicSupport->id)}}" method="post" enctype="multipart/form-data">
                        @method('patch')
                        @csrf
                        <div class="form-group w-50">
                            <label for="">Заголовок</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title" value="{{$economicSupport->title}}">
                        </div>
                        @error('title')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <label for="exampleFormControlTextarea1">Лид новости</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="height: 101px;"
                                      placeholder="Введите лид" name="lead">{{$economicSupport->lead}}</textarea>
                        </div>
                        @error('lead')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <textarea class="summernote" placeholder="Введите что-нибудь" name="content">{{$economicSupport->content}}</textarea>
                        </div>
                        @error('content')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror


                        <div class="row w-50">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">

                                        <h4 class="card-title">Документ</h4>
                                        <input type="file" class="dropify" data-height="300" name="document" multiple
                                               @if($economicSupport->document)
                                                   data-default-file="{{ asset('storage/' . $economicSupport->document) }}"
                                            @endif
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-10 mb-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="type" @if($economicSupport->type == 1)
                                    checked
                                    @endif>
                                <label class="form-check-label">Для бизнеса(для экономики оставьте как есть)</label>
                            </div>
                            @error('type')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <button type="submit" class="btn btn-primary me-2">Создать</button>
                        <button class="btn btn-light">Отмена</button>
                    </form>
                </div>
            </div>
        </div>
@endsection

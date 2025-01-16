@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-body">
                    <form action="{{route('admin.economicSupports.store')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group w-50">
                            <label for="">Заголовок</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title">
                        </div>
                        @error('title')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

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

                        <div class="form-group">
                            <label for="document">Загрузите документ</label>
                            <input type="file" name="document" id="document" class="form-control-file">
                            @error('document')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-sm-10 mb-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="type">
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

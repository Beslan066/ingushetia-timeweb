@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-body">
                    <form action="{{route('admin.governmentDocumentCategorys.update', $category->id)}}" method="post" enctype="multipart/form-data">
                        @csrf
                        @method('patch')
                        <div class="form-group w-50">
                            <label for="">Заголовок</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title" value="{{$category->title}}">
                        </div>
                        @error('title')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <button type="submit" class="btn btn-primary me-2">Создать</button>
                        <button class="btn btn-light">Отмена</button>
                    </form>
                </div>
            </div>
        </div>
@endsection

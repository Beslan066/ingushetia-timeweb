@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-body">
                    <form action="{{route('admin.socialEconomicDevelopments.store')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group w-50">
                            <label for="">Заголовок</label>
                            <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title">
                        </div>
                        @error('name')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group">
                            <label for="document">Upload Document</label>
                            <input type="file" name="document" id="document" class="form-control-file" required>
                            @error('document')
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

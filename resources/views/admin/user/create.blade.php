@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.users.store')}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('post')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text"
                                       placeholder="Введите имя и фамилию" name="name">
                            </div>
                            @error('name')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div>
                                <div class="form-group w-50">
                                    <label for="">Email</label>
                                    <input class="form-control form-control-lg mb-3" type="email"
                                           placeholder="Введите email" name="email">
                                </div>
                                @error('email')
                                <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <h4 class="card-title">Изображение новости</h4>
                                            <input type="file" class="dropify" data-height="300" name="avatar" multiple/>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            @error('image_main')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="exampleFormControlSelect1">Роль</label>
                                <select class="form-control" id="exampleFormControlSelect1" name="role">
                                    <option value="">Выберите роль</option>
                                    @foreach($roles as $role => $roleName)
                                        <option value="{{ (int) $role }}" {{ (int) old('role') == (int) $role ? 'selected' : '' }}>
                                            {{ $roleName }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            @error('role')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror


                            <div class="form-group w-50">
                                <label for="exampleFormControlSelect1">Министерство</label>
                                <select class="form-control" id="exampleFormControlSelect1" name="agency_id">
                                    <option value="">Выберите министерство</option>
                                    @foreach($agencies as $agency)
                                        <option value="{{$agency->id}}">{{$agency->name}}</option>
                                    @endforeach
                                </select>
                            </div>

                            @error('agency_id')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="">Пароль</label>
                                <input class="form-control form-control-lg mb-3" type="password"
                                       placeholder="Введите пароль" name="password">
                            </div>
                            @error('password')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="">Пароль</label>
                                <input class="form-control form-control-lg mb-3" type="password"
                                       placeholder="Подтвердите пароль" name="password_confirmation">
                            </div>
                            @error('password_confirmation')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror


                            <div class="btn-group">
                                <button class="btn btn-light mr-2">Назад</button>
                                <button type="submit" class="btn btn-primary">Создать</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
@endsection

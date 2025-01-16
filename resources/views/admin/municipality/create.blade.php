@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.municipalities.store')}}" method="post" enctype="multipart/form-data">
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

                            <div class="form-group w-50">
                                <div class="basic-form">
                                    <form>
                                        <div class="form-row">
                                            <div class="col-7">
                                                <input type="number" class="form-control" placeholder="Насление" name="population" >
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" placeholder="Площадь" name="square">
                                            </div>
                                            <div class="col">
                                                <input type="number" class="form-control" placeholder="Год" name="year">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            @error('lead')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="form-group w-50">
                                <label for="summernote">Контент</label>
                                <textarea class="summernote" id="summernote" placeholder="Введите что-нибудь" name="content"></textarea>
                            </div>
                            @error('content')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror

                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <h4 class="card-title">Изображение на главной</h4>
                                            <input type="file" class="dropify" data-height="300" name="image_main" multiple/>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <h4 class="card-title">Герб</h4>
                                            <input type="file" class="dropify" data-height="300" name="arms" multiple/>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            @error('arms')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Глава</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="supervisor_id">
                                <option value="">Выберите руководителя</option>
                                @foreach($peoples as $people)
                                    <option value="{{$people->id}}">{{$people->name}}</option>
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

                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Тип</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="type">

                                @foreach($types as $id => $type)
                                    <option value="{{$id}}" >{{ $type}}</option>
                                @endforeach
                            </select>
                        </div>
                        @error('user_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <h3>Контакты</h3>
                            <label for="phone_number">Телефон:</label>
                            <input type="text" class="form-control @error('phone_number') is-invalid @enderror" id="phone_number" name="phone_number" required
                                   pattern="8-\d{3}-\d{3}-\d{2}-\d{2}" title="Введите номер в формате: 8-928-090-48-33">
                        </div>
                        @error('phone_number')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror
                        <div class="form-group w-50">
                            <label for="fax_number">Факс:</label>
                            <input type="text" class="form-control" id="fax_number" name="fax_number" required
                                   pattern="^8 \(\d{4}\) \d{2} \d{2} \d{2}$" title="Введите номер факса в формате: 8 (8732) 37 48 94">
                        </div>
                        @error('fax_number')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <label for="email">Эл. почта:</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>

                        @error('email')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror

                        <div class="form-group w-50">
                            <label for="address">Адрес:</label>
                            <input type="text" class="form-control" id="address" name="address" required>
                        </div>

                        @error('address')
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

@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">

                <form action="{{route('admin.awardPolitics.update', $awardPolitic->id)}}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('patch')
                    <div class="card-body">
                        <div>
                            <div class="form-group w-50">
                                <label for="">Заголовок</label>
                                <input class="form-control form-control-lg mb-3" type="text" placeholder="Введите заголовок" name="title" value="{{$document->title}}">
                            </div>


                            <div class="row w-50">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <h4 class="card-title">Файл</h4>
                                            <input type="file" class="dropify" data-height="300" name="file" multiple
                                                   @if($document->file)
                                                       data-default-file="{{ asset('storage/' . $awardPolitic->file) }}"
                                                @endif
                                            />

                                        </div> <!-- end card-body-->
                                    </div> <!-- end card-->
                                </div> <!-- end col -->
                            </div>
                        </div>


                        <div class="form-group w-50">
                            <label for="exampleFormControlSelect1">Тип документа</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="type">
                                <option value="">Выберите тип документа</option>
                                @foreach($types as $type)
                                    <option value="{{ $type['id'] }}" {{ $awardPolitic->type == $type['id'] ? 'selected' : '' }}>
                                        {{ $type['title'] }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group w-50 mt-2">

                            <select class="form-control" id="exampleFormControlSelect1" name="agency_id">
                                <option value="{{auth()->user()->agency->id}}">{{auth()->user()->agency->name}}</option>
                            </select>
                        </div>

                        @error('agency_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror


                        <div class="form-group w-50">
                            <input type="datetime-local" class="datetime_input" name="published_at" style="color: #495057; width: 250px; border: 1px solid #ced4da; padding: 5px !important; "
                                   value="{{ $awardPolitic->published_at ? date('Y-m-d\TH:i', strtotime($awardPolitic->published_at)) : '' }}">
                        </div>

                        <div class="btn-group">
                            <button class="btn btn-light mr-2">Назад</button>
                            <button type="submit" class="btn btn-primary">Создать</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
@endsection

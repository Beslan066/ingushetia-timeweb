@extends('layouts.admin')

@section('content')
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0 font-size-18">Дашборд</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Lunoz</a></li>
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
        <!-- end page title -->

        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <i class="bx bx-layer float-right m-0 h2 text-muted"></i>
                        <h6 class="text-muted text-uppercase mt-0">Orders</h6>
                        <h3 class="mb-3" data-plugin="counterup">1,587</h3>
                        <span class="badge badge-success mr-1"> +11% </span> <span class="text-muted">From previous period</span>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <i class="bx bx-dollar-circle float-right m-0 h2 text-muted"></i>
                        <h6 class="text-muted text-uppercase mt-0">Revenue</h6>
                        <h3 class="mb-3">$<span data-plugin="counterup">46,782</span></h3>
                        <span class="badge badge-danger mr-1"> -29% </span> <span class="text-muted">From previous period</span>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <i class="bx bx-bx bx-analyse float-right m-0 h2 text-muted"></i>
                        <h6 class="text-muted text-uppercase mt-0">Average Price</h6>
                        <h3 class="mb-3">$<span data-plugin="counterup">15.9</span></h3>
                        <span class="badge badge-warning mr-1"> 0% </span> <span class="text-muted">From previous period</span>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <i class="bx bx-basket float-right m-0 h2 text-muted"></i>
                        <h6 class="text-muted text-uppercase mt-0">Product Sold</h6>
                        <h3 class="mb-3" data-plugin="counterup">1,890</h3>
                        <span class="badge badge-success mr-1"> +89% </span> <span class="text-muted">Last year</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- end row -->


        <div class="row">
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <div class="dropdown float-right position-relative">
                            <a href="#" class="dropdown-toggle h4 text-muted" data-toggle="dropdown" aria-expanded="false">
                                <i class="mdi mdi-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><a href="#" class="dropdown-item">Action</a></li>
                                <li><a href="#" class="dropdown-item">Another action</a></li>
                                <li><a href="#" class="dropdown-item">Something else here</a></li>
                                <li class="dropdown-divider"></li>
                                <li><a href="#" class="dropdown-item">Separated link</a></li>
                            </ul>
                        </div>

                        <h4 class="card-title overflow-hidden">Recent Buyers</h4>
                        <p class="card-subtitle mb-4 font-size-13 overflow-hidden">Transaction period from 21 July to 25 Aug
                        </p>

                        <div class="table-responsive">
                            <table class="table table-centered table-hover table-xl mb-0" id="recent-orders">
                                <thead>
                                <tr>
                                    <th class="border-top-0">Product</th>
                                    <th class="border-top-0">Customers</th>
                                    <th class="border-top-0">Categories</th>
                                    <th class="border-top-0">Popularity</th>
                                    <th class="border-top-0">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="text-truncate">iPone X</td>
                                    <td class="text-truncate">Tiffany W. Yang</td>
                                    <td>
                                        <span class="badge badge-soft-success p-2">Mobile</span>
                                    </td>
                                    <td>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" aria-valuenow="85" aria-valuemin="20" aria-valuemax="100" style="width:85%"></div>
                                        </div>
                                    </td>
                                    <td class="text-truncate">$ 1200.00</td>
                                </tr>
                                <tr>
                                    <td class="text-truncate">iPad</td>
                                    <td class="text-truncate">Dale P. Warman</td>
                                    <td>
                                        <span class="badge badge-soft-success p-2">Tablet</span>
                                    </td>
                                    <td>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" aria-valuenow="72" aria-valuemin="20" aria-valuemax="100" style="width:72%"></div>
                                        </div>
                                    </td>
                                    <td class="text-truncate">$ 1190.00</td>
                                </tr>
                                <tr>
                                    <td class="text-truncate">OnePlus</td>
                                    <td class="text-truncate">Garth J. Terry</td>
                                    <td>
                                        <span class="badge badge-soft-success p-2">Electronics</span>
                                    </td>
                                    <td>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" aria-valuenow="43" aria-valuemin="20" aria-valuemax="100" style="width:43%"></div>
                                        </div>
                                    </td>
                                    <td class="text-truncate">$ 999.00</td>
                                </tr>
                                <tr>
                                    <td class="text-truncate">ZenPad</td>
                                    <td class="text-truncate">Marilyn D. Bailey</td>
                                    <td>
                                        <span class="badge badge-soft-success p-2">Cosmetics</span>
                                    </td>
                                    <td>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" aria-valuenow="37" aria-valuemin="20" aria-valuemax="100" style="width:37%"></div>
                                        </div>
                                    </td>
                                    <td class="text-truncate">$ 1150.00</td>
                                </tr>
                                <tr>
                                    <td class="text-truncate">Pixel 2</td>
                                    <td class="text-truncate">Denise R. Vaughan</td>
                                    <td>
                                        <span class="badge badge-soft-success p-2">Appliences</span>
                                    </td>
                                    <td>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" aria-valuenow="82" aria-valuemin="20" aria-valuemax="100" style="width:82%"></div>
                                        </div>
                                    </td>
                                    <td class="text-truncate">$ 1180.00</td>
                                </tr>
                                <tr>
                                    <td class="text-truncate">Pixel 2</td>
                                    <td class="text-truncate">Jeffery R. Wilson</td>
                                    <td>
                                        <span class="badge badge-soft-success p-2">Mobile</span>
                                    </td>
                                    <td>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" aria-valuenow="36" aria-valuemin="20" aria-valuemax="100" style="width:36%"></div>
                                        </div>
                                    </td>
                                    <td class="text-truncate">$ 1180.00</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div> <!-- end card-body-->
                </div> <!-- end card-->
            </div> <!-- end col -->
        </div>
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">

                        <div class="dropdown float-right position-relative">
                            <a href="#" class="dropdown-toggle h4 text-muted" data-toggle="dropdown" aria-expanded="false">
                                <i class="mdi mdi-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><a href="#" class="dropdown-item">Action</a></li>
                                <li><a href="#" class="dropdown-item">Another action</a></li>
                                <li><a href="#" class="dropdown-item">Something else here</a></li>
                                <li class="dropdown-divider"></li>
                                <li><a href="#" class="dropdown-item">Separated link</a></li>
                            </ul>
                        </div>

                        <h4 class="card-title overflow-hidden">Обращения</h4>
                        <p class="card-subtitle mb-4 font-size-13 overflow-hidden">Здесь показаны последния обращения</p>

                        <div class="table-responsive">
                            <table class="table table-borderless table-hover table-centered table-nowrap mb-0">
                                <tbody>
                                @foreach($applications as $item)
                                    <tr>
                                        <td>
                                            <h5 class="font-size-15 mb-1 font-weight-normal">{{$item->id}}</h5>
                                        </td>
                                        <td>
                                            <h5 class="font-size-15 mb-1 font-weight-normal">{{$item->user_name}}  {{$item->user_family}}</h5>
                                            <span class="text-muted font-size-12">{{$item->created_at}}</span>
                                        </td>
                                        <td>
                                            <h5 class="font-size-17 mb-1 font-weight-normal">{{$item->user_phone}}</h5>
                                            <span class="text-muted font-size-12">{{$item->user_email}}</span>
                                        </td>
                                        <td>
                                            <span>Сообщение</span>
                                            <p class="font-size-15 mb-1 font-weight-normal">
                                                {{$item->user_message}}
                                            </p>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>

                    </div> <!-- end card-body-->
                </div> <!-- end card-->
            </div> <!-- end col -->
        </div>

    </div> <!-- container-fluid -->
@endsection

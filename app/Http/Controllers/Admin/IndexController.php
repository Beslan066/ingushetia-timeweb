<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {

        $applications = Application::query()->orderBy('id', 'desc')->get();

        return view('admin.index', [
            'applications' => $applications
        ]);
    }
}

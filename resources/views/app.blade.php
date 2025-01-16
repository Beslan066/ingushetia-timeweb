<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="республика, ингушетия, новости, культура, история, фотографии, видео, институты власти" />
        <meta name="description" content="Официальный сайт Республики Ингушетия" />


        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
        <link href="{{ asset('/css/reset.css') }}" rel="stylesheet" />
        <link href="{{ asset('/css/variables.css') }}" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="{{asset('img/favicon.ico')}}">


        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/frontend/app.jsx', "resources/frontend/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="body" style="position: relative;">
        @inertia
    </body>
</html>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  @if(isset($meta['keywords']))
    <meta name="keywords" content="{{ $meta['keywords'] }}">
  @else
    <meta name="keywords" content="Республика, Ингушетия, новости, культура, история, правительство">
  @endif

  @if(isset($meta['description']))
    <meta name="description" content="{{ $meta['description'] }}">
  @else
    <meta name="description" content="Официальный сайт Республики Ингушетия">
  @endif

  <!-- Предзагрузка критических ресурсов -->
  <link rel="preload" href="{{ asset('css/variables.css') }}" as="style">
  <link rel="preload" href="{{ asset('css/reset.css') }}" as="style">
  <link rel="preconnect" href="https://fonts.googleapis.com">

  <link rel="stylesheet" href="{{ asset('css/reset.css') }}">
  <link rel="stylesheet" href="{{ asset('css/variables.css') }}">

  <title>Республика Ингушетия — официальный сайт</title>


  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
  <link rel="icon" href="{{ asset('img/favicon.ico') }}" type="image/x-icon">
  <link rel="canonical" href={window.location.href} />

  <style>
    .cookie-consent {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #051945;
      padding: 15px;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      z-index: 9999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
    }
    .cookie-consent button {
      background: #07a267;
      color: white;
      border: none;
      padding: 8px 15px;
      cursor: pointer;
    }
  </style>

  @inertiaHead
</head>
<body class="body">
@inertia

@routes

<!-- Отложенная загрузка скриптов -->
@viteReactRefresh
@vite(['resources/frontend/app.jsx'])


<div id="cookie-consent-container  "></div>

</body>
</html>

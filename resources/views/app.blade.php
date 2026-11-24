<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">

  <!-- Предзагрузка критических ресурсов -->
  <link rel="preload" href="{{ asset('css/variables.css') }}" as="style">
  <link rel="preload" href="{{ asset('css/reset.css') }}" as="style">
  <link rel="preconnect" href="https://fonts.googleapis.com">

  <link rel="stylesheet" href="{{ asset('css/reset.css') }}">
  <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
  <meta name="yandex-verification" content="2f8981d0e11ac6d0" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
  <link rel="icon" href="{{ asset('img/favicon.ico') }}" type="image/x-icon">
  <link rel="canonical" href={window.location.href} />

  <meta name="csrf-token" content="{{ csrf_token() }}">


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


<div class="link-groups">
<!-- Yandex.Metrika informer -->
<a href="https://metrika.yandex.ru/stat/?id=114642719&amp;from=informer" target="_blank" rel="nofollow">
    <img src="https://informer.yandex.ru/informer/114642719/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
         style="width:88px; height:31px; border:0;"
         alt="Яндекс.Метрика"
         title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
        />
</a>
<a href="https://webmaster.yandex.ru/siteinfo/?site=https://ingushetia.ru"><img width="88" height="31" alt="" border="0" border-radius="8" src="https://yandex.ru/cycounter?https://ingushetia.ru&theme=light&lang=ru"/></a>

</div>
<!-- /Yandex.Metrika informer -->

<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=114642719', 'ym');

    ym(114642719, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/114642719" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->


</body>
</html>

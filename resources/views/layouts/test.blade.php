<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>
        @if (Route::is('home'))
            Новости Ингушетии -  Газета "Сердало"
        @elseif (Route::is('posts.index'))
            Новости Ингушетии -  Газета "Сердало"
        @elseif (Route::is('materials.index'))
            Новости Ингушетии -  Газета "Сердало"
        @elseif (Route::is('post-single'))
            @isset($post)
                {{ $post->title }} — все новости Ингушетии в Газете "Сердало"
            @endisset
        @elseif (Route::is('material-single'))
            @isset($material)
                {{ $material->title }} — все новости Ингушетии в Газете "Сердало"
            @endisset
        @else
            Новости Ингушетии - Газета "Сердало"
        @endif
    </title>


    <meta name="robots" content="all">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:title"
          content="{{isset($post) ? $post->title : (isset($material) ? $material->title : 'Газета Седало — Новости Ингушетии')}}">
    <meta property="og:description"
          content="{{ isset($post) ? $post->lead : (isset($material) ? $material->lead : 'Общенациональная газета «Сердало» - главное печатное издание Республики Ингушетия, предоставляющее читателям наиболее полную, оперативную, надежную и объективную информацию.') }}">
    <meta property="og:image"
          content="{{ isset($post) ? ($post->file->full_path ?? '') : (isset($material) ? ($material->file->full_path ?? '') : '') }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:site_name" content="Сердало">
    <meta property="article:author"
          content="{{ isset($post) ? $post->author->name : (isset($material) ? $material->author->title : '') }}">
    <meta property="article:published_time"
          content="{{ isset($post) ? $post->published_at : (isset($material) ? $material->published_at : '') }}">
    <meta property="article:modified_time"
          content="{{ isset($post) ? $post->updated_at : (isset($material) ? $material->updated_at : '') }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type"
          content="{{ isset($post) ? ($post->file->type ?? '') . '/' . ($post->file->extension ?? '') : (isset($material) ? ($material->file->type ?? '') . '/' . ($material->file->extension ?? '') : '') }}">
    <meta name="keywords"
          content="Республика Ингушетия, Махмуд-Али Калиматов, новости, новости Ингушетия, беркат, футбол Ингушетии, курс доллара, погода, Новости сегодня, переводчик, время намаза ингушетия">
    <meta name="description"
          content="{{ isset($post) ? $post->lead : (isset($material) ? $material->lead : 'Общенациональная газета «Сердало» - главное печатное издание Республики Ингушетия, предоставляющее читателям наиболее полную, оперативную, надежную и объективную информацию.') }}">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">
    <link rel="stylesheet" href="{{asset('frontend/v3/assets/css/game.css')}}">

    <link rel="icon" type="image/png" sizes="32x32"
          href="{{ asset('frontend/v3/assets/media/base-v2/favicon-32x32.png') }}">
    <script src="https://cdn.tailwindcss.com"></script>

    <style type="text/tailwindcss">
        @layer utilities {
            .min-h-0

            .5 {
            min-height: 0.125rem;
        }
            .min-h-1 {
                min-height: 0.25rem;
            }

            .min-h-1

            .5 {
            min-height: 0.375rem;
        }
            .min-h-2 {
                min-height: 0.5rem;
            }

            .min-h-2

            .5 {
            min-height: 0.625rem;
        }
            .min-h-3 {
                min-height: 0.75rem;
            }

            .min-h-3

            .5 {
            min-height: 0.875rem;
        }
            .min-h-4 {
                min-height: 1rem;
            }

            .min-h-5 {
                min-height: 1.25rem;
            }

            .min-h-6 {
                min-height: 1.5rem;
            }

            .min-h-7 {
                min-height: 1.75rem;
            }

            .min-h-8 {
                min-height: 2rem;
            }

            .min-h-9 {
                min-height: 2.25rem;
            }

            .min-h-10 {
                min-height: 2.5rem;
            }

            .min-h-11 {
                min-height: 2.75rem;
            }

            .min-h-12 {
                min-height: 3rem;
            }

            .min-h-14 {
                min-height: 3.5rem;
            }

            .min-h-16 {
                min-height: 4rem;
            }

            .min-h-20 {
                min-height: 5rem;
            }

            .min-h-24 {
                min-height: 6rem;
            }

            .min-h-28 {
                min-height: 7rem;
            }

            .min-h-32 {
                min-height: 8rem;
            }

            .min-h-36 {
                min-height: 9rem;
            }

            .min-h-40 {
                min-height: 10rem;
            }

            .min-h-44 {
                min-height: 11rem;
            }

            .min-h-48 {
                min-height: 12rem;
            }

            .min-h-52 {
                min-height: 13rem;
            }

            .min-h-56 {
                min-height: 14rem;
            }

            .min-h-60 {
                min-height: 15rem;
            }

            .min-h-64 {
                min-height: 16rem;
            }

            .min-h-72 {
                min-height: 18rem;
            }

            .min-h-80 {
                min-height: 20rem;
            }

            .min-h-96 {
                min-height: 24rem;
            }

            .min-h-1\/2 {
                min-height: 50%;
            }

            .cm-aspect-16\/9 {
                aspect-ratio: 16/9;
            }

            .cm-aspect-9\/16 {
                aspect-ratio: 9/16;
            }

            .cm-aspect-4\/3 {
                aspect-ratio: 4/3;
            }

            .cm-aspect-3\/4 {
                aspect-ratio: 3/4;
            }

            .cm-aspect-1\/1 {
                aspect-ratio: 1/1;
            }

            .cm-aspect-2\/1 {
                aspect-ratio: 2/1;
            }

            .cm-aspect-1\/2 {
                aspect-ratio: 1/2;
            }

            .cm-aspect-pdf {
                aspect-ratio: 2.8/4;
            }

            :root {
                --color-1: #ffffff;
                --color-2: #000000;
                --color-3: #E9E9E9;
                --color-4: #5B5B5B;
                --color-5: #939292;
                --color-6: #F5F5F5;
                --color-7: #006633;
                --color-8: #D3D3D3;
                --color-9: #7F7F7F;
                --color-1-25: #ffffff40;
                --color-1-50: #ffffff80;
                --color-1-75: #ffffffbf;
                --color-2-25: #00000040;
                --color-2-50: #00000080;
                --color-2-75: #000000bf;
            }

            .bg-1 {
                background-color: var(--color-1);
            }

            .color-1 {
                color: var(--color-1);
            }

            .border-color-1 {
                border-color: var(--color-1);
            }

            .bg-2 {
                background-color: var(--color-2);
            }

            .color-2 {
                color: var(--color-2);
            }

            .border-color-2 {
                border-color: var(--color-2);
            }

            .bg-3 {
                background-color: var(--color-3);
            }

            .color-3 {
                color: var(--color-3);
            }

            .border-color-3 {
                border-color: var(--color-3);
            }

            .bg-4 {
                background-color: var(--color-4);
            }

            .color-4 {
                color: var(--color-4);
            }

            .border-color-4 {
                border-color: var(--color-4);
            }

            .bg-5 {
                background-color: var(--color-5);
            }

            .color-5 {
                color: var(--color-5);
            }

            .border-color-5 {
                border-color: var(--color-5);
            }

            .bg-6 {
                background-color: var(--color-6);
            }

            .color-6 {
                color: var(--color-6);
            }

            .border-color-6 {
                border-color: var(--color-6);
            }

            .bg-7 {
                background-color: var(--color-7);
            }

            .color-7 {
                color: var(--color-7);
            }

            .border-color-7 {
                border-color: var(--color-7);
            }

            .bg-8 {
                background-color: var(--color-8);
            }

            .color-8 {
                color: var(--color-8);
            }

            .border-color-8 {
                border-color: var(--color-8);
            }

            .bg-9 {
                background-color: var(--color-9);
            }

            .color-9 {
                color: var(--color-9);
            }

            .border-color-9 {
                border-color: var(--color-9);
            }


            .bg-1\/25 {
                background-color: var(--color-1-25);
            }

            .color-1\/25 {
                color: var(--color-1-25);
            }

            .border-color-1\/25 {
                border-color: var(--color-1-25);
            }

            .bg-1\/50 {
                background-color: var(--color-1-50);
            }

            .color-1\/50 {
                color: var(--color-1-50);
            }

            .border-color-1\/50 {
                border-color: var(--color-1-50);
            }

            .bg-1\/75 {
                background-color: var(--color-1-75);
            }

            .color-1\/75 {
                color: var(--color-1-75);
            }

            .border-color-1\/75 {
                border-color: var(--color-1-75);
            }

            .bg-2\/25 {
                background-color: var(--color-2-25);
            }

            .color-2\/25 {
                color: var(--color-2-25);
            }

            .border-color-2\/25 {
                border-color: var(--color-2-25);
            }

            .bg-2\/50 {
                background-color: var(--color-2-50);
            }

            .color-2\/50 {
                color: var(--color-2-50);
            }

            .border-color-2\/50 {
                border-color: var(--color-2-50);
            }

            .bg-2\/75 {
                background-color: var(--color-2-75);
            }

            .color-2\/75 {
                color: var(--color-2-75);
            }

            .border-color-2\/75 {
                border-color: var(--color-2-75);
            }
        }
    </style>
    <style type="text/tailwindcss">
        @layer components {
            .cm-pagination-link {
                @apply relative inline-flex items-center px-5 py-2.5 -ml-px text-base font-medium color-2 bg-1 border border-color-8 leading-5;
            }

            .cm-pagination-link--effects {
                @apply hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150;
            }

            .cm-pagination-m-link {
                @apply relative inline-flex items-center px-5 py-2.5 text-base font-medium color-2 bg-1 border border-color-8 cursor-default leading-5;
            }

            .cm-pagination-m-link--effects {
                @apply hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150;
            }

            .cm-pagination-link-disabled {
                @apply opacity-50;
            }

            .cm-article-date {
                @apply text-xs font-medium leading-none color-5;
            }

            .cm-article-title {
                @apply mb-2.5 text-lg font-semibold leading-snug color-7;
            }

            .cm-article-subtitle {
                @apply font-medium leading-normal;
                font-size: 13px;
            }

            @media (max-width: 480px) {

                .slides-container {
                    height: unset;
                }

                .news-date-mobile {
                    margin-top: 10px;
                }

                .cm-article-subtitle {
                    font-size: 15px;
                }

                .cm-single-description {
                    font-size: 15px;
                }

            }
        }
    </style>
    <!--<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">-->
    <style>
        @font-face {
            font-family: 'Inter';
            src: url('{{ asset("frontend/v3/assets/fonts/Inter/static/Inter-Regular.ttf") }}');
            font-weight: 400;
            font-style: normal;
        }

        @font-face {
            font-family: 'Inter';
            src: url('{{ asset("frontend/v3/assets/fonts/Inter/static/Inter-Medium.ttf") }}');
            font-weight: 500;
            font-style: normal;
        }

        @font-face {
            font-family: 'Inter';
            src: url('{{ asset("frontend/v3/assets/fonts/Inter/static/Inter-SemiBold.ttf") }}');
            font-weight: 600;
            font-style: normal;
        }

        @font-face {
            font-family: 'Inter';
            src: url('{{ asset("frontend/v3/assets/fonts/Inter/static/Inter-Bold.ttf") }}');
            font-weight: 700;
            font-style: normal;
        }

        @font-face {
            font-family: 'Inter';
            src: url('{{ asset("frontend/v3/assets/fonts/Inter/static/Inter-ExtraBold.ttf") }}');
            font-weight: 800;
            font-style: normal;
        }

        @font-face {
            font-family: 'Inter';
            src: url('{{ asset("frontend/v3/assets/fonts/Inter/static/Inter-Black.ttf") }}');
            font-weight: 900;
            font-style: normal;
        }
    </style>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            font-size: 0.875rem;
            background-color: var(--color-3);
        }

        .topNews-icon {
            width: 9px;
            height: 9px;
            background-color: red;

        }

        .topNews-icon img {
            fill: #ff7575;
            height: 20px;
            width: 40px;
        }

        * {
            overflow-wrap: anywhere;
        }

        #topNubex {
            position: fixed;
            right: 45px;
            bottom: 45px;
        }


        .video-page-container .video-page-content {
            display: flex;

        }

        .video-page-content .video-content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .video-stud-block {
            max-width: 416px;
        }


        .page_wrapper {
            min-height: 100vh;
        }

        /*
        img {
            image-rendering: pixelated;
        }
        */
        /*
        a:not(.cm-button) {
            transition-duration: .5s;
            transition-property: filter, opacity;
        }
        a:hover:not(.cm-button) {
            filter: blur(0.5px);
            opacity: 0.75;
        }
        */
        /* links ___ */
        a {
            transition-duration: .5s;
            transition-property: filter, opacity;
        }

        a:hover {
            filter: blur(0.5px);
            opacity: 0.75;
        }

        .cm-button,
        [type=button].cm-button, [type=reset].cm-button, [type=submit].cm-button, button.cm-button {
            display: inline-flex;
            padding: calc(0.5rem - 1px) calc(1rem - 1px);
            color: var(--color-2);
            background-color: var(--color-5);
            border: 1px solid var(--color-5);
            transition-duration: 0.35s;
            transition-property: background, color;
            cursor: pointer;
            font-weight: 600;
        }

        .cm-button-sm,
        [type=button].cm-button-sm, [type=reset].cm-button-sm, [type=submit].cm-button-sm, button.cm-button-sm {
            padding: calc(0.25rem - 1px) calc(0.5rem - 1px);
        }

        .cm-button.active, .cm-button:hover {
            color: var(--color-1);
            background-color: var(--color-7);
            border: 1px solid var(--color-7);
        }

        .cm-button.active:hover {
            color: var(--color-2);
            background-color: var(--color-5);
            border: 1px solid var(--color-7);
        }

        .cm-button:hover {
            filter: blur(0.5px);
            opacity: 0.75;
        }

        .cm-button-7,
        [type=button].cm-button-7, [type=reset].cm-button-7, [type=submit].cm-button-7, button.cm-button-7 {
            color: var(--color-2);
            background-color: var(--color-1);
            border: 1px solid var(--color-1);
        }

        .cm-button-7.active, .cm-button-7:hover {
            color: var(--color-1);
            background-color: var(--color-7);
        }

        .cm-button-1,
        [type=button].cm-button-1, [type=reset].cm-button-1, [type=submit].cm-button-1, button.cm-button-1 {
            color: var(--color-7);
            background-color: var(--color-1);
            border: 1px solid var(--color-1);
        }

        .cm-button-1.active, .cm-button-1:hover {
            color: var(--color-1);
            background-color: var(--color-7);
        }

        /* ___ links */
        /* checkbox ___ */
        .cm-checkbox {
            position: absolute;
            z-index: -1;
            opacity: 0;
        }

        .cm-checkbox + label {
            display: inline-flex;
            align-items: center;
            user-select: none;
        }

        .cm-checkbox + label::before {
            content: '';
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
            flex-shrink: 0;
            flex-grow: 0;
            border: 1px solid #adb5bd;
            border-radius: 0.25rem;
            margin-right: 0.5rem;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 50% 50%;
        }

        .cm-checkbox:checked + label::before {
            border-color: #0b76ef;
            background-color: #0b76ef;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
        }

        .cm-checkbox:not(:disabled):not(:checked) + label:hover::before {
            border-color: #b3d7ff;
        }

        .cm-checkbox:not(:disabled):active + label::before {
            background-color: #b3d7ff;
            border-color: #b3d7ff;
        }

        .cm-checkbox:focus + label::before {
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .cm-checkbox:focus:not(:checked) + label::before {
            border-color: #80bdff;
        }

        .cm-checkbox:disabled + label::before {
            background-color: #e9ecef;
        }

        /* ___ end checkbox */
        /* radio ___ */
        .cm-radio {
            position: absolute;
            z-index: -1;
            opacity: 0;
        }

        .cm-radio + label {
            display: inline-flex;
            align-items: center;
            user-select: none;
        }

        .cm-radio + label::before {
            content: '';
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
            flex-shrink: 0;
            flex-grow: 0;
            border: 1px solid #adb5bd;
            border-radius: 50%;
            margin-right: 0.5em;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 50% 50%;
        }

        .cm-radio:not(:disabled):not(:checked) + label:hover::before {
            border-color: #b3d7ff;
        }

        .cm-radio:not(:disabled):active + label::before {
            background-color: #b3d7ff;
            border-color: #b3d7ff;
        }

        .cm-radio:focus + label::before {
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .cm-radio:focus:not(:checked) + label::before {
            border-color: #80bdff;
        }

        .cm-radio:checked + label::before {
            border-color: #0b76ef;
            background-color: #0b76ef;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
        }

        .cm-radio:disabled + label::before {
            background-color: #e9ecef;
        }

        /* ___ end radio */
        /* subscribe style 2 ___ */
        .subscribe2-image {
            top: -3.25rem;
            right: 4rem;
        }

        /* ___ end subscribe style 2 */


        /* tailwind custom ___ */

        /* ___ end tailwind custom */
        /* modals ___ */
        .nav-modal-overlay {
            background: rgb(0 0 0 / 50%);
        }

        .video-modal-overlay {
            background: rgb(0 0 0 / 50%);
        }

        /* ___ end modals */
        .cm-bd-gradient-1 {
            background-image: linear-gradient(to bottom, transparent, rgb(0 0 0 / 75%));
        }

        .cm-bd-gradient-7 {
            background-image: linear-gradient(to bottom, transparent, #006633);
        }

        .menu-input form {
            display: none;
        }


        @media (min-width: 640px) and (max-width: 768px) {
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(4),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(5),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(6),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(7),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(8),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(9),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(10),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(11) {
                display: none;
            }

            .nav-modal {
                max-width: 77.5px;
            }


        }

        @media (min-width: 768px) and (max-width: 1024px) {
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(6),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(7),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(8),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(9),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(10),
            .cm-pagination-desktop .cm-pagination-links > a:nth-child(11) {
                display: none;
            }

            .menu-input form {
                display: none;
            }


        }

        /* single page ___ */
        /*
        .cm-content-media,
        .cm-single-description > img,
        .cm-single-description > video {
            margin-left: -1.25rem;
            margin-right: -1.25rem;
        }
        .cm-content-media .w-full {
        }
        .cm-single-description > img,
        .cm-single-description > video {
            max-width: calc(100% + 2.5rem);
        }
        */
        .cm-single-description > *:not(:last-child) {
            margin-bottom: 1rem;
        }

        /* ___ end single page */

        select:not([multiple]) {
            font: inherit;
            letter-spacing: inherit;
            word-spacing: inherit;
            background: var(--color-1);
            padding: 0.5rem 0.75rem;
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            padding-right: 0.1rem;
            background-repeat: no-repeat;
            background-position: calc(100% - 0.25em) 0.35em;
        }

        select::-ms-expand {
            display: none;
        }

        .invalid-feedback {
            color: red;
        }

        .cm-home-page .cm-news_sidebar-wrapper,
        .cm-home-page .cm-news_sidebar {
            height: 100%;
        }

        @media (min-width: 1280px) {
            .cm-home-page .cm-news_sidebar-wrapper,
            .cm-home-page .cm-news_sidebar {
                height: calc(100% - 21px);
            }

            .single-text-center {
                padding-left: 1.75rem;
                padding-right: 1.75rem;
            }
        }

        @media (max-width: 480px) {
            .menu-input form {
                display: flex;
            }

            .topNews-icon {
                width: 9px;
                height: 9px;
                background-color: red;

            }

            .cm-single-page.grid.grid-cols-10.gap-5 {
                display: flex;
                flex-direction: column-reverse;
            }

            .single-text-center {
                padding-left: unset;
                padding-right: unset;
            }
        }

        .search-form {
            display: none;
        }

        .cm-article-subtitle {
            font-size: 14px;
        }

        .document-text p {
            margin-bottom: 20px;
        }

        .doc-item {
            margin-bottom: 10px;
        }


        .cm-article-date {
            color: #939292;
        }

        .show-form {
            display: flex;
        }

        .show-form form {
            display: flex;
            align-items: center;
        }

        .search-form form input {
            width: 450px;
            height: 40px;
            left: 1165px;
            top: 24px;
            border: 2px solid #E9E9E9;
            display: flex;
            align-items: center;
            outline: none;
            padding: 10px;
        }

        .search-form form button {
            position: relative;
            display: flex;
            align-items: center;
            background-color: #FFFFFF;
            border: none;
            margin-bottom: 5px;

            height: 15px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 15px;
            color: #000000;
            right: 60px;
        }

        .js--open-search {
            background-image: url("{{ asset('images/search.svg') }}")
        }

        button.js--open-search.hidden.md\:block {
            width: 22px;
            height: 23px;
        }

        .cm-single-description {
            font-size: 13px;
        }

        .cm-single-description h6 {
            font-size: 12px;
            font-weight: 600;
        }

        .photo-author {
            color: #CFCFCF;
            font-weight: 500;
            font-size: 13px;
        }

        .photo-description {
            font-size: 13px;
            line-height: 20px;
        }

        .salon-person-avatar {
            height: 518px;
            width: 368px;
            margin-bottom: 20px;
        }

        .salon-person-avatar img {
            height: 100%;
            width: 100%;
            object-fit: cover;

        }

        .person-items {
            display: flex;
            width: 368px;
            flex-wrap: wrap;
            height: auto;
            flex-direction: row;
            cursor: pointer;
        }

        .person-items a {
            max-width: 174px;
            margin-bottom: 20px;
        }

        .person-items a:nth-child(odd) {
            margin-right: 20px;
        }

        .lit-item {
            display: flex;
            flex-direction: column;
            width: 174px;
            height: 224px;
            flex-shrink: 0;
            margin-bottom: 20px;
            min-height: 274px;
        }

        .lit-item img {
            height: 100%;
            object-fit: cover;
        }


        .lit-item-text {
            background-color: #fff;
            height: 50px;
            justify-content: space-between;
            padding: 10px;
        }


        .salon-person-text {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            max-height: 277px;
            padding: 30px;
        }

        .salon-person-text h3 {
            font-weight: 700;
            font-size: 30px;
            color: #000000;
            margin-bottom: 20px;
        }

        .salon-person-text p {
            max-width: 849px;
            color: #000;
            font-size: 13px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        .salon-person-text span {
            color: #006633;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

        }

        .salon-person-text .person-years {
            margin-top: 40px;
        }


        .person-bio-awards {
            margin-left: 20px;
            margin-top: 40px;
            flex-direction: row;
        }

        .biography {
            max-width: 658px;
            margin-right: 20px;
        }

        .biography div {
            background-color: #fff;
            padding: 20px;
        }

        .biography div p {
            margin-bottom: 20px;
            font-size: 13px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        .biography h3 {
            color: #006633;
            font-size: 20px;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
            margin-bottom: 20px;
        }

        .person-awards {
            display: flex;
            flex-direction: column;
        }

        .person-awards .lit-item {
            margin-bottom: 20px;
            cursor: pointer;
        }


        .person-awards h3 {
            color: #006633;
            font-size: 20px;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
            margin-bottom: 20px;
        }

        .about-сreativity-text {
            margin-left: 20px;
            max-width: 848px;
            margin-top: 20px;
        }

        .about-сreativity-text h3 {
            margin-bottom: 20px;
            font-size: 20px;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
            color: #006633;
        }

        .about-сreativity {
            background-color: #fff;
            padding: 20px;
        }

        .about-сreativity p {
            margin-bottom: 20px;
            color: #000;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        .awards .lit-item-text {
            height: auto;
            flex-wrap: wrap;
        }

        .awards .lit-item-text h4 {
            color: #000;
            font-size: 15px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        .awards .lit-item-text span {
            text-align: right;
            color: #006633;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-left: 90px;
        }

        .archive-title {
            color: #CFCFCF;
        }

        .generation-title {
            color: #006633;
            font-size: 20px;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
        }

        .work-text {
            max-width: unset;
            margin-right: unset;
        }

        .single-salon-content {
            flex-direction: row;
        }

        .mobile-show-page {
            display: none;
        }

        @media (max-width: 768px) {
            .anons-news:nth-last-child(-n+2) {
                display: none;
            }

            .video-article-none:last-child {
                display: none;
            }

            .salon-person-avatar {
                width: 308px;
            }

            .person-items {
                width: 308px;
            }

            .salon-person-text {
                max-height: unset;
            }

            .salon-work-bio {
                flex-direction: column !important;
            }

            .lit-home-item:last-child {
                display: none;
            }

            .lit-item {
                width: 144px;

            }

            .biography {
                margin-right: unset;
            }

            .person-bio-awards {
                flex-direction: column;
            }

            .awards {
                display: flex;
                flex-wrap: wrap;
            }
        }


        @media (max-width: 480px) {
            .mobile-journalism {
                display: none !important;
            }

            .mobile-show-page {
                display: block;
            }

            .mobile-hide-page {
                display: none;
            }


            .single-salon-content {
                flex-direction: column;
            }

            .salon-person-avatar {
                width: 100%;
            }

            .salon-person-text {
                max-height: unset;
            }

            .person-bio-awards {
                flex-direction: column;
                margin-left: unset;
            }

            .biography {
                margin-right: unset;
            }

            .awards {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 20px;
            }

            .lit-item-text {
                margin-bottom: 10px;
            }

            .about-сreativity-text {
                margin-left: unset;
                margin-top: 20px;
            }

            .person-awards {
                margin-top: 20px;
            }


            .cm-news_sidebar .play-icon {
                height: 75px;
                width: 80px;
                max-width: unset;
                margin-top: 50px;
            }

            .topNews-icon {
                width: 11px;
                height: 11px;
                background-color: red;

            }


        }

        .img-material-height {
            height: 450px;
        }

        .img-material-height img {
            height: 100%;
            width: 100%;
        }

        .cm-single-description a {
            color: #006633;
            text-decoration: underline;
        }


        .slides-container {
            -ms-overflow-style: none; /* Internet Explorer 10+ */
            scrollbar-width: none; /* Firefox */
            height: 550px;
        }

        .slides-container::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
        }

        .reportage-slide-item {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }


        .news-single .play-icon-link {
            display: none;
        }


        .desktop_cik {
            height: 110px;
            display: none;
        }

        .desktop_cik_mobile {
            display: none;
        }

        @media (max-width: 480px) {

            .desktop_cik {
                display: none;
            }

            .desktop_cik_mobile {
                display: none;
                height: 110px;
            }

            .post-expert-section {
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .expert-img {
                min-width: unset;
                width: 120px;

            }

            .comment-body {
                margin-top: 10px;
                padding-left: unset !important;
            }
        }

        .post-expert-section {
            border-bottom: 1px solid #E9E9E9;
            border-top: 1px solid #E9E9E9;
            padding: 25px;
            margin-bottom: 25px;
        }


        .expert-img {
            min-width: 110px;
            height: 145px;
        }

        .expert-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .expert-info p:first-child {
            font-size: 20px;
            font-weight: 600;
        }

        .expert-info p:last-child {
            font-size: 14px;
            font-weight: 400;
            color: #bababa;
        }

        .comment-body {
            padding-left: 45px;
        }

        .comment {
            margin-top: 15px;
        }

        .comment p {
            max-width: 600px;
        }

    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
<div class="page_wrapper flex flex-col">


    <div class="header_wrapper desktop_cik bg-1">

        <header class="flex flex-row justify-between items-start md:items-center gap-5 max-w-7xl mx-auto p-5">
            <img src="{{asset('frontend/img/banner_cik.png')}}" alt="">
        </header>

    </div>

    <div class="header_wrapper desktop_cik_mobile bg-1">

        <header class="flex flex-row justify-between items-start md:items-center gap-5 max-w-7xl mx-auto p-5">
            <img src="{{asset('frontend/img/baneer_cik_mobile.png')}}" alt="">
        </header>

    </div>
    <!-- header -->
    <div class="header_wrapper bg-1" itemscope itemtype="http://schema.org/WPHeader">
        <header class="flex flex-row justify-between items-start md:items-center gap-5 max-w-7xl mx-auto p-5">
            <div class="header-left flex flex-wrap flex-1 items-center gap-2.5 md:gap-5">
                <div class="header-logo flex items-center" itemscope itemtype="http://schema.org/ImageObject">
                    <a href="{{route('home')}}">
                        <img src="{{ asset('frontend/v3/assets/media/base-v2/logo.svg') }}">
                        <meta itemprop="name" content="Общенациональная газета Республики Ингушетия">
                    </a>
                </div>
                <div
                    class="header-lead flex flex-col self-start text-sm md:text-base font-semibold md:font-bold gap-2 color-5">
                    <h1 class="leading-none" class="leading-none"
                        itemprop="headline">{{ __('Общенациональная газета') }} <br> {{ __('Республики Ингушетия') }}
                    </h1>
                </div>
            </div>
            <div class="header-right flex flex-col sm:flex-row items-end sm:items-center gap-5">
                <div class="header-right-item hidden lg:flex items-center">
                    <nav class="header-nav" itemscope itemtype="http://schema.org/SiteNavigationElement">
                        <ul class="flex items-center font-semibold gap-2.5">
                            <li><a href="{{ route('posts-index') }}" itemprop="url">{{ __('Новости') }}</a></li>
                            <li><a href="{{ route('materials-index') }}" itemprop="url">{{ __('Статьи') }}</a></li>
                            <li><a href="{{ route('journalism-index') }}" itemprop="url">{{ __('Публицистика') }}</a>
                            </li>

                        </ul>
                    </nav>
                </div>
                <div
                    class="header-right-item lang-buttons flex flex-col sm:flex-row order-2 sm:order-2 items-center gap-2.5">
                    <a
                        href="@if(App::getLocale() !== 'ru') {{ route('change-language', 'ru') }} @else # @endif"
                        class="cm-button cm-button-sm @if(App::getLocale() === 'ru') active @endif"
                    >{{ __('Рус') }}</a>
                    <a
                        href="@if(App::getLocale() !== 'inh') {{ route('change-language', 'inh') }} @else # @endif"
                        class="cm-button cm-button-sm @if(App::getLocale() === 'inh') active @endif"
                    >{{ __('Инг') }}</a>
                </div>
                <div class="header-right-item flex order-1 sm:order-3 items-center gap-2.5">

                    <div class="search-form" itemscope itemtype="http://schema.org/SearchAction">
                        <form action="{{ route('search-index') }}">
                            <meta itemprop="target" content="{{ route('search-index') }}?search={search}">

                            <input itemprop="query-input" type="text" placeholder="Поиск по сайту" name="search"
                                   value="{{ request()->search ?? '' }}">
                            <button>Найти<img src="{{asset('images/strelka.svg')}}" alt=""></button>
                        </form>
                    </div>

                    <button class="js--open-search hidden md:block" id="js--open-search">

                    </button>
                    <a href="#nav-burger" class="js--open-nav">
                        <img src="{{ asset('frontend/v3/assets/media/base-v2/burger-icon.svg') }}" alt="serdalo-menu">
                    </a>
                </div>
            </div>
        </header>
    </div>
    <!-- page content-->
    <div class="content_wrapper grow">
        <main class="max-w-7xl mx-auto py-5 px-1.5 sm:px-5">
            @if (session('status'))
                <div style="color: green;">{{ session('status') }}</div>
            @endif
            @if($errors->any())
                <ul style="color: red;">
                    @foreach($errors->all() as $error)
                        <li>{{$error}}</li>
                    @endforeach
                </ul>
            @endif
            @yield('content')
        </main>
    </div>
    <!-- footer -->
    <div class="footer_wrapper bg-1">
        <footer class="">
            <div class="footer-top_wrapper bg-6">
                <div class="footer-top flex flex-col gap-5  py-5">
                    <div class="border-b border-color-8">
                        <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-5 justify-between pb-5 px-5">
                            <div>
                                <nav class="footer-nav flex flex-col gap-2.5 color-7 text-lg font-bold">
                                    <a href="{{route('about')}}">{{ __('Об издании') }}</a>
                                    <a href="{{route('material-rules')}}">{{ __('Правила использования материалов') }}</a>
                                    <a href="{{route('personal')}}">{{ __('Согласие на обработку персональных данных') }}</a>
                                </nav>
                            </div>
                            <div class="footer-social flex flex-row gap-5">
                                <a href="https://t.me/gserdalo"
                                   class="flex justify-center items-center w-10 h-10 bg-7 rounded-full" target="_blank">
                                    <img class="p-2.5 w-full h-full"
                                         src="{{ asset('frontend/v3/assets/media/base-v2/tg.svg') }}"
                                         alt="{{ __('Телеграм Сердало') }}">
                                </a>
                                <a href="https://vk.com/gserdalo"
                                   class="flex justify-center items-center w-10 h-10 bg-7 rounded-full" target="_blank">
                                    <img class="p-2.5 w-full h-full"
                                         src="{{ asset('frontend/v3/assets/media/base-v2/vk.svg') }}"
                                         alt="{{ __('Вконтакте Сердало') }}">
                                </a>
                                <a href="https://dzen.ru/id/61769dfd86f2571800496487"
                                   class="flex justify-center items-center w-10 h-10 bg-7 rounded-full" target="_blank">
                                    <img class="p-2.5 w-full h-full"
                                         src="{{ asset('frontend/v3/assets/media/base-v2/dzen.svg') }}"
                                         alt="{{ __('Яндекс Дзен Сердало') }}">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="max-w-7xl mx-auto px-5 flex flex-col md:flex-row gap-5 justify-between">
                            <div class="order-2 md:order-1 flex flex-col gap-5">
                                <div class="font-medium">
                                    <p>
                                        {{ __('Главный редактор: Курскиева Х.А.') }}
                                        <br>
                                        {{ __('386101, Республика Ингушетия, г. Назрань, тер. Центральный округ, пр. И. Базоркина, д. 60.') }}
                                    </p>
                                </div>
                                <div>
                                    <p><b><a href="8 (8734) 77-10-85">8 (8734) 77-10-85</a></b></p>
                                    <a href="info@serdalo.ru" class="color-7">{{ __('E-mail') }}: info@serdalo.ru</a>
                                </div>
                            </div>
                            <div class="order-1 md:order-2">
                                <div class="footer-logo flex flex-col justify-end h-full gap-2.5">
                                    <div class="flex md:justify-end">
                                        <div class="flex justify-center items-center w-7 h-7 rounded-full bg-5 ">
                                            <img class="p-1 w-full h-full"
                                                 src="{{ asset('frontend/v3/assets/media/base-v2/12+.svg') }}"
                                                 alt="12+">
                                        </div>
                                    </div>
                                    <div>
                                        <a href="{{route('home')}}">
                                            <img src="{{ asset('frontend/v3/assets/media/base-v2/footer-logo.svg') }}"
                                                 alt="Сердало логотип">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom_wrapper bg-1">
                <div class="footer-bottom max-w-7xl mx-auto p-5 color-9">
                    <div class="w-2/3 flex flex-col gap-5">
                        <p>
                            {{ __('Сетевое издание «Сердало» зарегистрировано Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций (Роскомнадзор).') }}
                        </p>
                        <p>
                            Реестровая запись СМИ: ЭЛ № ФС 77-78323 от 15.05.2020 г. Учредитель: Государственное
                            автономное учреждение Республики Ингушетия «Общенациональная газета «Сердало»
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>
<!-- modal-nav -->
<div class="nav-modal-overlay js--nav-modal-overlay hidden fixed top-0 left-0 w-full h-full overflow-auto">
    <div class="nav-modal js--nav-modal mx-auto flex justify-end pointer-events-none max-w-7xl">
        <div class="nav-modal-content md:basis-1/2 max-h-full p-5 bg-1 pointer-events-auto sm:m-5">
            <div class="flex w-full mb-10">
                <div class="menu-input" style="width: 100%">
                    <form method="get" action="{{ route('search-index') }}"
                          class="basis-10/12 flex w-full h-10 justify-between border-2 border-color-3">
                        <input class="flex-1 w-full py-2 px-4 m-0.5" name="search" type="text"
                               placeholder="{{ __('Поиск по сайту') }}" value="{{ request()->search ?? '' }}">
                        <button class="cm-button cm-button-7 flex gap-1 items-center bg-1 color-2" type="submit">
                            {{ __('Поиск') }} <img class="h-3/4"
                                                   src="{{ asset('frontend/v3/assets/media/base-v2/strelka.svg') }}"
                                                   alt="Поиск стрелка Сердало">
                        </button>
                    </form>
                </div>

                <div class="basis-2/12 flex w-full justify-end">
                    <a href="#search" class="js--close-nav flex justify-center items-center px-2.5">
                        <img src="{{ asset('frontend/v3/assets/media/base-v2/burger-close.svg') }}" alt="Закрыть">
                    </a>
                </div>
            </div>

            <div class="xl:pl-16">
                <div class="mb-2.5">
                    <nav class="modal-nav mb-5">
                        <ul class="columns-2 font-semibold">
                            <li class="mb-1.5 mobile-show-page"><a
                                    href="{{ route('posts-index') }}">{{ __('Новости') }}</a></li>
                            <li class="mb-1.5 mobile-show-page"><a
                                    href="{{ route('materials-index') }}">{{ __('Статьи') }}</a></li>
                            <li class="mb-1.5 mobile-show-page mobile-journalism"><a
                                    href="{{ route('journalism-index') }}">{{ __('Публицистика') }}</a></li>
                            @foreach($categories ?? [] as $category)
                                @if($category->title !== 'Пресс-релизы' && $category->title !== 'Публицистика')
                                    <li class="mb-1.5">
                                        <a href="{{ route('materials-index', $category->id) }}">
                                            @if(App::getLocale() !== 'ru')
                                                {{$category->tag_translate}}
                                            @else
                                                {{$category->title}}
                                            @endif
                                        </a>
                                    </li>
                                @endif
                            @endforeach
                            <li class="mb-1.5">
                                <a href="{{route('releases-index')}}">
                                    @if(App::getLocale() !== 'ru')
                                        Пресс-релизаш
                                    @else
                                        Пресс-релизы
                                    @endif
                                </a>
                            </li>
                            <li class="mb-1.5">
                                <a href="{{route('journalism-index')}}">
                                    {{ __('Публицистика') }}
                                </a>
                            </li>

                            @if(auth())
                                <li class="mb-1.5">
                                    <a href="{{route('games')}}">
                                        Игровой раздел
                                    </a>
                                </li>
                            @endif
                        </ul>
                    </nav>
                </div>
                <div class="">
                    <nav class="modal-footer-nav mb-5 color-4">
                        <ul class="">
                            <li class="mb-1.5 mobile-hide-page"><a
                                    href="{{ route('posts-index') }}">{{ __('Новости') }}</a></li>
                            <li class="mb-1.5 mobile-hide-page"><a
                                    href="{{ route('materials-index') }}">{{ __('Статьи') }}</a></li>
                            <li class="mb-1.5"><a href="{{ route('documents-index') }}">{{ __('Документы') }}</a></li>
                            <li class="mb-1.5"><a href="{{route('videostudio')}}">{{ __('Видеостудия Сердало') }}</a>
                            </li>
                            <li class="mb-1.5"><a href="{{route('litSalon')}}">{{ __('Литературный салон') }}</a></li>
                            <li class="mb-1.5"><a href="#">{{ __('Музей') }}</a></li>
                            <li class="mb-1.5"><a href="{{route('dictionary')}}">{{ __('Словарь') }}</a></li>
                        </ul>
                    </nav>
                    <nav class="modal-footer-nav mb-5 color-4">
                        <ul class="">
                            <li class="mb-1.5"><a href="{{route('archive-index')}}">{{ __('Архив газеты') }}</a></li>
                            {{--                                    <li class="mb-1.5"><a href="{{route('subscribe-store')}}">{{ __('Подписка') }}</a></li>--}}
                        </ul>
                    </nav>
                    <nav class="modal-footer-nav color-4">
                        <ul class="">
                            <li class="mb-1.5"><a href="{{route('about')}}">{{ __('Об издании') }}</a></li>
                            <li class="mb-1.5"><a href="#">{{ __('Контакты') }}</a></li>
                            <!--<li class="mb-1.5"><a href="{{ route('change-version', 'v1') }}">v1</a></li>-->
                            <!--<li class="mb-1.5"><a style="background: green" href="#">v3</a></li>-->
                            @guest
                                <li class="mb-1.5"><a href="{{ route('login-page') }}">{{ __('Вход') }}</a></li>
                                <li class="mb-1.5"><a href="{{ route('register-page') }}">{{ __('Регистрация') }}</a>
                                </li>
                            @else
                                <li class="mb-1.5"><a href="#">{{ Auth::user()->name }}</a></li>
                                <li class="mb-1.5">
                                    <a href="#"
                                       onclick="event.preventDefault();document.getElementById('logout-form').submit();">{{ __('Выйти') }}</a>
                                    <form id="logout-form" action="{{ route('logout-frontend') }}" method="POST"
                                          style="display: none;">
                                        @csrf
                                    </form>
                                </li>
                            @endguest
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- modal-video -->
<div
    class="video-modal-overlay js--video-modal-overlay hidden fixed top-0 left-0 w-full h-full max-h-screen overflow-auto">
    <div
        class="video-modal js--video-modal h-full sm:max-w-7xl mx-auto flex justify-center items-center pointer-events-none">
        <div
            class="video-modal-content js--video-modal-content md:basis-1/2 max-h-full sm:m-5 py-5 px-1.5 sm:px-5 bg-1 pointer-events-auto">
            <div class="flex w-full js--video-content-head">
                <div
                    class="basis-10/12 flex w-full justify-between items-center color-7 font-semibold js--video-title-container"></div>
                <div class="basis-2/12 flex w-full h-10 justify-end">
                    <a href="#" class="flex justify-center items-center px-2.5 bg-3 js--close-video-modal">
                        <img src="{{ asset('frontend/v3/assets/media/base-v2/burger-close.svg') }}" alt="Закрыть">
                    </a>
                </div>
            </div>
            <div class="js--video-content-container"></div>
        </div>
    </div>
</div>

<div id="topNubex"><img src="{{asset('images/uparrowbutton_87886.svg')}}" width="30px" height="30px" alt="Вверх"/></div>

<script src="{{asset('frontend/v3/assets/js/game.js')}}"></script>
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script type="text/javascript">

    (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
        };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
                return;
            }
        }
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(76637436, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });

    <!-- /Yandex.Metrika counter -->

    const searchBtn = document.querySelector('.js--open-search '),
        searchInput = document.querySelector('.search-form'),
        headerMenu = document.querySelector('.header-nav'),
        langButtons = document.querySelector('.lang-buttons'),
        navSearchInput = document.querySelector('.js--open-nav')


    searchBtn.addEventListener("click", () => {


        searchInput.classList.toggle("show-form");

        if (searchInput.classList.contains("show-form")) {
            headerMenu.style.display = "none";
            langButtons.style.display = "none";

            searchBtn.style.background = "url('images/close.svg') no-repeat center";


        } else {
            headerMenu.style.display = "block";
            langButtons.style.display = "block";

            searchBtn.style.backgroundImage = "url('images/search.svg')";
        }

    });

    $(document).ready(function (e) {

        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() != 0) {
                    $('#topNubex').fadeIn();
                } else {
                    $('#topNubex').fadeOut();
                }
            });
            $('#topNubex').click(function () {
                $('body,html').animate({scrollTop: 0}, 700);
            });
        });

        function cm_sidebar_height() {
            if ($(window).width() >= 640 && $('.cm-home-page').length && $('.cm-home-page-right-col').length) {
                var padding = parseInt($('.cm-news_sidebar-wrapper').css('padding-bottom'));
                if (($('.cm-news_sidebar-wrapper').outerHeight(true) + padding) > $('.cm-home-page-right-col').outerHeight(true)) {
                    $('.cm-news_sidebar-wrapper').find('.cm-news_sidebar-item:not(.hidden)').last().addClass('hidden');
                    cm_sidebar_height();
                }
            }
        }

        cm_sidebar_height();
        $(window).on('resize', function (e) {
            cm_sidebar_height();
        });

        function cm_open_modal($modal) {
            $('body').addClass('overflow-auto');
            $modal.removeClass('hidden');
        }

        function cm_close_modal($modal) {
            $('body').removeClass('overflow-auto');
            $modal.addClass('hidden');
        }

        $('.js--open-nav').on('click', function (e) {
            e.preventDefault();
            cm_open_modal($('.js--nav-modal-overlay'));

        });
        $('.js--close-nav').on('click', function (e) {
            e.preventDefault();
            cm_close_modal($('.js--nav-modal-overlay'));
        });
        $('.js--nav-modal-overlay').on('click', function (e) {
            if ($(e.target).is($(this))) {
                e.preventDefault();
                cm_close_modal($('.js--nav-modal-overlay'));
            }
        });
        $('.js--subscribe-form').on('submit', function (e) {
            e.preventDefault();

            var $form = $(this);

        });
        $('.js--open-video-modal').on('click', function (e) {
            e.preventDefault();
            var link = $(this).attr('data-link');
            var src = $(this).attr('data-src');
            var title = $(this).attr('data-title');
            var $content = $('.js--video-modal-content');

            $('.js--video-title-container').empty();
            if (link) {
                $('.js--video-title-container').append('<a href="' + link + '">' + title + '</a>');
            } else {
                $('.js--video-title-container').text(title);
            }
            $('.js--video-content-container').empty();
            $('.js--video-content-container').append(
                '<video '
                + 'class="w-full " '
                + 'controls="" '
                + 'autoplay="" '
                + 'name="media">'
                + '<source '
                + 'src="' + src + '" '
                + 'type="video/mp4">'
                + '</video>'
            );

            cm_open_modal($('.js--video-modal-overlay'));
            var window_h = $(window).height();
            var container_h = $content.outerHeight(true);
            var container_pt = parseInt($content.css('padding-top'));
            var container_pb = parseInt($content.css('padding-bottom'));
            var head_h = $('.js--video-content-head').outerHeight(true);
            var max_video_h = +window_h - +head_h - +container_pt - +container_pb;
            if (max_video_h && max_video_h > 0) {
                $('.js--video-content-container').find('video').css({'max-height': max_video_h});
            }
        });
        $('.js--close-video-modal').on('click', function (e) {
            e.preventDefault();
            cm_close_modal($('.js--video-modal-overlay'));
            $('.js--video-modal-overlay').addClass('hidden');
            $('.js--video-title-container').text('');
            $('.js--video-content-container').empty();
        });
        $('.js--video-modal-overlay').on('click', function (e) {
            if ($(e.target).is($(this))) {
                e.preventDefault();
                cm_close_modal($('.js--video-modal-overlay'));
                $('.js--video-modal-overlay').addClass('hidden');
                $('.js--video-title-container').text('');
                $('.js--video-content-container').empty();
            }
        });
    });

    const slidesContainer = document.querySelector(".slides-container");
    const slideWidth = slidesContainer.querySelector(".slide").clientWidth;
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    nextButton.addEventListener("click", () => {
        slidesContainer.scrollLeft += slideWidth;
    });

    prevButton.addEventListener("click", () => {
        slidesContainer.scrollLeft -= slideWidth;
    });
</script>
</body>
</html>

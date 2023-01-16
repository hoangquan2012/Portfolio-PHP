<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@400;500;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet preload" href="{{ asset('plugins/bootstrap-5.1/css/bootstrap.min.css') }}">
    <link rel="stylesheet preload" href="{{ asset('scss/20221206/portfolio.css') }}">
    <link rel="stylesheet preload" href="{{ asset('scss/20221206/portfolio/content.css') }}">
    @yield('css')
    <title>My profile</title>
</head>

<body>
    <div class="page">
        <div class="page-sider">
            @include('20221206.layout._sider')
        </div>
        <div class="page-body">
            @yield('view')
        </div>

    </div>


    <script src="{{ asset('plugins/jquery-3.5.1/jquery-3.5.1.min.js') }}"></script>
    <script src="{{ asset('plugins/bootstrap-5.1/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('js/20221206/portfolio/index.js') }}"></script>
    <script src="{{ asset('plugins/jszip-utils/jszip-utils.min.js') }}"></script>
	<script src="{{ asset('plugins/jszip/jszip.min.js') }}"></script>
    <script src="{{ asset('js/zayeki.js') }}"></script>
    <script src="{{ asset('js/function.js') }}"></script>
    @yield('js')
</body>

</html>

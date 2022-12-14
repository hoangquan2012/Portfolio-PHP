<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
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
</body>

</html>

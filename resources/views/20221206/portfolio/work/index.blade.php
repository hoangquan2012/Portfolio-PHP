@extends('20221206.layout.portfolio')
@section('title')
    My project
@endsection
@section('view')
    <div class="content">
        <div class="content-header">
            <h1 class='title-work'>
                Project board
            </h1>
            
        </div>
        <div class="content-body">

        </div>
    </div>
@endsection

@section('css')
    <link rel="stylesheet" href="{{ asset('scss/20221206/portfolio/page/work.css') }}">
@endsection

@section('js')
    <script src="{{ asset('js/20221206/work/index.js') }}"></script>
@endsection

@extends('20221206.layout.portfolio')
@section('title')
    Load
@endsection
@section('view')
    <div class="container">
        <div class="loading">
            <div class="loading-header">
                <img class="loading-avatar" src="/img/quan.png" alt="avatar">
                <div>
                    <label for="" class="loading-text">Loading</label>

                    <img src="/img/giphy.gif" alt="" class="loading-gif">

                </div>
            </div>
            <div class="loading-body">
                <div class="progress loading-progress">
                    <div id="dynamic" class="progress-bar progress-bar-animated progress-bar-striped active"
                        role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>
        </div>
    @endsection

    @section('css')
        <link rel="stylesheet" href="{{ asset('scss/20221206/portfolio/page/loading.css') }}">
    @endsection

    @section('js')
        <script src="{{ asset('js/zayeki.js') }}"></script>
        <script src="{{ asset('js/20221206/loading/index.js') }}"></script>
    @endsection

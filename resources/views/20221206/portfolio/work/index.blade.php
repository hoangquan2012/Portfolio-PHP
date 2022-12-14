@extends('20221206.layout.portfolio')
@section('title')
    My project
@endsection
@section('view')
    <div class="content">
        <div class="content-header">
            <div class="my-name">
                <h1>Hoang <span>Quan</span></h1>
            </div>
            <div class="address">
                <div class=''>13NO4 resettlement area trieu khuc &nbsp; <span>quanna3799@gmail.com</span> </div>
            </div>
        </div>
        <div class="content-body">
            <div class="description">
                <p>My name is Quan. I’m 23 years old and graduated rom University Of Transport
                    Technology with a degree in Information Technology Branch.

                    I’m working as a Frontend Developer in MQ Solutions company with over 1 month experience developing
                    different websites, apps and implementing them — from landing pages to big projects, mostly using
                    ReactJS. I
                    am experienced in leveraging agile frameworks to provide a robust synopsis for high level overviews.
                    Iterative approaches to corporate strategy foster collaborative thinking to further the overall value
                    proposition.

                    My goal for the next two years is to be a Senior Frontend Developer. I’m now ready for more challenges
                    and
                    this position really excites me.

                    That’s all about me</p>

            </div>
            <div class="link-profile">
                <a href="https://www.instagram.com/hquan.201/"></a>
                <a href="https://www.facebook.com/zind09/"></a>
                <a href="https://github.com/"></a>
                <a href="https://web.skype.com/"></a>
            </div>
        </div>
    </div>
@endsection

@section('css')
    <link rel="stylesheet" href="{{ asset('scss/20221206/portfolio/page/work.css') }}">
@endsection

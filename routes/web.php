<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['prefix' => '/'], function () {
    Route::get('/', function () {
        return view('20221206/portfolio/about/index');
    });
    Route::get('/work', function () {
        return view('20221206/portfolio/work/index');
    });
});


<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth', function (Request $request) {
    // to do: validate sign in and return api token
    return ['foo' => 'bar'];
});

Route::get('/photos', function (Request $request) {
    // to do: single photo result via ID
    // to do: array of photos result via search params:
        // keyword search
        // collection filter
        // date filters
        // photographer search
        // status filter
        // size filters
        // model search
    return ['foo' => 'bar'];
});

Route::middleware('auth:api')->post('/photos', function (Request $request) {
    // to do: photo update via ID(s)
    // to do: photo insert
    return ['foo' => 'bar'];
});

Route::middleware('auth:api')->get('/settings', function (Request $request) {
    // to do: get setting value by key
    return ['foo' => 'bar'];
});

Route::middleware('auth:api')->post('/settings', function (Request $request) {
    // to do: update setting value by key
    return ['foo' => 'bar'];
});

Route::middleware('auth:api')->get('/users', function (Request $request) {
    // to do: single user via ID
    // to do: list of users
    return ['foo' => 'bar'];
});

Route::middleware('auth:api')->post('/users', function (Request $request) {
    // to do: update user via ID
    // to do: insert new user
    return ['foo' => 'bar'];
});

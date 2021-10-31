<?php

use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', [\App\Http\Controllers\AuthController::class, 'user']);
    Route::get('/logout', [App\Http\Controllers\AuthController::class, 'logout']);

    Route::get('/tasks', [App\Http\Controllers\TaskController::class, 'index']);
    Route::get('/tasks/{id}', [App\Http\Controllers\TaskController::class, 'show']);
    Route::post('/tasks', [App\Http\Controllers\TaskController::class, 'store']);
    Route::delete('/tasks/{id}', [App\Http\Controllers\TaskController::class, 'destroy']);
});

Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
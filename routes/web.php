<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you can register web routes for your application.
| All of these routes are loaded by the RouteServiceProvider.
|
*/

// Main Home Page
Route::get('/', function () {
    return view('home');
});

// API-like routes for React SPA (no /api prefix) - MUST be before catch-all
// Only respond with JSON if the request accepts JSON (from fetch calls)
Route::get('/students', function() {
    if (request()->wantsJson() || request()->header('Accept') === 'application/json') {
        return app(App\Http\Controllers\StudentController::class)->index();
    }
    return view('home');
});
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);

Route::get('/teachers', function() {
    if (request()->wantsJson() || request()->header('Accept') === 'application/json') {
        return app(App\Http\Controllers\TeacherController::class)->index();
    }
    return view('home');
});
Route::post('/teachers', [TeacherController::class, 'store']);
Route::get('/teachers/{id}', [TeacherController::class, 'show']);
Route::put('/teachers/{id}', [TeacherController::class, 'update']);
Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);

// Catch-all route for React Router - MUST be last
Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');

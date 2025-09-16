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

// Function to return HTML for React SPA
function getReactApp() {
    $manifestPath = public_path('mix-manifest.json');
    $manifest = json_decode(file_get_contents($manifestPath), true);
    $jsFile = $manifest['/js/app.js'] ?? '/js/app.js';
    $cssFile = $manifest['/css/app.css'] ?? '/css/app.css';
    
    return response()->make('
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="' . csrf_token() . '">
    <title>School Management Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="' . asset($cssFile) . '" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
    <script src="' . asset($jsFile) . '"></script>
</body>
</html>
    ');
}

// Main Home Page
Route::get('/', function () {
    return getReactApp();
});

// API-like routes for React SPA (no /api prefix) - MUST be before catch-all
// Only respond with JSON if the request accepts JSON (from fetch calls)
Route::get('/students', function() {
    if (request()->wantsJson() || request()->header('Accept') === 'application/json') {
        return app(App\Http\Controllers\StudentController::class)->index();
    }
    return getReactApp();
});
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);

Route::get('/teachers', function() {
    if (request()->wantsJson() || request()->header('Accept') === 'application/json') {
        return app(App\Http\Controllers\TeacherController::class)->index();
    }
    return getReactApp();
});
Route::post('/teachers', [TeacherController::class, 'store']);
Route::get('/teachers/{id}', [TeacherController::class, 'show']);
Route::put('/teachers/{id}', [TeacherController::class, 'update']);
Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);

// Catch-all route for React Router - MUST be last
Route::get('/{any}', function () {
    return getReactApp();
})->where('any', '.*');

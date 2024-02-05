<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use App\Models\File;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $files = File::all()->map(function ($file) {
        return [
            'name' => $file->name,
            'created_at' => $file->created_at->toDateTimeString(),
            'updated_at' => $file->updated_at->toDateTimeString(),
            'folder_id' => $file->folder_id,
            'user_id' => $file->user_id,
        ];
    });

    return Inertia::render('Dashboard', [
        'files' => $files
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('/files')->group(function () {
    Route::get('/', [FileController::class, 'index'])->name('files.index');
    Route::get('/{id}', [FileController::class, 'show'])->name('files.show');
});

Route::prefix('/shared')->group(function () {
    Route::get('/', [FileController::class, 'shared'])->name('files.shared');
});

Route::prefix('/deleted')->group(function () {
    Route::get('/', [FileController::class, 'deleted'])->name('files.deleted');
});

require __DIR__ . '/auth.php';

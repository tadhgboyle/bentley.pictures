<?php

use App\Http\Controllers\BentleyController;
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

Route::get('/', [BentleyController::class, 'random']);

Route::get('/api/random', [BentleyController::class, 'apiRandom']);
Route::get('/api/{imageId}', [BentleyController::class, 'apiViewImage']);

Route::get('/random', [BentleyController::class, 'random'])->name('random');
Route::get('/{imageId}', [BentleyController::class, 'viewImage'])->name('viewImage');

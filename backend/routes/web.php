<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Test\FakeStatController;
use App\Http\Controllers\api\CartController;
use App\Http\Controllers\api\OrderController;

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

Route::get('/', function () {
    return view('welcome');
});

//Route::get('/fake-stats', [FakeStatController::class, 'fake']);

// Shopping Cart
Route::get('/api/cart', [CartController::class, 'cart']);
Route::post('/api/cart/add', [CartController::class, 'add']);
Route::post('/api/cart/update', [CartController::class, 'update']);
Route::post('/api/cart/remove', [CartController::class, 'remove']);
Route::post('/api/cart/clear', [CartController::class, 'clear']);

Route::post('/api/order', [OrderController::class, 'order']);

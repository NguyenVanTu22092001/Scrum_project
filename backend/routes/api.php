<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\auth\RegisterController;
use App\Http\Controllers\api\auth\LoginController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\CartController;
use App\Http\Controllers\api\Auth\PasswordController;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/products', [ProductController::class, 'all']);
Route::get('/products/page/{page}/{take}', [ProductController::class, 'countPaginate']);
Route::get('/product/{id}', [ProductController::class, 'product']);
Route::get('/product/category/{id}', [ProductController::class, 'productFromCategory']);
Route::get('/product/user/{id}', [ProductController::class, 'productByUser']);

Route::get('/user/{id}', [UserController::class, 'getUser']);

Route::get('/categories', [CategoryController::class, 'all']);
Route::get('/category/{id}', [CategoryController::class, 'category']);


Route::post('/forgot-password', [PasswordController::class, 'forgotPassword']);
Route::post('/reset-password', [PasswordController::class, 'resetPassword']);

// Search
Route::get('/product/search/{q}', [ProductController::class, 'search']);

//

// // Shopping Cart
// Route::get('/cart/adds', [CartController::class, 'testCart']);
// Route::get('/cart', [CartController::class, 'cart']);
// Route::post('/cart/add', [CartController::class, 'add']);
// Route::post('/cart/update', [CartController::class, 'update']);
// Route::post('/cart/remove', [CartController::class, 'remove']);
// Route::post('/cart/clear', [CartController::class, 'clear']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/check/sanctum/token', [LoginController::class, 'checkToken']);
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/product/create', [ProductController::class, 'create']);
    Route::post('/product/update/{id}', [ProductController::class, 'update']);
    Route::post('/product/delete/{id}', [ProductController::class, 'delete']);

    // User Routes
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/user', [UserController::class, 'update']);

    // Password change

    // Bidding

    // Ordering


});


// Super Admin
// check the sales , delete user, ban user, create update category, edit all products

Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/category/create', [CategoryController::class, 'create']);
    Route::post('/category/update/{id}', [CategoryController::class, 'update']);
    Route::post('/category/delete/{id}', [CategoryController::class, 'delete']);
});


// Super Admin
// check the sales , delete user, ban user, create update category, edit all products

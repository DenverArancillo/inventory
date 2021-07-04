<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\BrandsController;
use App\Http\Controllers\ProductTypesController;

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

// Route::resource('brands', BrandsController::class);

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/brands', [BrandsController::class, 'index']);
Route::get('product-types', [ProductTypesController::class, 'index']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
	Route::post('/logout', [AuthController::class, 'logout']);

	Route::post('/brands', [BrandsController::class, 'store']);
	Route::get('/brands/{id}', [BrandsController::class, 'show']);
	Route::put('/brands/{id}', [BrandsController::class, 'update']);
	Route::delete('/brands/{id}', [BrandsController::class, 'destroy']);
	Route::get('/brands/search/{name}', [BrandsController::class, 'search']);

	Route::post('/product-types', [ProductTypesController::class, 'store']);
});
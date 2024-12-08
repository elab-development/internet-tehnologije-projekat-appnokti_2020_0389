<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceTypeController;
use App\Http\Controllers\SlotController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//login and register

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/slots', [SlotController::class, 'index']);
Route::get('/slots/{id}', [SlotController::class, 'show']);

Route::get('/service-types', [ServiceTypeController::class, 'index']);
Route::get('/service-types/{id}', [ServiceTypeController::class, 'show']);
Route::resource('services', ServiceController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('reservations', ReservationController::class);
    Route::get('/free-slots', [SlotController::class, 'freeSlots']);
    Route::resource('services', ServiceController::class)->only(['store', 'update', 'destroy'])->middleware('admin');
    Route::get('paginate-reservations', [ReservationController::class, 'paginateReservations'])->middleware('admin');
    Route::get('reservations-by-user/{userId}', [ReservationController::class, 'getReservationsByUserId']);
    Route::get('reservations-by-service/{serviceId}', [ReservationController::class, 'getReservationsByServiceId']);
    Route::get('chart-data', [ReservationController::class, 'getReservationsPerSlotTime'])->middleware('admin');
    Route::post('/logout', [AuthController::class, 'logout']);
});

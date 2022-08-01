<?php

use App\Http\Controllers\Api\Backend\ApiWalletController;
use Illuminate\Support\Facades\Route;




Route::group(['prefix' => 'order', 'as' => 'order.'], function () {
    Route::get('/wallet', [ApiWalletController::class, 'index']);
});
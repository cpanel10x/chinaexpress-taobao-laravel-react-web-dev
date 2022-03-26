<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AliExpressApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\GeneralController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;
use Illuminate\Http\Request;

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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::group(['prefix' => 'v1', 'as' => 'v1.'], function () {
  Route::post('/general', [GeneralController::class, 'generalSettings']);
  Route::post('/banners', [GeneralController::class, 'banners']);

  Route::get('/faqs', [GeneralController::class, 'faqPages']);
  Route::get('/contact-us', [GeneralController::class, 'contactUs']);
  Route::get('/page/{slug}', [GeneralController::class, 'singlePages']);


  Route::post('/check-exists-customer', [AuthController::class, 'checkExistsCustomer']);
  Route::post('/register-customer', [AuthController::class, 'registerCustomer']);
  Route::post('/login', [AuthController::class, 'loginCustomer']);
  Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
  Route::post('/reset-password', [AuthController::class, 'resetPassword']);
  Route::post('/logout', [AuthController::class, 'logout']);

  Route::post('/categories', [CatalogController::class, 'categories']);

  Route::get('/banners', [CatalogController::class, 'banners']);
  Route::post('/get-section-products', [CatalogController::class, 'getSectionProducts']);
  Route::post('/product/{id}', [CatalogController::class, 'productDetails']);


  Route::get('/category-products/{slug}', [CatalogController::class, 'categoryProducts']);
  Route::get('/product-description/{id}', [CatalogController::class, 'productDescription']);
  Route::get('/product-seller-information/{id}', [CatalogController::class, 'productSellerInfo']);


  // searching products api
  Route::post('/search', [CatalogController::class, 'getSearchResult']);
  Route::post('/search-process', [CatalogController::class, 'searchProcess']);
  Route::post('/get-picture-result/{search_id}', [CatalogController::class, 'getPictureSearchResult']);
  Route::post('/search-picture', [CatalogController::class, 'searchPicture']);

  Route::post('/me', [AuthController::class, 'me']);
  Route::post('/wishlist', [WishlistController::class, 'getCustomerWishList']);

  Route::post('/social-login', [AuthController::class, 'socialLogin']);

  //  aliexpress routes
  Route::get('/aliexpress/search', [AliExpressApiController::class, 'searchQuery']);
  Route::get('/aliexpress/product/{product_id}', [AliExpressApiController::class, 'productInfo']);
  Route::get('/aliexpress/shipment/{product_id}', [AliExpressApiController::class, 'productShipmentInfo']);
  Route::get('/aliexpress/related-products/{product_id}', [AliExpressApiController::class, 'relatedProducts']);


  Route::post('/email/verify/{id}', [HomeController::class, 'verify'])->name('verificationapi.verify');
  Route::post('/email/resend', [HomeController::class, 'resend'])->name('verificationapi.resend');

  Route::post('/loving-products', [HomeController::class, 'lovingProducts']);
  Route::post('/buying-products', [HomeController::class, 'buyingProducts']);
  Route::post('/recent-products', [HomeController::class, 'recentProducts']);

  Route::post('/related-products/{item_id}', [HomeController::class, 'relatedProducts']);




  Route::group(['middleware' => ['auth:sanctum', 'verified']], function () {
    Route::post('/confirm-order', [OrderController::class, 'confirmOrders']);
    Route::post('/payment-confirm', [OrderController::class, 'confirmOrderPayment']);

    Route::get('/orders', [OrderController::class, 'orders']);
    Route::get('/order/{orderId}', [OrderController::class, 'orderDetails']);
    Route::post('/invoices', [OrderController::class, 'invoices']);
    Route::post('/invoice/{id}', [OrderController::class, 'invoiceDetails']);

    Route::post('/add-to-wishlist', [WishlistController::class, 'AddToWishList']);
    Route::post('/remove-wishlist', [WishlistController::class, 'removeCustomerWishList']);

    Route::post('/address', [AddressController::class, 'AllAddress']);
    Route::post('/store-new-address', [AddressController::class, 'StoreNewAddress']);
    Route::post('/delete-address', [AddressController::class, 'deleteAddress']);

    Route::post('nagad/payment', [NagadPaymentController::class, 'payment_process']);
  });

  // cart system
  Route::group(['prefix' => 'cart', 'as' => 'cart.'], function () {
    Route::get('/', [CartController::class, 'currentCart']);
    Route::post('/add', [CartController::class, 'addToCart']);
    Route::post('/update', [CartController::class, 'updateCustomerCart']);
    Route::post('/shipping', [CartController::class, 'addShippingAddress']);
    Route::post('/checkbox', [CartController::class, 'updateCartCheckbox']);
    Route::post('/remove', [CartController::class, 'removeFromCart']);
    Route::post('/payment-method', [CartController::class, 'addPaymentMethod']);
    Route::post('/place-order', [CartController::class, 'placedOrder']);

    Route::post('/coupon', [CartController::class, 'couponCodeSubmit']);
    Route::post('/coupon-reset', [CartController::class, 'couponReset']);
  });
});

<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AliExpressApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GeneralController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;
use Illuminate\Support\Facades\Route;

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
  Route::get('/page/{slug}', [GeneralController::class, 'singlePages']);

  Route::get('/contact-us', [GeneralController::class, 'contactUs']);
  Route::post('/contact/message', [GeneralController::class, 'contactMessageSend']);

  // sanctum auth user
  Route::get('/user', [AuthController::class, 'authUser']);

  Route::post('/check-exists-customer', [AuthController::class, 'checkExistsCustomer']);
  Route::post('/login', [AuthController::class, 'loginCustomer']);
  Route::post('/register-customer', [AuthController::class, 'registerCustomer']);
  Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
  Route::post('/reset-password', [AuthController::class, 'resetPassword']);

  Route::post('/categories', [CatalogController::class, 'categories']);

  Route::post('/get-section-products', [CatalogController::class, 'getSectionProducts']);
  Route::post('/product/{id}', [CatalogController::class, 'productDetails']);

  Route::post('/category-products/{slug}', [CatalogController::class, 'categoryProducts']);
  Route::get('/product-description/{id}', [CatalogController::class, 'productDescription']);
  Route::get('/product-seller-information/{id}', [CatalogController::class, 'productSellerInfo']);

  // searching products api
  Route::get('/search', [CatalogController::class, 'getSearchResult']);
  Route::post('/search/suggestion', [CatalogController::class, 'searchSuggestion']);
  Route::post('/search-process', [CatalogController::class, 'searchProcess']);
  Route::post('/get-picture-result/{search_id}', [CatalogController::class, 'getPictureSearchResult']);
  Route::post('/search-picture', [CatalogController::class, 'searchPicture']);
  Route::post('/vendor-items', [CatalogController::class, 'SearchVendorItems']);

  Route::post('/wishlist', [WishlistController::class, 'getCustomerWishList']);

  Route::post('/social-login', [AuthController::class, 'socialLogin']);

  //  aliexpress routes
  Route::post('/aliexpress/search', [AliExpressApiController::class, 'searchQuery']);
  Route::post('/aliexpress/product/{product_id}', [AliExpressApiController::class, 'productInfo']);
  Route::get('/aliexpress/seller-products', [AliExpressApiController::class, 'sellerProducts']);
  Route::get('/aliexpress/related-products/{product_id}', [AliExpressApiController::class, 'relatedProducts']);

  Route::post('/email/verify/{id}', [HomeController::class, 'verify'])->name('verificationapi.verify');
  Route::post('/email/resend', [HomeController::class, 'resend'])->name('verificationapi.resend');

  Route::post('/loving-products', [HomeController::class, 'lovingProducts']);
  Route::post('/buying-products', [HomeController::class, 'buyingProducts']);
  Route::post('/recent-products', [HomeController::class, 'recentProducts']);

  Route::post('/related-products/{item_id}', [HomeController::class, 'relatedProducts']);
  Route::post('/new-arrived-products', [HomeController::class, 'newArrivedProducts']);
  Route::post('/recent-view-products', [HomeController::class, 'recentViewProducts']);
  Route::post('/favorite-products', [HomeController::class, 'newFavoriteProducts']);

  Route::group(['middleware' => ['auth:sanctum', 'verified']], function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);

    Route::post('/confirm-order', [OrderController::class, 'confirmOrders']);
    Route::post('/payment-confirm', [OrderController::class, 'confirmOrderPayment']);

    Route::post('/invoices', [OrderController::class, 'invoices']);
    Route::post('/invoice/{id}', [OrderController::class, 'invoiceDetails']);

    Route::post('/add-to-wishlist', [WishlistController::class, 'AddToWishList']);
    Route::post('/remove-wishlist', [WishlistController::class, 'removeCustomerWishList']);

    Route::get('/address', [AddressController::class, 'AllAddress']);
    Route::post('/store-new-address', [AddressController::class, 'StoreNewAddress']);
    Route::post('/delete-address', [AddressController::class, 'deleteAddress']);

    // Route::post('nagad/payment', [NagadPaymentController::class, 'payment_process']);

    // dashboard operations
    Route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function () {
      Route::post('/payment/status/update', [DashboardController::class, 'paymentStatusUpdate']);
      Route::get('/orders', [DashboardController::class, 'orderIndex']);
      Route::get('/order/{id}', [DashboardController::class, 'orderDetails']);
      Route::post('/order/payment/generate', [DashboardController::class, 'paymentGenerate']);
    });
  });

  // cart system
  Route::group(['prefix' => 'cart', 'as' => 'cart.'], function () {
    Route::get('/', [CartController::class, 'currentCart']);
    Route::get('/checkout', [CartController::class, 'checkoutCart']);

    Route::post('/add', [CartController::class, 'addToCart']);
    Route::post('/mark-as-cart', [CartController::class, 'markAsCart']);

    Route::post('/choose-shipping', [CartController::class, 'choose_shipping']);
    Route::post('/process-express', [CartController::class, 'processExpressService']);
    Route::post('/update', [CartController::class, 'updateCustomerCart']);

    Route::post('/update/checkout', [CartController::class, 'updateCustomerCheckoutCart']);

    Route::post('/read-popup', [CartController::class, 'readPopup']);
    Route::post('/shipping', [CartController::class, 'addShippingAddress'])->middleware('auth:sanctum');
    Route::post('/checkbox', [CartController::class, 'updateCartCheckbox'])->middleware('auth:sanctum');
    Route::post('/remove', [CartController::class, 'removeFromCart']);
    Route::post('/payment-method', [CartController::class, 'addPaymentMethod'])->middleware('auth:sanctum');
    Route::post('/place-order', [CartController::class, 'placedOrder'])->middleware('auth:sanctum');

    Route::post('/coupon', [CartController::class, 'couponCodeSubmit'])->middleware('auth:sanctum');
    Route::post('/coupon-reset', [CartController::class, 'couponReset'])->middleware('auth:sanctum');
  });
});

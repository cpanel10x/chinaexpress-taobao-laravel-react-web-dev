<?php

use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\User\AccountController;
use App\Http\Controllers\Frontend\User\DashboardController;
use App\Http\Controllers\Frontend\User\ProfileController;
use App\Http\Controllers\SslCommerzPaymentController;

use App\Http\Controllers\Frontend\Ajax\WishlistController;

use App\Http\Controllers\PaymentGateway\NagadPaymentController;
use App\Http\Controllers\PaymentGateway\BkashPaymentController;

use App\Http\Controllers\Frontend\Ajax\AuthController;
use App\Http\Controllers\Frontend\Ajax\AddressController;
use App\Http\Controllers\Frontend\Ajax\AliExpressApiController;
use App\Http\Controllers\Frontend\Ajax\CatalogController;
use App\Http\Controllers\Frontend\Ajax\CartController;
use App\Http\Controllers\Frontend\Ajax\GeneralController;
use App\Http\Controllers\Frontend\Ajax\OrderController;

/*
 * Frontend Controllers
 * All route names are prefixed with 'frontend.'.
 */

Route::get('/', [HomeController::class, 'index'])->name('index');

// Route::post('contact/send', [ContactController::class, 'send'])->name('contact.send');


Route::group(['as' => 'default.', 'prefix' => 'default'], function () {
  Route::post('/general', [GeneralController::class, 'generalSettings']);
  Route::get('/banners', [GeneralController::class, 'banners']);
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


  Route::group(['middleware' => ['auth', 'password_expires']], function () {
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
  Route::group(['as' => 'cart.', 'prefix' => 'cart'], function () {
    Route::post('/', [CartController::class, 'currentCart']);
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


/*
 * These frontend controllers require the user to be logged in
 * All route names are prefixed with 'frontend.'
 * These routes can not be hit if the password is expired
 */
Route::group(['middleware' => ['auth', 'password_expires']], function () {

  Route::group(['namespace' => 'User', 'as' => 'user.'], function () {
    // User Dashboard Specific
    // Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Route::get('notification', [DashboardController::class, 'notification'])->name('dashboard.notification');

    // manage order information
    // Route::get('order-details/{tranId}', [DashboardController::class, 'orderDetails'])->name('order-details');
    // Route::get('failed-order-pay-now/{tranId}', [DashboardController::class, 'failedOrderPayNow'])->name('failedOrderPayNow');

    // manage Invoice information
    Route::get('invoice-details/{invoice_id}', [DashboardController::class, 'invoiceDetails'])->name('invoice-details');
    Route::get('invoice-pay-now/{tranId}', [DashboardController::class, 'invoicePayNow'])->name('invoice.payNow');


    // User Account Specific
    Route::get('account', [AccountController::class, 'index'])->name('account');
    Route::get('update-information', [AccountController::class, 'updateInformation'])->name('update.information');
    Route::post('update-information', [AccountController::class, 'updateInformationStore'])->name('update.information.store');

    // User Profile Specific
    Route::patch('profile/update', [ProfileController::class, 'update'])->name('profile.update');
  });
});


// nagad payment process
Route::get('nagad/callback', [NagadPaymentController::class, 'nagad_payment_verify']);


// start bkash payment
Route::get('bkash/payment/status', [BkashPaymentController::class, 'PaymentStatus']);
Route::get('bkash/payment/{id}', [BkashPaymentController::class, 'bkashPaymentProcess']);

Route::post('bkash/token', [BkashPaymentController::class, 'bkashToken']);
Route::post('bkash/checkout', [BkashPaymentController::class, 'createCheckoutPayment']);
Route::post('bkash/execute', [BkashPaymentController::class, 'executeCheckoutPayment']);
// end bkash payment


// SSLCOMMERZ Start
Route::post('/pay-via-ajax', [SslCommerzPaymentController::class, 'payViaAjax']); // for some of
Route::post('sslcommerz/payment', [SslCommerzPaymentController::class, 'index']);
Route::post('/success', [SslCommerzPaymentController::class, 'success']);
Route::post('/fail', [SslCommerzPaymentController::class, 'fail']);
Route::post('/cancel', [SslCommerzPaymentController::class, 'cancel']);
Route::post('/ipn', [SslCommerzPaymentController::class, 'ipn']);
//SSLCOMMERZ END

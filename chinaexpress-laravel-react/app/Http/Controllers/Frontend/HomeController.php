<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Content\Frontend\CustomerCart;
use App\Models\Content\Frontend\Wishlist;
use App\Models\Content\Order;
use App\Models\Content\OrderItem;
use App\Models\Content\Post;
use App\Models\Content\Product;
use App\Models\Content\Taxonomy;
use Auth;
use Illuminate\Support\Facades\Crypt;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;

/**
 * Class HomeController.
 */
class HomeController extends Controller
{
  /**
   * @return \Illuminate\View\View
   */
  public function index()
  {
    // $cookie_announced = Cookie::get('_announce');
    // if (!$cookie_announced) {
    //     Cookie::queue('_announce', 'read_announce', 10);
    //     $announcement = Post::where('post_type', 'announcement')
    //         ->where('post_status', 'publish')
    //         ->latest()
    //         ->first();
    // } else {
    //     $announcement = null;
    // }
    // // $this->apiTestingDeveloping();
    // $categories = Taxonomy::whereNull('ParentId')->whereNotNull('active')->orderBy('created_at')->get();
    // $banners = Post::where('post_type', 'banner')->where('post_status', 'publish')->limit(5)->latest()->get();
    // $recentProducts = Product::latest()->paginate(30);
    // $recentOrders = OrderItem::with('product')->select('product_id')->groupBy('product_id')->latest()->paginate(30);
    // $wishlistProducts = Wishlist::withTrashed()->with('product')->select('ItemId')->groupBy('ItemId')->latest()->paginate(30);
    // $someoneBuying = CustomerCart::withTrashed()->with('product')->select('ItemId')->groupBy('ItemId')->latest()->paginate(30);

    return view('frontend.index');
  }
}

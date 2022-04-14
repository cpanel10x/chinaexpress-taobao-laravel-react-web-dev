<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use voku\helper\HtmlDomParser;

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
    // $url = "https://www.aliexpress.com/item/1005003429438833.html";
    // $url = "https://a.aliexpress.com/_mq8QLFM";
    // $abcd = file_get_contents($url);
    // $htmlTmp = HtmlDomParser::str_get_html($abcd);
    // $url = '';
    // foreach ($htmlTmp->find('link') as $meta) {
    //   $hasRel = $meta->hasAttribute('rel');
    //   if ($hasRel) {
    //     $relData = $meta->getAttribute('rel');
    //     if ($relData == 'canonical') {
    //       $url = $meta->getAttribute('href');
    //     }
    //   }
    // }
    // $url = explode('/', $url);
    // $url = end($url);
    // $url = str_replace('.html', '', $url);

    // dd($url);


    return view('frontend.index');
  }
}

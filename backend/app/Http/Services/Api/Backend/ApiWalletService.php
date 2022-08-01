<?php

namespace App\Http\Services\Api\Backend;

use App\Http\Services\Api\PaginationService;
use App\Models\Backend\OrderTracking;
use App\Models\Backend\OrderTrackingExceptional;
use App\Models\Content\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * ApiWalletService
 */
class ApiWalletService
{
    public function list()
    {
        $query = OrderItem::with('user', 'order', 'product', 'itemVariations')->orderByDesc('id');
        $column = [];
        $data  = (new PaginationService())->getPaginatedData($query, $column);
        $paginatedQuery = $data['data'];
        $finalQuery     = $paginatedQuery->get();
        $data['data']   = $finalQuery;
        return $data;
    }
}

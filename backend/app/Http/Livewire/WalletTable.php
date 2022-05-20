<?php

namespace App\Http\Livewire;

use App\Models\Content\OrderItem;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\TableComponent;
use Rappasoft\LaravelLivewireTables\Traits\HtmlComponents;
use Rappasoft\LaravelLivewireTables\Views\Column;

class WalletTable extends TableComponent
{
  use HtmlComponents;
  /**
   * @var string
   */
  public $sortField = 'id';
  public $sortDirection = 'desc';

  public $perPage = 6;
  public $perPageOptions = [6, 10, 20, 30, 50, 100, 200, 500, 1000];

  public $loadingIndicator = true;
  public $clearSearchButton = true;

  protected $options = [
    'bootstrap.classes.table' => 'table table-bordered table-hover',
    'bootstrap.classes.thead' => null,
    'bootstrap.classes.buttons.export' => 'btn btn-info',
    'bootstrap.container' => true,
    'bootstrap.responsive' => true,
  ];

  public $sortDefaultIcon = '<i class="text-muted fa fa-sort"></i>';
  public $ascSortIcon = '<i class="fa fa-sort-up"></i>';
  public $descSortIcon = '<i class="fa fa-sort-down"></i>';

  public $exportFileName = 'Customer-Wallet';
  public $exports = [];


  public $status;
  public $customer;

  public function mount($status, $customer)
  {
    $this->status = $status;
    $this->customer = $customer;
  }

  public function query(): Builder
  {
    $customer = $this->customer;
    $status = $this->status;
    $status = $status ? explode(',', $this->status) : [];
    $status = array_filter($status, function ($v) {
      return $v != 'null';
    });

    $orderItem = OrderItem::with('user', 'order', 'product');
    $orderItem = !empty($status) ? $orderItem->whereIn('status', $status) : $orderItem;
    return $customer ? $orderItem->where('user_id', $customer) : $orderItem;
  }

  public function columns(): array
  {
    return [
      Column::make('<input type="checkbox" id="allSelectCheckbox">', 'checkbox')
        ->format(function (OrderItem $model) {
          $checkbox = '<input type="checkbox" class="checkboxItem " data-status="' . $model->status . '" data-user="' . $model->user_id . '" name="wallet[]" value="' . $model->id . '">';
          return $this->html($checkbox);
        })->excludeFromExport(),
      Column::make('Date', 'created_at')
        ->searchable()
        ->format(function (OrderItem $model) {
          return date('d-M-Y', strtotime($model->created_at));
        }),
      Column::make('TransactionNo.', 'order.transaction_id')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $model->order->transaction_id ?? 'N/A';
        }),
      Column::make('ItemNo.', 'order.order_number')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="order_number">' . $model->order->order_number . '</span>');
        }),
      Column::make('Customer', 'user.name')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $model->user->name ? $model->user->full_name : 'N/A';
        }),
      Column::make('Source Site',  'ProviderType')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $model->ProviderType ? ucfirst($model->ProviderType) : 'Unknown';
        }),
      Column::make('Shipping Method',  'shipping_type')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $model->shipping_type ? ucfirst($model->shipping_type) : 'Express';
        }),
      Column::make('Shipping Rate', 'shipping_rate')
        ->format(function (OrderItem $model) {
          $shipping_rate = $model->shipping_rate ? $model->shipping_rate : 0;
          $html = '<span class="shipping_rate">' . ($shipping_rate) . '</span>';
          return $this->html($html);
        }),
      Column::make('Source Order Number', 'order_number')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="order_number">' . ($model->order_number ? $model->order_number : 'N/A') . '</span>');
        }),
      Column::make('TrackingNo.', 'tracking_number')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="tracking_number">' . ($model->tracking_number ? $model->tracking_number : 'N/A') . '</span>');
        }),
      Column::make('ProductTitle', 'Title')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="product_name" data-product-id="' . $model->product_id . '">' . strip_tags($model->Title) . '</span>');
        }),
      Column::make('Source Link', '1688_link')
        ->format(function (OrderItem $model) {
          $ItemId = $model->ItemId;
          $itemLink = "https://item.taobao.com/item.htm?id={$ItemId}";
          if ($model->ProviderType == 'aliexpress') {
            $itemLink = "https://www.aliexpress.com/item/{$ItemId}.html";
          }
          $htmlHref = '<a href="' . $itemLink . '" class="btn-info btn-block btn-sm" target="_blank"><i class="fa fa-external-link"></i></a>';
          return $this->html($htmlHref);
        }),
      Column::make('Quantity', 'Quantity')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="quantity">' . $model->Quantity . '</span>');
        }),
      Column::make('ProductsValue', 'product_value')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="product_value">' . ($model->product_value ? $model->product_value : 0) . '</span>');
        }),
      Column::make('LocalDelivery', 'DeliveryCost'),
      Column::make('Coupon Value', 'coupon_contribution')
        ->format(function (OrderItem $model) {
          $coupon = $model->coupon_contribution ? $model->coupon_contribution : 0;
          return $this->html('<span class="coupon_contribution">' . $coupon . '</span>');
        }),
      Column::make('Net Product Value', 'net_product_value')
        ->format(function (OrderItem $model) {
          $product_value = $model->product_value ? $model->product_value : 0;
          $DeliveryCost = $model->DeliveryCost ? $model->DeliveryCost : 0;
          $coupon = $model->coupon_contribution ? $model->coupon_contribution : 0;
          return $this->html('<span class="net_product_value">' . ($product_value + $DeliveryCost - $coupon) . '</span>');
        }),
      Column::make('1stPayment', 'first_payment')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="first_payment">' . ($model->first_payment ?  $model->first_payment : 0) . '</span>');
        }),
      Column::make('OutOfStock', 'out_of_stock')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="out_of_stock">' . ($model->out_of_stock ? $model->out_of_stock : 0) . '</span>');
        }),
      Column::make('Missing/Shortage', 'missing')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="missing">' . ($model->missing ? $model->missing : 0) . '</span>');
        }),
      Column::make('Lost in Transit', 'lost_in_transit')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="lost_in_transit">' . ($model->lost_in_transit ?? 0) . '</span>');
        }),
      Column::make('Refunded', 'refunded')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="refunded">' . ($model->refunded ? $model->refunded : 0) . '</span>');
        }),
      Column::make('Adjustment', 'adjustment')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="adjustment">' . ($model->adjustment ? $model->adjustment : 0) . '</span>');
        }),
      Column::make('AliExpress Tax', 'customer_tax')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="customer_tax">' . ($model->customer_tax ?? 0) . '</span>');
        }),
      Column::make('Weight', 'weight')
        ->format(function (OrderItem $model) {
          $weight = $model->weight ? $model->weight : 0;
          $Quantity = $model->Quantity ? $model->Quantity : 0;
          $totalWeight = $weight * $Quantity;
          $html = '<span class="actual_weight">' . (floating($totalWeight, 3)) . ' KG</span>';
          $html .= "</br>";
          $html .= "<span>({$Quantity}x{$weight})</span>";
          return $this->html($html);
        }),
      Column::make('WeightCharges', 'shipping_rate')
        ->format(function (OrderItem $model) {
          $shipping_rate = $model->shipping_rate ? $model->shipping_rate : 0;
          $weight = $model->weight ? $model->weight : 0;
          $Quantity = $model->Quantity ? $model->Quantity : 0;
          $totalWeight = $weight * $Quantity;
          $totalShipping = round($shipping_rate * $totalWeight);
          $floatingWeight = floating($totalWeight, 3);
          $html = '<span class="shipping_rate">' . ($totalShipping) . '</span>';
          $html .= "</br>";
          $html .= "<span>({$shipping_rate}x{$floatingWeight})</span>";
          return $this->html($html);
        }),
      Column::make('CourierBill', 'courier_bill')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="courier_bill">' . ($model->courier_bill ? $model->courier_bill : 0) . '</span>');
        }),
      Column::make('LastPayment', 'last_payment')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="last_payment">' . ($model->last_payment ? $model->last_payment : 0) . '</span>');
        }),
      Column::make('Closing Balance', 'due_payment')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="due_payment">' . ($model->due_payment ? $model->due_payment : 0) . '</span>');
        }),
      Column::make('Ref.Invoice', 'invoice_no')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="invoice_no">' . ($model->invoice_no ? $model->invoice_no : 'N/A') . '</span>');
        }),
      Column::make('Status', 'status')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="status" data-status="' . ($model->status) . '">' . ($model->status) . '</span>');
        }),
      Column::make(__('Action'), 'action')
        ->format(function (OrderItem $model) {
          return view('backend.content.order.wallet.includes.actions', ['wallet' => $model]);
        })
        ->excludeFromExport(),
      Column::make('Day Count', 'day_count')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="day_count text-danger">' . (1) . ' Days</span>');
        }),
      Column::make('Update Log', 'update_log')
        ->format(function (OrderItem $model) {
          $htmlHref = '<a href="#" class="btn btn-sm btn-info btn-block"><i class="fa fa-list"></i> Log</a>';
          return $this->html($htmlHref);
        }),
      Column::make('Comments-1', 'comments1')
        ->format(function (OrderItem $model) {
          $htmlHref = 'Lorem ipsum dolor';
          return $this->html($htmlHref);
        }),
      Column::make('Comments-2', 'comments2')
        ->format(function (OrderItem $model) {
          $htmlHref = 'Lorem ipsum dolor sit amet ';
          return $this->html($htmlHref);
        }),
    ];
  }


  public function setTableHeadAttributes($attribute): array
  {
    if ($attribute == 'action') {
      return ['style' => 'min-width:80px;'];
    } elseif ($attribute == 'Title') {
      return ['style' => 'min-width:350px;'];
    }
    return [
      'style' => ''
    ];
  }

  public function setTableHeadClass($attribute): ?string
  {
    $array = ['id', 'created_at', 'order.transaction_id', 'order.order_number', 'ProviderType', 'shipping_type', 'shipping_rate', 'order_number', '1688_link', 'coupon_contribution', 'net_product_value', 'lost_in_transit', 'customer_tax', 'weight_charges', 'order_item_number', 'chinaLocalDelivery', '1688_link', 'status', 'action', 'due_payment', 'checkbox', 'day_count', 'update_log', 'comments1', 'comments2'];
    if (in_array($attribute, $array)) {
      $allSelect = $attribute == 'id' ? 'allSelectTitle' : '';
      return ' text-center text-nowrap' . $allSelect;
    }

    return $attribute;
  }


  public function setTableDataClass($attribute, $value): ?string
  {
    $array = ['Title'];
    if (in_array($attribute, $array)) {
      return 'align-middle';
    }
    $array = ['id', 'created_at', 'order.transaction_id', 'order.order_number', 'ProviderType', 'shipping_type', 'shipping_rate', 'order_number', '1688_link', 'coupon_contribution', 'net_product_value', 'lost_in_transit', 'customer_tax', 'weight_charges', 'order_item_number', 'chinaLocalDelivery', '1688_link', 'status', 'action', 'due_payment', 'checkbox', 'day_count', 'update_log'];
    if (in_array($attribute, $array)) {
      return ' text-center align-middle text-nowrap';
    }
    return 'text-center align-middle';
  }

  public function setTableRowId($model): ?string
  {
    return $model->id;
  }
}

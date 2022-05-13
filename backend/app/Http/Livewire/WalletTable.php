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

  public $perPage = 20;
  public $perPageOptions = [10, 20, 30, 50, 100, 200, 500, 1000];

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
      Column::make('TranID.', 'order.transaction_id')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $model->order->transaction_id ?? 'N/A';
        }),
      Column::make('OrderNumber', 'order.order_number')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="order_number">' . $model->order->order_number . '</span>');
        }),
      Column::make('Customer', 'user.name')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $model->user->name ? $model->user->full_name : 'N/A';
        }),
      Column::make('TrackingNo.', 'tracking_number')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="tracking_number">' . ($model->tracking_number ? $model->tracking_number : 'N/A') . '</span>');
        }),
      Column::make('TaobaoOrderNo.', 'order_number')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="order_number">' . ($model->order_number ? $model->order_number : 'N/A') . '</span>');
        }),
      Column::make('ProductsTitle', 'Title')
        ->searchable()
        ->format(function (OrderItem $model) {
          return $this->html('<span class="product_name" data-product-id="' . $model->product_id . '">' . strip_tags($model->Title) . '</span>');
        }),
      Column::make('ShippedBy', 'shipped_by')
        ->format(function (OrderItem $model) {
          $rate = $model->shipping_rate ? $model->shipping_rate : '0';
          return $this->html('<span>' . $model->shipped_by . ' - </span><span class="text-danger">' . ($rate) . '</span>');
        }),
      Column::make('TaobaoLink', '1688_link')
        ->format(function (OrderItem $model) {
          return $this->html($this->link("https://item.taobao.com/item.htm?id=" . $model->ItemId, 'Click', ['target' => '_blank']));
        })
        ->excludeFromExport(),
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
      Column::make('1stPayment', 'first_payment')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="first_payment">' . ($model->first_payment ?  $model->first_payment : 0) . '</span>');
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
      Column::make('Weightcharges', 'shipping_rate')
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
      Column::make('Outofstock', 'out_of_stock')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="out_of_stock">' . ($model->out_of_stock ? $model->out_of_stock : 0) . '</span>');
        }),
      Column::make('Missing/Shortage', 'missing')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="missing">' . ($model->missing ? $model->missing : 0) . '</span>');
        }),
      Column::make('Refunded', 'refunded')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="refunded">' . ($model->refunded ? $model->refunded : 0) . '</span>');
        }),
      Column::make('Adjustment', 'adjustment')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="adjustment">' . ($model->adjustment ? $model->adjustment : 0) . '</span>');
        }),
      Column::make('CourierBill', 'courier_bill')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="courier_bill">' . ($model->courier_bill ? $model->courier_bill : 0) . '</span>');
        }),
      Column::make('LastPayment', 'last_payment')
        ->format(function (OrderItem $model) {
          return $this->html('<span class="last_payment">' . ($model->last_payment ? $model->last_payment : 0) . '</span>');
        }),
      Column::make('CurrentDue', 'due_payment')
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
          $htmlHref = '';
          if (auth()->user()->can('wallet.view.details')) {
            $htmlHref = '<a href="' . route('admin.order.wallet.details', $model->id) . '" class="btn btn-secondary btn-sm" data-method="show"><i class="fa fa-file-o"></i></a>';
          }
          return $this->html($htmlHref);
        })
        ->excludeFromExport(),
    ];
  }


  public function setTableHeadAttributes($attribute): array
  {
    if ($attribute == 'action') {
      return ['style' => 'min-width:80px;'];
    } elseif ($attribute == 'Title') {
      return ['style' => 'min-width:260px;'];
    }
    return [
      'style' => 'min-width:120px'
    ];
  }

  public function setTableHeadClass($attribute): ?string
  {
    $array = ['id', 'image', 'order_item_number', 'shipped_by', 'chinaLocalDelivery', '1688_link', 'action', 'due_payment', 'checkbox'];
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
    return 'text-center align-middle  text-nowrap';
  }

  public function setTableRowId($model): ?string
  {
    return $model->id;
  }
}

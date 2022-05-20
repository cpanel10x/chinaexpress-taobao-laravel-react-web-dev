<div class="btn-group">
  <button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
    <i class="fa fa-cog"></i>
  </button>
  <div class="dropdown-menu dropdown-menu-right">
    @can('wallet.view.details')
    <a href="{{ route('admin.order.wallet.details', $wallet) }}" class="dropdown-item" data-toggle="tooltip" data-placement="top"
      title="wallet details">
      View
    </a>
    @endcan
    @can('wallet.change.status')
    <a href="#" class="dropdown-item" data-toggle="tooltip" data-placement="top"
      title="Change Status">
      Change Status
    </a>
    @endcan
    @can('wallet.edit')
    <a href="#" class="dropdown-item" data-toggle="tooltip" data-placement="top"
      title="Edit wallet">
      Edit Wallet
    </a>
    @endcan
    @can('recent.order.delete')
    <a href="{{ route('admin.order.destroy', $wallet) }}" data-method="delete"
      data-trans-button-cancel="@lang('buttons.general.cancel')"
      data-trans-button-confirm="@lang('buttons.general.crud.delete')" data-trans-title="Are You Sure ?"
      class="dropdown-item" data-toggle="tooltip" data-placement="top" title="@lang('buttons.general.crud.delete')">
      <span class="text-danger">Delete Item</span>
    </a>
    @endcan
  </div>
</div>
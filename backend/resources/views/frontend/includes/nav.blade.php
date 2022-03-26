

<header class="header_wrap fixed-top header_with_topbar">
  <div class="top-header light_skin py-1 d-none d-md-block" style="background: #00b050">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-6">
          <div class="header_topbar_info">
            <div class="border-0 header_offer">
              <ul class="contact_detail text-center text-lg-left">
                @php
                  $phone = get_setting('office_phone',"01678077023")
                @endphp
                <li class="mr-2">
                  Hotline :
                  <a href="tel:{{$phone}}" class="text-white"><span>{{$phone}}</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div> <!-- col-md-2 -->

        <div class="col-lg-6 col-md-6">
          <div class="text-center text-md-right">
            <ul class="header_list">
              @auth
                @php
                  $unreadNotice = auth()->user()->unreadNotifications->count()
                @endphp
                @if($unreadNotice)
                  <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                       aria-expanded="false">
                      <i class="linearicons-alarm"></i>Notifications<span class="wishlist_count ml-1">{{$unreadNotice}}</span> <span
                          class="caret"></span>
                    </a>
                    <div class=" dropdown-menu dropdown-menu-right">
                      @forelse(auth()->user()->unreadNotifications as $notification)

                        @if($notification->type == 'App\Notifications\OrderAuthInformation')
                          @php
                            $invoice_id = isset($notification->data['invoice_id']) ? $notification->data['invoice_id'] : null ;
                            $notifyUrl = $invoice_id ? "admin/order/{$invoice_id}" : "admin/order";
                          @endphp
                          <a href="{{url($notifyUrl)}}" data-notice="{{$notification->id}}"
                             class="dropdown-item text-dark noticeButton">
                            Customer Placed a Order
                          </a>
                        @elseif($notification->type == 'App\Notifications\OrderPending')
                          <a href="{{route('frontend.user.dashboard')}}#orders" data-notice="{{$notification->id}}"
                             class="dropdown-item text-dark noticeButton">
                            Your Order #{{$notification->data['invoice_id']}} Placed. Order total
                            {{currency_icon().' '.$notification->data['amount']}}
                          </a>
                        @endif
                      @empty
                        <a href="#" class="dropdown-item text-dark">You have no
                          notification</a>
                      @endforelse
                    </div>
                  </li>
                @endif
              @endauth

              @guest
                <li>
                  <a href="{{route('frontend.auth.login')}}">
                    <i class="icon-user"></i><span>{{__('Login')}}</span>
                  </a>
                </li>
              @else
                <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                     aria-expanded="false">
                    <i class="icon-user"></i><span>{{$logged_in_user->full_name}}</span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    @can('view backend')
                      <a href="{{route('admin.dashboard')}}" class="dropdown-item text-dark">{{__('Administration')}}</a>
                    @endcan
                    <a href="{{route('frontend.user.dashboard')}}" class="dropdown-item text-dark">{{__('Dashboard')}}</a>
                    <a class="dropdown-item text-dark"
                       href="{{route('frontend.user.dashboard', ['tab' => 'orders'])}}">{{__('My Orders')}}</a>
                    <a href="{{route('frontend.user.account')}}" class="dropdown-item text-dark">{{__('My Account')}}</a>
                    <a href="{{ route('frontend.auth.logout') }}"
                       class="dropdown-item text-dark">@lang('navs.general.logout')</a>
                  </div>
                </li>
              @endif
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>


</header>







@if (config('boilerplate.frontend_breadcrumbs'))
  @include('frontend.includes.partials.breadcrumbs')
@endif
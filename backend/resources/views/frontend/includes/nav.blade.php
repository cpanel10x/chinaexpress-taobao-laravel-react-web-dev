<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        @guest
        <li class="nav-item">
          <a href="{{route('frontend.auth.login')}}" class="nav-link">
            <i class="icon-user"></i><span>{{__('Login')}}</span>
          </a>
        </li>
        @else
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">
            <i class="icon-user"></i><span>{{$logged_in_user->full_name}}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            @can('view backend')
            <a href="{{route('admin.dashboard')}}" class="dropdown-item text-dark">{{__('Administration')}}</a>
            @endcan
            <a href="{{route('frontend.user.dashboard')}}" class="dropdown-item text-dark">{{__('Dashboard')}}</a>
            <a class="dropdown-item text-dark" href="{{route('frontend.user.dashboard', ['tab' => 'orders'])}}">{{__('My
              Orders')}}</a>
            <a href="{{route('frontend.user.account')}}" class="dropdown-item text-dark">{{__('My Account')}}</a>
            <a href="{{ route('frontend.auth.logout') }}"
              class="dropdown-item text-dark">@lang('navs.general.logout')</a>
          </div>
        </li>
        @endif
      </ul>
    </div>

  </div>
</nav>








@if (config('boilerplate.frontend_breadcrumbs'))
@include('frontend.includes.partials.breadcrumbs')
@endif
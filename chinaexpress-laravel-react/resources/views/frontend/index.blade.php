<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @langrtl dir="rtl" @endlangrtl>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @php
        $metaTitle = get_setting('meta_title',"taobao.com products selling website ");
        $metaDescription = get_setting('meta_description',"This app developed by avanteca");
    @endphp
    <title>@yield('title', $metaTitle)</title>
    <meta name="description" content="@yield('meta_description', $metaDescription)">
    <meta name="author" content="@yield('meta_author', 'Avanteca Ltd. Phone-01678077023')">

    @if(config('analytics.facebook-chat') === true)
        <meta property="fb:pages" content="{{env('FACEBOOK_PAGE_ID', '')}}"/>
    @endif
    <meta property="fb:app_id" content=""/>
    <meta property="og:local" content="{{ str_replace('_', '-', app()->getLocale()) }}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="{{url()->full()}}">
    <meta property="og:title" content="@yield('meta_title')">
    <meta property="og:description" content="@yield('meta_description')">
    <meta property="og:image" content="@yield('meta_image')">

    <link rel="shortcut icon" href="{{asset('img/brand/favicon.ico')}}" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="{{asset('img/brand/apple-touch-icon.png')}}">
    <link rel="icon" type="image/png" sizes="192x192" href="{{asset('img/brand/android-chrome-192x192.png')}}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{asset('img/brand/favicon-32x32.png')}}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('img/brand/favicon-16x16.png')}}">
    <link rel="manifest" href="{{asset('img/brand/site.webmanifest')}}">


    @yield('meta')

    @stack('before-styles')
<!-- Google Font -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet">

    <link href="{{ asset('assets/plugins/fontello/css/fontello.css') }}" rel="stylesheet">

    {{--  <link href="{{ asset('/frontend/css/icons.css') }}" rel="stylesheet">--}}
    {{--  <link href="{{ asset('/frontend/fontIcon/css/fontIcon.css') }}" rel="stylesheet">--}}

    @stack('middle-styles')

    <link rel="stylesheet" href="/css/bootstrap.min.css">
    {{--
    <link rel="stylesheet" href="/frontend/css/bootstrap.min.css"> --}}
    <link rel="stylesheet" href="/frontend/css/skins/skin-demo-26.css">
    <link rel="stylesheet" href="/frontend/css/demo-13-minimize.css">
    <link rel="stylesheet" href="/frontend/css/demos/demo-26.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css">


    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    @stack('after-styles')

    <script src="{{ mix('js/app.js') }}" defer></script>

</head>

<body>

@include('includes.partials.fb-chat')

@include('includes.partials.read-only')
@include('includes.partials.logged-in-as')

{{-- @include('frontend.includes.nav') --}}

@include('includes.partials.messages')


<div id="app">
    {{-- react component will append here --}}
</div>


{{-- @include('frontend.includes.footer') --}}

{{-- @include('includes.partials.profile-update-alert') --}}

@stack('before-scripts')
<script src="{{ asset('js/manifest.js') }}"></script>
<script src="{{ asset('js/vendor.js') }}"></script>
<script src="{{ asset('js/frontend.js') }}"></script>

{{script('assets/js/plugins/jquery.hoverIntent.min.js')}}
{{script('assets/js/plugins/jquery.waypoints.min.js')}}
{{script('assets/js/plugins/superfish.min.js')}}
{{script('assets/js/plugins/bootstrap-input-spinner.js')}}
{{script('assets/js/plugins/jquery.plugin.min.js')}}
{{script('assets/js/plugins/main.js')}}


@stack('after-scripts')


</body>

</html>
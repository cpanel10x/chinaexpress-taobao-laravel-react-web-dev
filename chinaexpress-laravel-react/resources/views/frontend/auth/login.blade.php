@extends('frontend.layouts.app')

@section('title', __('labels.frontend.auth.login_box_title'))

@section('content')
  <div class="main_content">
    <!-- START LOGIN SECTION -->
    <div class="section">
      <div class="container">
        <div class="align-items-center justify-content-center row" style="height: 100vh;">
          <div class="col-xl-5 col-md-5">
            <div class="card">
              <div class="card-header bg-white">
                <h3 class="card-title text-center m-0">Login</h3>
              </div>
              <div class="card-body">
                @include('frontend.auth.includes.socialite')

                <div class="loginWithEmail">
                  {{ html()->form('POST', route('frontend.auth.login.post'))->open() }}
                  <div class="form-group">
                    {{ html()->email('email')
                    ->class('form-control')
                    ->placeholder(__('validation.attributes.frontend.email'))
                    ->attribute('maxlength', 191)
                    ->required() }}
                  </div>
                  <div class="form-group">
                    {{ html()->password('password')
                    ->class('form-control')
                    ->placeholder(__('validation.attributes.frontend.password'))
                    ->required() }}
                  </div>
                  <div class="login_footer form-group">
                    {{html()->checkbox('remember')->value(1)->checked(true)}}
                    {{html()->label('Remember me')->for('remember')}}
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-secondary btn-block" name="login">Login
                    </button>
                  </div>
                  {{ html()->form()->close() }}
                </div>

                <div class="form-note text-center">
                  <a href="{{ route('frontend.auth.password.reset') }}">@lang('labels.frontend.passwords.forgot_password')</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> <!-- END LOGIN SECTION -->


  </div>
@endsection

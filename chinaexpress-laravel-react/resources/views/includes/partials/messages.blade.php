@if($errors->any())
<div class="modal fade" id="popupAlertModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="popupAlertModalLabel" aria-hidden="true" role="alert">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-danger" id="popupAlertModalLabel">Errors Found!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body px-4 py-3">
                @foreach($errors->all() as $error)
                {!! $error !!}<br />
                @endforeach
            </div>
            <div class="justify-content-center modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok, Understood</button>
            </div>
        </div>
    </div>
</div>

@elseif(session()->get('flash_success'))

<div class="modal fade" id="popupAlertModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="popupAlertModalLabel" aria-hidden="true" role="alert">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-success" id="popupAlertModalLabel">Congratulations!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body px-4 py-3">
                @if(is_array(json_decode(session()->get('flash_success'), true)))
                {!! implode('', session()->get('flash_success')->all(':message<br />')) !!}
                @else
                {!! session()->get('flash_success') !!}
                @endif
            </div>
            <div class="justify-content-center modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok, Understood</button>
            </div>
        </div>
    </div>
</div>


@elseif(session()->get('flash_warning'))

<div class="modal fade" id="popupAlertModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="popupAlertModalLabel" aria-hidden="true" role="alert">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-warning" id="popupAlertModalLabel">Warning for you!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body px-4 py-3">
                @if(is_array(json_decode(session()->get('flash_warning'), true)))
                {!! implode('', session()->get('flash_warning')->all(':message<br />')) !!}
                @else
                {!! session()->get('flash_warning') !!}
                @endif
            </div>
            <div class="justify-content-center modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok, Understood</button>
            </div>
        </div>
    </div>
</div>

@elseif(session()->get('flash_info'))

<div class="modal fade" id="popupAlertModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="popupAlertModalLabel" aria-hidden="true" role="alert">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-info" id="popupAlertModalLabel">Information for you!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body px-4 py-3">
                @if(is_array(json_decode(session()->get('flash_info'), true)))
                {!! implode('', session()->get('flash_info')->all(':message<br />')) !!}
                @else
                {!! session()->get('flash_info') !!}
                @endif
            </div>
            <div class="justify-content-center modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok, Understood</button>
            </div>
        </div>
    </div>
</div>

@elseif(session()->get('flash_danger'))

<div class="modal fade" id="popupAlertModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="popupAlertModalLabel" aria-hidden="true" role="alert">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-danger" id="popupAlertModalLabel">Danger Alert for you!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body px-4 py-3">
                @if(is_array(json_decode(session()->get('flash_danger'), true)))
                {!! implode('', session()->get('flash_danger')->all(':message<br />')) !!}
                @else
                {!! session()->get('flash_danger') !!}
                @endif
            </div>
            <div class="justify-content-center modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok, Understood</button>
            </div>
        </div>
    </div>
</div>

@elseif(session()->get('flash_message'))

<div class="modal fade" id="popupAlertModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="popupAlertModalLabel" aria-hidden="true" role="alert">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-info" id="popupAlertModalLabel">Danger Alert for you!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body px-4 py-3">
                @if(is_array(json_decode(session()->get('flash_message'), true)))
                {!! implode('', session()->get('flash_message')->all(':message<br />')) !!}
                @else
                {!! session()->get('flash_message') !!}
                @endif
            </div>
            <div class="justify-content-center modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok, Understood</button>
            </div>
        </div>
    </div>
</div>

@endif

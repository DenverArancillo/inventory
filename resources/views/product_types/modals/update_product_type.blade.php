<div class="modal fade" id="modal_update_prod_type" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
			{!! Form::open(['action' => ['ProductTypesController@update', ''], 'method' => 'PUT', 'id' => 'frm_prod_type']) !!}

				<div class="modal-header">
					<h3 class="modal-title">Update Brand</h3>
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				</div>
				<div class="modal-body">
					@csrf
					<div class="form-group row">
						{!! Form::label('type', 'Type', ['class' => 'col-sm-2 col-form-label']) !!}
						<div class="col-sm-10">
							{!! Form::text('type', '', ['class' => 'form-control', 'id' => 'inp_up_prod_type']) !!}
						</div>
					</div>
				</div>

				<div class="modal-footer">
					{!! Form::submit('Submit', ['class' => 'btn btn-primary']) !!}
					<button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
				</div>
			{!! Form::close() !!}
        </div>
    </div>
</div>
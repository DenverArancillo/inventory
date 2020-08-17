<div class="modal fade" id="add_brand" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
			{{ Form::open(['action' => 'BrandsController@store']) }}
				<div class="modal-header">
					<h3 class="modal-title">Add Brand</h3>
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				</div>
				<div class="modal-body">
						<div class="form-group row">
							{{ Form::label('brand_name', 'Title', ['class' => 'col-sm-2 col-form-label']) }}
							<div class="col-sm-10">
								{{ Form::text('brand_name', '', ['class' => 'form-control']) }}
							</div>
						</div>
						<div class="form-group row">
							{{ Form::label('brand_tags', 'Tags', ['class' => 'col-sm-2 col-form-label']) }}
							<div class="col-sm-10">
								{{ Form::text('brand_tags', '', ['class' => 'form-control']) }}
							</div>
						</div>
					
				</div>

				<div class="modal-footer">
					{{ Form::submit('Submit', ['class' => 'btn btn-primary']) }}
					<button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
				</div>
			{{ Form::close() }}
        </div>
    </div>
</div>
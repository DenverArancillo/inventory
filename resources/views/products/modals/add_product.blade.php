<div class="modal fade" id="modal_add_product" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
			{{ Form::open(['action' => 'ProductsController@store']) }}
				<div class="modal-header">
					<h3 class="modal-title">Add Product</h3>
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				</div>
				<div class="modal-body">
					@csrf
					<div class="form-group row">
						{{ Form::label('prod_name', 'Product Name', ['class' => 'col-sm-2 col-form-label']) }}
						<div class="col-sm-10">
							{{ Form::text('prod_name', '', ['class' => 'form-control', 'id' => 'inp_add_product_name']) }}
						</div>
                    </div>
                    
                    <div class="form-group row">
						{{ Form::label('type_id', 'Product Type', ['class' => 'col-sm-2 col-form-label']) }}
						<div class="col-sm-10">
							{{ Form::select('type_id', $product_types, null, ['class' => 'form-control', 'id' => 'inp_add_product_prod_type']) }}
						</div>
					</div>
					
					<div class="form-group row">
						{{ Form::label('brand_id', 'Brand', ['class' => 'col-sm-2 col-form-label']) }}
						<div class="col-sm-10">
							{{ Form::select('brand_id', $brands, null, ['class' => 'form-control', 'id' => 'inp_add_product_brands']) }}
						</div>
                    </div>   

                    <div class="form-group row">
						{{ Form::label('stock', 'Stock', ['class' => 'col-sm-2 col-form-label']) }}
						<div class="col-sm-10">
							{{ Form::number('stock', '', ['class' => 'form-control', 'id' => 'inp_add_product_stock', 'min' => '0']) }}
						</div>
                    </div>

                    <div class="form-group row">
						{{ Form::label('price', 'Price', ['class' => 'col-sm-2 col-form-label']) }}
						<div class="col-sm-10">
							{{ Form::number('price', '', ['class' => 'form-control', 'id' => 'inp_add_product_price', 'min' => '0', 'step' => '.01']) }}
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
@extends('layouts.app')
@section('content')
	@push('head')
		<link rel="stylesheet" href="{{ asset('assets/css/plugins/dataTables/datatables.min.css') }}">    
	@endpush

	<div class="col-md-12">
		<div class="ibox">
			<div class="ibox-title">
				<h5>Products</h5>
				<div class="ibox-tools ibox-tool-btn">
					<button type="button" class="btn btn-sm btn-primary btn-rounded" data-toggle="modal" data-target="#modal_add_product">
						<i class="fa fa-plus"></i> Add Products
					</button>
				</div>
			</div>
			<div class="ibox-content">
				<div class="table-responsive">
					<table class="table table-striped table-bordered table-hover dataTables-example">
						<thead>
							<tr>
								<th>Product</th>
								<th>Product Type</th>
								<th>Brand</th>
								<th>Stock</th>
								<th>Price/unit</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							@if (count($products) >= 1)
								@foreach ($products as $product)
									<tr>
										<td>{{ $product->prod_name }}</td>
										<td>{{ $product->type }}</td>
										<td>{{ $product->brand_name}}</td>
										<td>{{ $product->stock}}</td>
										<td>{{ $product->price }}</td>
										<td>
											<button class="btn btn-xs btn-circle  btn-primary" 
												data-toggle="modal" 
												data-target="#modal_update_product"
												data-info="{!! base64_encode(json_encode($product)) !!}"
												title="Update"
											>
												<i class="fa fa-pencil"></i>
											</button>
										</td>
									</tr>
								@endforeach                         
							@endif
						</tbody>
						<tfoot>
							<tr>
								<th>Product</th>
								<th>Product Type</th>
								<th>Brand</th>
								<th>Stock</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	</div>

	@include('products.modals.add_product', ['brands' => $brands, 'product_types', $product_types])
	@include('products.modals.update_product', ['brands' => $brands, 'product_types', $product_types])

	@push('script')
		<script src="{{ asset('assets/js/plugins/dataTables/datatables.min.js') }}"></script>
		<script src="{{ asset('assets/js/plugins/dataTables/dataTables.bootstrap4.min.js') }}"></script>
		
		<script src="{{ asset('components/products/products.js') }}"></script>
        @if (session('product'))
            <script>
                let data = {!! session('product') !!}
                if (data.type === 'warning') {
                    toastr[data.type](data.message);
                } else if (data.type === 'success') {
                    toastr[data.type](data.message);
                }
            </script>
        @endif
	@endpush
@endsection
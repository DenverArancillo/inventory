@extends('layouts.app')
@section('content')
    @push('head')
        <link rel="stylesheet" href="{{ asset('assets/css/plugins/dataTables/datatables.min.css') }}">    
    @endpush

    <div class="col-md-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>Product Type</h5>
                <div class="ibox-tools ibox-tool-btn">
                    <button type="button" class="btn btn-sm btn-primary btn-rounded" data-toggle="modal" data-target="#modal_add_prod_type">
                        <i class="fa fa-plus"></i> Add Product Type
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover dataTables-example">
                        <thead>
                            <tr>
                                <th>Product Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if (count($prod_types) >= 1)
                                @foreach ($prod_types as $prod_type)
                                    <tr>
                                        <td>{{ $prod_type->type }}</td>
                                        <td>
                                            <button class="btn btn-xs btn-circle btn-primary" 
                                                data-toggle="modal" 
                                                data-target="#modal_update_prod_type" 
                                                data-type="{{ $prod_type->type }}" 
                                                data-id="{!! base64_encode($prod_type->id) !!}" 
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
                                <th>Product Type</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>

    @include('product_types.modals.add_product_type')
    @include('product_types.modals.update_product_type')

    @push('script')
        <script src="{{ asset('assets/js/plugins/dataTables/datatables.min.js') }}"></script>
        <script src="{{ asset('assets/js/plugins/dataTables/dataTables.bootstrap4.min.js') }}"></script>

        <script src="{{ asset('components/product_types/product_types.js') }}"></script>
        @if (session('prod_type'))
            <script>
                let data = {!! session('prod_type') !!}
                if (data.type === 'warning') {
                    toastr[data.type](data.message);
                } else if (data.type === 'success') {
                    toastr[data.type](data.message);
                }
            </script>
        @endif
    @endpush
@endsection
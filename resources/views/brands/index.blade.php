@extends('layouts.app')
@section('content')
    @push('head')
        <link rel="stylesheet" href="{{ asset('assets/css/plugins/dataTables/datatables.min.css') }}">    
    @endpush

    <div class="col-md-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>Brands Page</h5>
                <div class="ibox-tools ibox-tool-btn">
                    <button type="button" class="btn btn-sm btn-primary btn-rounded" data-toggle="modal" data-target="#add_brand">
                        <i class="fa fa-plus"></i> Add Brand
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover dataTables-example">
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if (count($brands) >= 1)
                                @foreach ($brands as $brand)
                                    <tr>
                                        <td>{{ $brand->name }}</td>
                                        <td>
                                            <button class="btn btn-xs btn-circle btn-primary" 
                                                data-toggle="modal" 
                                                data-target="#update_brand" 
                                                data-name="{{ $brand->name }}" 
                                                data-id="{!! base64_encode($brand->id) !!}" 
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
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>

    @include('brands.modals.add_brand')
    @include('brands.modals.update_brand')

    @push('script')
        <script src="{{ asset('assets/js/plugins/dataTables/datatables.min.js') }}"></script>
        <script src="{{ asset('assets/js/plugins/dataTables/dataTables.bootstrap4.min.js') }}"></script>

        <script src="{{ asset('components/brands/brands.js') }}"></script>
        @if (session('brand'))
            <script>
                let data = {!! session('brand') !!}
                if (data.type === 'warning') {
                    toastr[data.type](data.message);
                } else if (data.type === 'success') {
                    toastr[data.type](data.message);
                }
            </script>
        @endif
    @endpush
@endsection

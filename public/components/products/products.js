$(document).ready(function(){
    $('.dataTables-example').DataTable({
        pageLength: 25,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'products'},
            {extend: 'pdf', title: 'products'},
            {
                extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ],
        columns: [
            null,
            null,
            null,
            null,
            null,
            { width: "10%" },
        ]
    });

    const base_url = $('#frm_product').attr('action');

    $("#modal_update_product").on('show.bs.modal', function(event) {

        let info = JSON.parse(atob($(event.relatedTarget).data('info')));
        let new_url = `${base_url}/${info.id}`;

        console.log(info);
        
        $('#frm_product').attr('action', new_url);

        $(this).find("#inp_up_product_name").val(info.prod_name);
        $(this).find("#inp_up_product_prod_type").val(info.type_id);
        $(this).find("#inp_up_product_brands").val(info.brand_id);
        $(this).find("#inp_up_product_stock").val(info.stock);
        $(this).find("#inp_up_product_price").val(info.price);

    });

});

$(document).ready(function(){
    $('.dataTables-example').DataTable({
        pageLength: 25,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'product_types'},
            {extend: 'pdf', title: 'product_types'},
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
            { width: "10%" },
        ]
    });

    const base_url = $('#frm_prod_type').attr('action');

    $('#modal_update_prod_type').on('show.bs.modal', function (event) {
        let id = atob($(event.relatedTarget).data('id'));
        let name = $(event.relatedTarget).data('type');

        let new_url = `${base_url}/${id}`;

        $('#frm_prod_type').attr('action', new_url);
        $(this).find('#inp_up_prod_type').val(name);
    });

});
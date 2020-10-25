$(document).ready(function(){
    $('.dataTables-example').DataTable({
        pageLength: 25,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'brands'},
            {extend: 'pdf', title: 'brands'},
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

    const base_url = $('#frm_brand_update').attr('action');

    $('#modal_update_brand').on('show.bs.modal', function (event) {
        let id = atob($(event.relatedTarget).data('id'));
        let name = $(event.relatedTarget).data('brand_name');

        let new_url = `${base_url}/${id}`;

        $('#frm_brand_update').attr('action', new_url);
        $(this).find('#inp_up_brand_name').val(name);
    });

});

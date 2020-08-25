$(document).ready(function(){
    $('.dataTables-example').DataTable({
        pageLength: 25,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},
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

    let base_url = $('#brnd_update').attr('action');

    $('#update_brand').on('show.bs.modal', function (event) {
        let id = atob($(event.relatedTarget).data('id'));
        let name = $(event.relatedTarget).data('name');

        let new_url = `${base_url}/${id}`;

        $('#brnd_update').attr('action', new_url);
        $(this).find('#update_brand_name').val(name);
    });

});

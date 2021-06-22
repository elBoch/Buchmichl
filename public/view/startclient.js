
$(document).ready(function(){
    $("#unterkunftlist").on('click',function(e){

        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/unterkunftlist',
            success: function(data) {
                window.location='/unterkunftlist';
            }
        }).done(function ( ) {
            console.log("OK");
            
        }).fail(function ( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });


    });

});
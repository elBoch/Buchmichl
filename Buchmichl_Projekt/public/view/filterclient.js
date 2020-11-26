$(document).ready(function(){
    $("#suchen").on('click',function(e){
        console.log("here we go");

        e.preventDefault();
        //var data = $('input[name=quote]').val();
        $.ajax({
            type: 'GET',
            url: '/ansicht',
            //contentType: 'application/json',
            //data: "test",
            success: function(data) {
                console.log("Successfully saved the matched beans to the user.");
                window.location='/ansicht';
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
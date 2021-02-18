$(document).ready(function () {
    $("#anmelden").on('click', function (e) {

        var username = document.getElementById('username').value;
        var passwort = document.getElementById('passwort').value;
        var redirect = false;

        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/authenticate',
            data: {
                name: username,
                passw: passwort
            },
            success: function (data) {
                console.log("Successfully saved the matched beans to the user.");

            }
        }).done(function (data) {

            if (data.query == "ok") {

                $.ajax({
                    type: 'GET',
                    url: '/filter',
                    data: {
                        name: username,
                        passw: passwort
                    },
                    success: function (data) {
                        console.log("Successfully saved the matched beans to the user.");
                        window.location = '/filter';
                    }
                }).done(function () {
                    console.log("OK");

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);

                });

            }
            else{
                alert("Falsche Eingabe");
            }

        });

    });
});

$(document).ready(function () {
    $("#regestrieren").on('click', function (e) {

        var username = document.getElementById('r_username').value;
        var passwort = document.getElementById('r_passwort').value;
        var email = document.getElementById('r_email').value;

        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/register',
            data: {
                name: username,
                passw: passwort,
                email: email
            },
            success: function (data) {
                console.log("Successfully saved the matched beans to the user.");

            }
        });

    });
});

$(document).ready(function(){
    $("#home").on('click',function(e){
        console.log("here we go");

        e.preventDefault();
        //var data = $('input[name=quote]').val();
        $.ajax({
            type: 'GET',
            url: '/',
            //contentType: 'application/json',
            //data: "test",
            success: function(data) {
                console.log("Successfully saved the matched beans to the user.");
                window.location='/';
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
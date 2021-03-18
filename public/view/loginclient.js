$(document).ready( () => {
    $("#anmelden").on('click', function (e) {

        const username = document.getElementById('username').value;
        const passwort = document.getElementById('passwort').value;
        let redirect = false;

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
                console.log(data);
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

$(document).ready(() => {
    $("#regestrieren").on('click', function (e) {

        const username = document.getElementById('r_username').value;
        const passwort = document.getElementById('r_passwort').value;
        const email = document.getElementById('r_email').value;

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
                console.log(data);
                alert(data);
                if(data=='register successed'){
                    window.location = "/filter";
                }

            }
        });

    });
});

$(document).ready(() => {
    $("#home").on('click',e => {
        console.log("here we go");

        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/',
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
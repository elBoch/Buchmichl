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
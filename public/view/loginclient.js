/**
 * Login-Daten holen und Request zum authentifizieren.
 */


$(document).ready(() => {
    $("#anmelden").on('click', function (e) {

        const username = document.getElementById('l_username').value;
        const passwort = document.getElementById('l_passwort').value;
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/authenticate',
            data: {
                name: username,
                passw: passwort
            },
            success: function (data) {
            }
        }).done(function (data) {

            if (data.query == "ok") {
                $.ajax({
                    type: 'GET',
                    url: '/unterkunftlist',
                    success: function (data) {
                        window.location = '/unterkunftlist';
                    }
                });
            }
            else {
                alert("Falsche Eingabe");
            }

        });

    });
});

$(document).ready(() => {
    $("#regestrieren").on('click', function (e) {
        try{
        const username = document.getElementById('r_username').value;
        const passwort = document.getElementById('r_passwort').value;
        const passwort_repeat = document.getElementById('r_repeat_passwort').value;
        const email = document.getElementById('r_email').value;
        const vorname = document.getElementById("r_firstname").value;
        const nachname = document.getElementById("r_lastname").value;
        const date = document.getElementById("r_date").value;
        const realDate = Date.parse(date);
        const admin = document.getElementById("checkboxAdmin").checked;
        const telefonnnummer = document.getElementById("r_telefonnummer").value;

        if(passwort === passwort_repeat){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/register',
                data: {
                    username: username,
                    passwort: passwort,
                    email: email,
                    vorname:vorname,
                    nachname:nachname,
                    date:date,
                    admin:admin,
                    telefonnnummer:telefonnnummer,
                },
                success: function (data) {
                    console.log(data);
                    alert(data);
                    if (data == 'register successed') {
                        window.location = "/unterkunftlist";
                    }
    
                }
            });
        }else{
            alert("Bitte geben Sie zweimal das gleiche Passwort ein.");
        }

    }
    catch(err){
        alert("Bitte alles Ausfüllen!");
    }
    });
});
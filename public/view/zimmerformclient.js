let unterkunftname;
let zimmerart;
let personen;
let preis;
let zimmername;
let zimmerausstattung;
let verpflegung;

$(document).ready(function() {
    $("#create").on("click", function(e) {
      console.log("here we go");

        if (valid()) {
            zimmerausstattung = getOptionalData("zimmerausstattung");
            verpflegung = getOptionalData("verpflegung");
            $.ajax({
                type: 'POST',
                url: '/createZimmer',
                //contentType: 'application/json',
                //data: "test",
                data: {
                    unterkunftname: unterkunftname, zimmerart: zimmerart,
                    personen: personen, preis: preis, zimmername: zimmername,
                    zimmerausstattung: zimmerausstattung, verpflegung: verpflegung,
                },
                success: function(data) {
                    console.log("Successfully saved the matched beans to the user.");
                    //window.location='/unterkunftlist';
                    if (data == "success") {
                        alert("Huray! Successful insert!");
                        $.ajax({
                            type: "GET",
                            url: "/kontodetails",
                            success: (data) => {
                                console.log("Successfully saved the matched beans to the user.");
                                window.location = "/kontodetails";
                            },
                        });
                    } else {
                        alert("something went wrong! Try again!");
                    }
                }
            }).done(function ( ) {
                console.log("OK");
                
            }).fail(function ( jqXHR, textStatus, errorThrown ) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
        } else {
            alert("Bitte notwendige Felder ausfüllen");
        }
    });
});

const getOptionalData = (type) => {
    let dataNames = new Array();
    let boxen;
    switch (type) {
        case "zimmerausstattung":
            boxen = document.getElementsByClassName("zimmercheckboxen");
            break;
        case "verpflegung":
            boxen = document.getElementsByClassName("verpflegungcheckboxen");
            break;
    }
    for (let i = 0; i < boxen.length; i++) {
        if (boxen[i].checked) {
            dataNames.push(boxen[i].id);
        }
    }
    console.log(dataNames);
    return dataNames;

}

const valid = () => {

    unterkunftname = document.getElementById("unterkunftSelected").value;
    zimmerart = document.getElementById("zimmerart").value;
    personen = document.getElementById("personen").value;
    preis = document.getElementById("preis").value;
    zimmername = document.getElementById("zimmer-name").value;

    let checkArray = [unterkunftname, zimmerart, personen, preis, zimmername];
    for (let i = 0; i < checkArray.length; i++) {
        if (checkArray[i] == '')
            return false;
    }

    switch (zimmerart) {
        case "Einzelzimmer":
            if (personen == "1")
                return true;
            break;

        case "Doppelzimmer":
            if (personen == "2")
                return true;
            break;

        case "Familienzimmer":
            if (personen >= "3")
                return true;
            break;

        default:
            return true;
    }
    return false;
}
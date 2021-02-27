$(document).ready(function(){
    $("#suchen").on('click',function(e){
        console.log("here we go");

        var region = document.getElementById("region").value;
        var sterne = document.getElementById("sterne").value.split(' ')[0];
        var preis_von = document.getElementById("preis_von").value;
        var preis_bis = document.getElementById("preis_bis").value;
        var anz_pers = document.getElementById("anz_pers").value;
        var unterkunftart = document.getElementById("unterkunftart").value;

        console.log(region,sterne,preis_von,preis_bis,anz_pers,unterkunftart);

        e.preventDefault();
        //var data = $('input[name=quote]').val();
        $.ajax({
            type: 'POST',
            url: '/getUnterkunftList',
            //contentType: 'application/json',
            data: {
                region: region,
                sterne:sterne,
                preis_von: preis_von,
                preis_bis:preis_bis,
                anz_pers:anz_pers,
                unterkunftart:unterkunftart
            },
            success: function(data) {
                console.log("Successfully saved the matched beans to the user.");
                console.log(data);
                //window.location.reload();
                printData(data);
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

function printData(data) {
    var temp = document.getElementsByTagName("template")[0];

    //console.log(data[0].unterkunftname);
    for(let i = 0; i < data.length; i++) {   
        if(i == 0 || data[i].unterkunftartname != data[i-1].unterkunftartname) {
            try{
                var clone = temp.content.cloneNode(true);
                clone.getElementById("t_name").innerHTML = data[i].unterkunftname;
                clone.getElementById("t_price").innerHTML = "Preis: " + data[i].preis + "€";
                clone.getElementById("t_art").innerHTML = "Art: " + data[i].unterkunftartname;
                clone.getElementById("t_region").innerHTML = "Region: " + data[i].regionname;
                clone.getElementById("t_stars").innerHTML = "Sterne: " + data[i].sterne;
                document.body.appendChild(clone);
            }catch(error){

            }
        }        
    }
}
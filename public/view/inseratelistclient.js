/**
 * Request für alle Inserate und diese ausgeben.
 */


window.onload = () => {

    $.ajax({
        type: "GET",
        url: "/getInserate",
        success: function (data) {
            printData(data);
        },
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    });
};

const printData = (data) => {
    let temp = document.getElementsByTagName("template")[0];
    let zimmertemp = document.getElementsByTagName("template")[1];

    document.getElementById("list").innerHTML = "";
    console.log(data[0][1].length);

    for (let i = 0; i < data.length; i++) {
        if (i == 0 || data[i][0].unterkunftid !== data[i - 1][0].unterkunftid) {
            console.log("neue Unterkunft");
            let clone = temp.content.cloneNode(true);
            clone.getElementById("t_name").innerHTML = data[i][0].unterkunftname;
            clone.getElementById("t_art").innerHTML = "<b>Art: </b>" + data[i][0].unterkunftartname;
            clone.getElementById("t_stars").innerHTML = "<b>Sterne: </b>" + data[i][0].sterne;
            document.getElementById("list").appendChild(clone);

            for (let j = 0; j < data[i][1].length; j++) {
                if (i == 0 || data[i][1][j].zimmerid !== data[i - 1][1][j].zimmerid) {
                    console.log("neue Zimmer");
                    let zimmerclone = zimmertemp.content.cloneNode(true);
                    zimmerclone.getElementById("t_name2").innerHTML = data[i][1][j].zimmername;
                    zimmerclone.getElementById("t_art2").innerHTML = "<b>Art: </b>" + data[i][1][j].zimmerartname;
                    zimmerclone.getElementById("t_anzahlpersonen").innerHTML = "<b>Personen: </b>" + data[i][1][j].anzahlpersonen;
                    zimmerclone.getElementById("t_preis").innerHTML = "<b>Preis: </b>" + data[i][1][j].preis;
                    document.getElementById("list").appendChild(zimmerclone);
                }
            }
        }

    }
}
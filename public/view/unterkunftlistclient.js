
$(document).ready(() => {
  $("#suchen").on("click",(e) => {
    console.log("here we go");

    let region = document.getElementById("region").value;
    let sterne = document.getElementById("sterne").value.split(" ")[0];
    let preis_von = document.getElementById("preis_von").value;
    let preis_bis = document.getElementById("preis_bis").value;
    let anz_pers = document.getElementById("anz_pers").value;
    let unterkunftart = document.getElementById("unterkunftart").value;

    //console.log(region, sterne, preis_von, preis_bis, anz_pers, unterkunftart);

    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/getUnterkunftList",
      data: {
        region: region,
        sterne: sterne,
        preis_von: preis_von,
        preis_bis: preis_bis,
        anz_pers: anz_pers,
        unterkunftart: unterkunftart,
      },
      success: (data) => {
        console.log("Successfully saved the matched beans to the user.");
        //console.log(data);

        printData(data);
      },
    })
      .done(() => {
        console.log("OK");
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
  });
});

const printData = (data) => {
  let temp = document.getElementsByTagName("template")[0];

  document.getElementById("list").innerHTML = "";
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    if ( i == 0 || data[i].unterkunftid !== data[i - 1].unterkunftid) {
      //console.log(i);
      try {
        let clone = temp.content.cloneNode(true);
        clone.getElementById("t_name").innerHTML = data[i].unterkunftname;
        clone.getElementById("t_name").style.marginTop = "0";
        clone.getElementById("t_art").innerHTML = "<b>Art: </b>" + data[i].unterkunftartname;
        clone.getElementById("t_region").innerHTML = "<b>Region: </b>" + data[i].regionname;
        clone.getElementById("t_stars").innerHTML = "<b>Sterne: </b>" + data[i].sterne;
        //clone.getElementById("t_anz_pers").innerHTML = "<b>Personen: </b>" + data[i].anzahlpersonen;
        clone.getElementById("bt_details").value = data[i].unterkunftname;
        /*if (i === 0) {
          clone.getElementById("t_hr").style.display = "none";
        }*/
        document.getElementById("list").appendChild(clone);
      } catch (error) {}
    }
  }
}

const clicked = (value) => {

  //send which unterkunft should be displayed
  
  console.log(value);
  $.ajax({
    type: "POST",
    url: "/unterkunftdetails",
    data:{ unterkunft: value},
    success: (data) => {
      console.log("Successfully saved the matched beans to the user.");
      window.location = "/unterkunftdetails";
    },
  })
    .done(() => {
      console.log("OK");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    });

  $.ajax({
    type: "GET",
    url: "/unterkunftdetails",
    success: (data) => {
      console.log("Successfully saved the matched beans to the user.");
      window.location = "/unterkunftdetails";
    },
  })
    .done(() => {
      console.log("OK");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    });
}

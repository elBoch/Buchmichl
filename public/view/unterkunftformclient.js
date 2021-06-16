let unterkunftname, unterkunftart;
let unterkunftbeschreibung;
let region, strasse, nummer, ort, plz, sterne;
let unterkunftausstattung, freizeitausstattung;

$(document).ready(() => {
  $("#create").on("click", (e) => {
    console.log("here we go");

    if (valid()) {
      unterkunftausstattung = getOptionalData("unterkunftausstattung");
      freizeitausstattung = getOptionalData("freizeitausstattung");

      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/createUnterkunft",
        data: {
          unterkunftname: unterkunftname, unterkunftart: unterkunftart,
          unterkunftbeschreibung: unterkunftbeschreibung, region: region,
          strasse: strasse, nummer: nummer, ort: ort, plz: plz, sterne: sterne,
          unterkunftausstattung:unterkunftausstattung,
          freizeitausstattung:freizeitausstattung,
        },
        success: function(data) {
          console.log("Successfully saved the matched beans to the user.");
          if(data=="success"){
            alert("Huray! Successful insert!");
            $.ajax({
              type: "GET",
              url: "/kontodetails",
              success: function (data) {
                console.log("Successfully saved the matched beans to the user.");
                window.location = "/kontodetails";
              },
            });
          }
          else{
            alert("something went wrong! Try again!");
          }
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
    else {
      alert("Bitte notwendige Felder ausfüllen");
    }

  });
});

const getOptionalData = (type) => {
  let dataNames = new Array();
  let boxen;
  switch (type) {
    case "unterkunftausstattung":
      boxen = document.getElementsByClassName("unterkunftcheckboxen");
      break;
      case "freizeitausstattung":
        boxen = document.getElementsByClassName("freizeitcheckboxen");
        break;
  }
  for (let i = 0; i < boxen.length; i++) {
    if(boxen[i].checked){
      dataNames.push(boxen[i].id);
    }
  }
  console.log(dataNames);
  return dataNames;

}
const valid = () => {
  unterkunftname = document.getElementById("unterkunft-name").value;
  unterkunftart = document.getElementById("unterkunftart").value;
  unterkunftbeschreibung = document.getElementById("unterkunft-description").value;
  region = document.getElementById("region").value;
  strasse = document.getElementById("street").value;
  nummer = document.getElementById("house-number").value;
  ort = document.getElementById("location").value;
  plz = document.getElementById("plz").value;
  sterne = document.getElementById("stars").value;
  let checkArray = [unterkunftname, unterkunftart, unterkunftbeschreibung, region, strasse, nummer, ort, plz, sterne];
  for (let i = 0; i < checkArray.length; i++) {
    if (checkArray[i] == '') {
      return false;
    }
  }
  return true;
}
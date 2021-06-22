window.onload = () => {
  console.log("lol");
  $.ajax({
    type: "POST",
    url: "/getRoomList",
    success: (data) => {
      printData(data);
    },
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  });
};




const zimmerdetails = (value) => {
  let unterkunft = document.getElementById("unterkunft").innerText;
  let zimmer = value
  $.ajax({
    type: "POST",
    url: "/zimmerdetails",
    data:{unterkunft: unterkunft, zimmer:zimmer},
    success: function (data) {
      
      $.ajax({
        type: "GET",
        url: "/zimmerdetails",
        success: function (data) {
          window.location = "/zimmerdetails";
        },
      });
    },
  });
}

function currentDiv(n) {
  showDivs((slideIndex = n));
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  x[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " w3-opacity-off";
}

const printData = (data) => {
  console.log(data);
  let temp = document.getElementsByTagName("template")[0];

  document.getElementById("list").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    if ( i == 0 || data[i].zimmerid !== data[i - 1].zimmerid) {
        let clone = temp.content.cloneNode(true);
        clone.getElementById("t_name").innerHTML = data[i].zimmername;
        clone.getElementById("t_name").style.marginTop = "0";
        clone.getElementById("t_personen").innerHTML = "<b>Personen: </b>" + data[i].anzahlpersonen;
        clone.getElementById("t_zimmerart").innerHTML = "<b>Zimmerart: </b>" + data[i].zimmerartname;
        clone.getElementById("t_price").innerHTML = "<b>Preis: </b>" + data[i].preis;
        clone.getElementById("detailRoom").value = data[i].zimmername+","+data[i].preis;
        document.getElementById("list").appendChild(clone);
    }
  }
};

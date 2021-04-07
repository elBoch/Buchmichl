
$(document).ready(function () {
  $("#home").on("click", function (e) {
    console.log("here we go");

    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "/",
      success: function (data) {
        console.log("Successfully saved the matched beans to the user.");
        window.location = "/";
      },
    })
      .done(function () {
        console.log("OK");
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
  });
});
$(document).ready(() => {
  $("#konto").on("click", function (e) {
    console.log("here we go");

    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "/kontodetails",
      success: function (data) {
        console.log("Successfully saved the matched beans to the user.");
        window.location = "/kontodetails";
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
  });
});

window.onload = () => {
  console.log("lol");
  $.ajax({
    type: "POST",
    url: "/getRoomList",
    success: (data) => {
      printData(data);
      console.log(data);
    },
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  });
};


$(document).ready(() => {
  $("#logout").on("click", function (e) {
    console.log("here we go");

    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "/logout",
      success: function (data) {
        console.log("Successfully saved the matched beans to the user.");
        window.location = "/";
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
  });
});
$(document).ready(() => {
  $("#login").on("click", function (e) {
    console.log("here we go");

    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "/login",
      success: function (data) {
        console.log("Successfully saved the matched beans to the user.");
        window.location = "/login";
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
  });
});

const zimmerdetails = () => {
  $.ajax({
    type: "POST",
    url: "/zimmerdetails",
    success: function (data) {
      
      window.location = "/zimmerdetails";
    },
  })
  $.ajax({
    type: "GET",
    url: "/zimmerdetails",
    success: function (data) {
      console.log("Successfully saved the matched beans to the user.");
      window.location = "/zimmerdetails";
    },
  })
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

/* Martin's Spaßecke */

const printData = (data) => {
  let temp = document.getElementsByTagName("template")[0];

  document.getElementById("list").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
        let clone = temp.content.cloneNode(true);
        clone.getElementById("t_name").innerHTML = data[i].zimmerartname;
        clone.getElementById("t_name").style.marginTop = "0";
        clone.getElementById("t_personen").innerHTML = "<b>Personen: </b>" + data[i].anzahlpersonen;
        clone.getElementById("t_zimmerart").innerHTML = "<b>Zimmerart: </b>" + data[i].zimmerartname;
        clone.getElementById("t_price").innerHTML = "<b>Preis: </b>" + data[i].preis;
        clone.getElementById("detailRoom").value = data[i].zimmerartname;
        document.getElementById("list").appendChild(clone);
  }
};

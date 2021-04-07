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
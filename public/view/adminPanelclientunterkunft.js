$(document).ready(() => {
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

  window.onload=() => {
    $.ajax({
      type: "GET",
      url: "/checkIfAuthenticated",
      success: function (data) {
        console.log("Successfully saved the matched beans to the user.Authenticted");
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
};
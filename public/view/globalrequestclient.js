$(document).ready(function () {
    $("#home").on("click", function (e) {
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/",
        success: function (data) {
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
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/kontodetails",
        success: function (data) {
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

  $(document).ready(() => {
    $("#logout").on("click", function (e) {
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/logout",
        success: function (data) {
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
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/login",
        success: function (data) {
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
$(document).ready(() => {
    $("#adminPanelUnterkunft").on("click", (e) => {
      console.log("here we go");
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/adminPanelUnterkunft",
        success: function (data) {
          console.log("Successfully saved the matched beans to the user.");
          window.location = "/adminPanelunterkunft";
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
    $("#adminPanelZimmer").on("click", (e) => {
      console.log("here we go");
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/adminPanelZimmer",
        success: function (data) {
          console.log("Successfully saved the matched beans to the user.");
          window.location = "/adminPanelzimmer";
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
    $("#home").on('click', e => {
        console.log("here we go");

        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/',
            success: function (data) {
                console.log("Successfully saved the matched beans to the user.");
                window.location = '/';
            }
        }).done(function () {
            console.log("OK");

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });


    });


});
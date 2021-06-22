$(document).ready(() => {
    $("#unterkunftform").on("click", (e) => {
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/unterkunftform",
        success: function (data) {
          window.location = "/unterkunftform";
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
    $("#zimmerform").on("click", (e) => {
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/zimmerform",
        success: function (data) {
          window.location = "/zimmerform";
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
    $("#inseratelist").on("click", (e) => {
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/inseratelist",
        success: function (data) {
          window.location = "/inseratelist";
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
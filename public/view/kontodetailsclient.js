$(document).ready(() => {
    $("#unterkunftform").on("click", (e) => {
      console.log("here we go");
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/unterkunftform",
        success: function (data) {
          console.log("Successfully saved the matched beans to the user.");
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
      console.log("here we go");
  
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/zimmerform",
        success: function (data) {
          console.log("Successfully saved the matched beans to the user.");
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

$(document).ready(function(){
  $("#login").on('click',function(e){
      console.log("here we go");

      e.preventDefault();
      //var data = $('input[name=quote]').val();
      $.ajax({
          type: 'GET',
          url: '/login',
          //contentType: 'application/json',
          //data: "test",
          success: function(data) {
              console.log("Successfully saved the matched beans to the user.");
              window.location='/login';
          }
      }).done(function ( ) {
          console.log("OK");
          
      }).fail(function ( jqXHR, textStatus, errorThrown ) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
      });


  });

});

$(document).ready(function(){
  $("#logout").on('click',function(e){
      console.log("here we go");

      e.preventDefault();
      //var data = $('input[name=quote]').val();
      $.ajax({
          type: 'GET',
          url: '/logout',
          //contentType: 'application/json',
          //data: "test",
          success: function(data) {
              console.log("Successfully saved the matched beans to the user.");
              window.location='/';
          }
      }).done(function ( ) {
          console.log("OK");
          
      }).fail(function ( jqXHR, textStatus, errorThrown ) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
      });


  });

});
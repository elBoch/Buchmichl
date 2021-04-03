$(document).ready(function(){
    $("#home").on('click',function(e){
        console.log("here we go");

        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/',
            success: function(data) {
                console.log("Successfully saved the matched beans to the user.");
                window.location='/';
            }
        }).done(function() {
            console.log("OK");
            
        }).fail(function ( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });


    });


});

function currentDiv(n) {
    showDivs(slideIndex = n);
  }
  
  function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " w3-opacity-off";
  }
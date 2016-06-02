$( document ).ready(function() {

// smoth scroll 
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

 var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/"));
     $("#fixednavbar ul li a").each(function(){
          if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
          $(this).addClass("active");
     })

// team toggle
$('.nav-icon a').click(function(){
  $('nav').slideToggle();
});

$('#team-toggler').click(function(){
 $('#full-team').slideToggle('slow', function() {
        if ($(this).is(':visible')) {
             $('#team-toggler button').text('Collapse team directory');
        } else {
             $('#team-toggler button').text('View full team directory');
        }
    });
});

// mail service

$("#contact-form").submit(function(e) {
  e.preventDefault();

  var mailModel = {
    Name : $("#contact-name").val(),
    Email : $("#contact-email").val(),
    ProjectName : $("#contact-project").val(),
    Message : $("#contact-message").val()
  };

  $("#contact-form").hide();
  $("#sending-message").show();
  $.ajax({
    type : "POST",
    url : "http://emailer-3.apphb.com/Mail",
    data : mailModel,
    success : function(msg) {
      $("#sending-message").hide();
      $("#success-message").show();
    },
    error : function(error) {      
      $("#sending-message").hide();
      $("#contact-form").show();
    }
  });
  $("#client-name").val("");
  $("#client-email").val("");
  $("#client-project").val("");
  $("#client-message").val("");
  return false;
}); 

});


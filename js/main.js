$(document).ready(function() {

    $(function() {
        $('.tabs li').on('click', function() {
            var $panel = $(this).closest('.tab-panels');

            $panel.find('.tabs li.active').removeClass('active');
            $(this).addClass('active');

            //figure out which panel to show
            var panelToShow = $(this).attr('rel');

            //hide current panel
            $panel.find('.panel.active').fadeOut(400, showNextPanel);

            //show next panel
            function showNextPanel() {
                $(this).removeClass('active');

                $('#' + panelToShow).fadeIn(300, function() {
                    $(this).addClass('active');
                });
            }
        });

        $('.tech .tech__tabs li').on('click', function() {
            var $panel = $(this).closest('.tech');

            $panel.find('.tech__tabs li.tech--active').removeClass('tech--active');
            $(this).addClass('tech--active');

            //figure out which panel to show
            var panelToShow = $(this).attr('rel');

            //hide current panel
            $panel.find('.tech__panel.tech--active').fadeOut(300, showNextPanel);

            //show next panel
            function showNextPanel() {
                $(this).removeClass('tech--active');

                $('#' + panelToShow).fadeIn(300, function() {
                    $(this).addClass('tech--active');
                });
            }
        });

          // smoth scroll
          $(function () {
            $('a[href*="#"]:not([href="#"])').click(function () {
              if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                  $('html, body').animate({
                    scrollTop: target.offset().top
                  }, 1000);
                  return false;
                }
              }
            });
          });

        var formContainerID = '#form-container';
        var confirmationID = '#md-confirmation';
        var subscribeFront = '#subscribe-front';
        var subscribeBack = '#subscribe-back';
        var subscribeLabel = '#subscribe-labels';
        var overlay = '.md-overlay';
        showDOMElement = function(show, domElement) {
            if (show) {
                var modal = document.querySelector(domElement);
                classie.remove(modal, 'md-hide');
                classie.add(modal, 'md-show');
            } else {
                var modal = document.querySelector(domElement);
                classie.remove(modal, 'md-show');
                classie.add(modal, 'md-hide');
            }
        }

        fadeOutTimeMs = 3000;
        fadeOutViewModel = function(factor) {
            $("#modal-13").fadeOut(factor);
            var modal = document.querySelector('#modal-13');
            classie.remove(modal, 'md-show');
        }

        resetFormFields = function() {
            $("#contact-name").val("");
            $("#contact-email").val("");
            $("#contact-message").val("");
        }

        resetSubscribeFields = function() {
            $("#subscribe-email").val("");
        }

        // mail service
        $("#contact-form").submit(function(e) {
            e.preventDefault();
            $(formContainerID).hide();
            var mailModel = {
                Name: $("#contact-name").val(),
                Email: $("#contact-email").val(),
                Message: $("#contact-message").val(),
                ProjectName: 'Contact Form'
            };
        $.ajax({
                type: "POST",
                url: "http://emailer-3.apphb.com/Mail",
                data: JSON.stringify(mailModel),
                contentType: "application/json; charset=utf-8",
                success: function(msg) {
                    $(overlay).delay(1200).fadeOut(600);
                    $(confirmationID).show().delay(2000).fadeOut(300);
                }
            }).then(function(data) {
                resetFormFields();
            });
            return false;
        });

        // mailgun mailing list - subscribe service
        $(this).ready(function() {
            $("#acklen-subscribe").submit(function(e) {
                e.preventDefault();

                var model = {
                    "email": $("#subscribe-email").val(),
                    "id": "5968f1a1f36d280e6aca4858"
                };

                $.ajax({
                    type: "POST",
                    url: "https://ancient-crag-99619.herokuapp.com/send-email",
                    data: JSON.stringify(model),
                    contentType: "application/json; charset=utf-8",
                    success: function(msg) {
                        showDOMElement(false, subscribeFront);
                        showDOMElement(false, subscribeLabel);
                        showDOMElement(true, subscribeBack);
                    }
                }).then(function(data) {
                    resetSubscribeFields();
                });
                return false;
            });
        });

          //team gravatar
          $(".member-card .member-card__img-container .member-card__img").each(function () {
            $(this).attr("src", "https://www.gravatar.com/avatar/" + md5($(this).attr("alt")) + "?s=400&d=mm");
          });
    });
});
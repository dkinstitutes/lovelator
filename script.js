var divination = [
    "Calculating star charts",
    "Reading tea leafs",
    "Sacrificing a goat",
    "Consulting Mayan calenders",
    "Checking blood types",
    "Tracing palm lines"
];

function rndMsg() {
    var rndNum = Math.floor(Math.random() * divination.length);
    if (divination[rndNum].slice(5) == $("#div-msg").text().trim().slice(5)) {
        rndMsg();
    } else {
        var dM = divination[rndNum];
        $("#div-msg").text(dM);
        setTimeout(function() {
            $("#div-msg").text(dM + ".");
        }, 200);
        setTimeout(function() {
            $("#div-msg").text(dM + "..");
        }, 400);
        setTimeout(function() {
            $("#div-msg").text(dM + "...");
        }, 600);
    }
}

$(document).ready(function() {
    setInterval(function() {
        rndMsg();
    }, 1200);
    //$("#name1").focus();
    $("#name1-label").click(function() {
        $("#name1").focus();
    });
    $("#name2-label").click(function() {
        $("#name2").focus();
    });
    $("input").keypress(function(e) {
        if (e.which == 13) {
            $("#calculate").click();
        }
    });

    $("#calculate").click(function() {
        var name1 = $("#name1").val();
        var name2 = $("#name2").val();

        if (name1.length > 0 && name2.length > 0) {
            var seed = name1.length + name2.length;
            var megaName = name1 + " " + name2;
            var today = new Date();
            var love = 0;
            megaName = megaName.split("");
            for (i = 0; i < megaName.length; i++) {
                seed += megaName[i].charCodeAt(0);
            }
            seed = seed / (today.getMonth() + today.getDay());
            seed = Math.round(seed);
            seed = seed.toString().slice(-2);
            if (seed == "00") {
                seed = "100";
            }

            love = parseInt(seed);
            $("#initial-prompt").animate(
                {
                    height: 0,
                    width: 0,
                    opacity: 0
                },
                300,
                function() {
                    $("#initial-prompt").hide(function() {
                        $("#calculating").fadeIn(300, function() {
                            setTimeout(function() {
                                $("#love-results").html(
                                    name1 +
                                        " and " +
                                        name2 +
                                        " have a <strong>" +
                                        love +
                                        "%</strong> compatibility rating as of now."
                                );
                                $("#calculating").fadeOut(300, function() {
                                    $("#results").fadeIn(300, function() {
                                        $("#try-again").focus();
                                    });
                                });
                            }, 3000);
                        });
                    });
                }
            );
        } else {
            $("#warning").animate(
                {
                    opacity: 1
                },
                300
            );
        }
    });

    $("#try-again").click(function() {
        $("#initial-prompt").css({
            height: "auto",
            width: "100%",
            opacity: 1
        });
        $("#name1").val("");
        $("#name2").val("");
        $("#results").fadeOut(300, function() {
            $("#initial-prompt").fadeIn(300, function() {
                $("#name1").focus();
            });
        });
    });
});

(function($) { // Begin jQuery
    $(function() { // DOM ready
      // If a link has a dropdown, add sub menu toggle.
      $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        // Close one dropdown when selecting another
        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      });
      // Clicking away from dropdown will remove the dropdown class
      $('html').click(function() {
        $('.nav-dropdown').hide();
      });
      // Toggle open and close nav styles on click
      $('#nav-toggle').click(function() {
        $('nav ul').slideToggle();
      });
      // Hamburger to X toggle
      $('#nav-toggle').on('click', function() {
        this.classList.toggle('active');
      });
    }); // end DOM ready
  })(jQuery); // end jQuery
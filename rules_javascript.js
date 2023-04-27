$(document).ready(function(){
    var chiusura = $("#chiusuraRegole");

    $(chiusura).click(function(){
        $("#mainContainer").fadeOut(2000, function(){ //funzione di callback
            $("#backToHomePage").css("opacity", "1").css("transition", "1.2s");
        });
    });

    $("#backToHomePage button").mouseover(function(){
        $("#backToHomePage button a ").html("torna alla Home Page &hArr;");
    });

    $("#backToHomePage button").mouseout(function(){
        $("#backToHomePage button a").html("torna alla Home Page &rarr;");
    });

    $(".card").hide();
    $("#showRule").click(function(){
        $("#mainContainer").css({"height": "550px", "transition": "1s"});
        $(".card").fadeIn(3500);
        $("#showRule").css({"background-color": "rgb(92, 172, 209)", "color": "white"});
    });

});
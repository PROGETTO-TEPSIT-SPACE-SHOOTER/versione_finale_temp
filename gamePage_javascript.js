$(document).ready(function(){
    $(".card").mouseover(function(event){
        $(event.target).addClass("opaco");
    });

    $(".card").mouseout(function(event){
        $(event.target).removeClass("opaco");
    });

});
$(document).ready(function(){
    localStorage["TextureSelected"];

    // selezioniamo tutte le immagini con la classe "placeholder"
    const images = document.querySelectorAll('.dd');
    
    // aggiungiamo un gestore di eventi a ciascuna immagine
    images.forEach(image => {
        image.addEventListener('click', function(e) {
            /*const altValue = this.getAttribute('alt'); // recuperiamo il valore del tag "alt" dell'immagine cliccata
            localStorage["TextureSelected"] = altValue;
            alert(altValue) // stampiamo il valore del tag "alt" sulla console per verificarlo*/
            localStorage.setItem("navicella", e.target.alt);
            //alert(localStorage.getItem("navicella"));
        });
    });

    $(".card").mouseover(function(event){
        $(event.target).addClass("opaco");
    });

    $(".card").mouseout(function(event){
        $(event.target).removeClass("opaco");
    });

});
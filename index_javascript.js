$(document).ready(function(){

    //prompt dei comandi 
    var imgTitolo = $("div#menu-prompt img");

    $(imgTitolo).mouseover(function(){
        $(imgTitolo).css("cursor", "pointer");

    });

    var input = document.getElementById("input-start");
    var loading = document.createElement("div");
    var btnStart = document.createElement("button");
    var avvisoLoading = document.createElement("p");
    avvisoLoading.innerHTML = "Loading...";
    var cont = 0, time;

    var div = document.createElement("div");
    document.getElementById("mainContainer").appendChild(div);

    window.onkeydown = startProcess;


    function startProcess(event){
        var temp = input.value.toLowerCase();

        switch(event.keyCode){
            case 13:{                          
                if(abilitaComando(temp, "start", "game")){
                    div.innerHTML = "";
                    styleCssLoading();
                    styleCssAvvisoLoading();

                    time = window.setInterval(startLoadingGame, 1000);
                }

                else if(abilitaComando(temp, "rule", "")){
                    div.innerHTML = "";
                    div.appendChild(btnStart);
                    btnStart.innerHTML =
                    "<a href='rules.html'> <img src='IMMAGINI/INDEX/sticker_playGame.png' style='width: 20px'> <span> go to </span> </a> ";
                }

                else{
                    confirm("Per avviare le regole scrivere 'rule', per il gioco digitare una stringa qualsiasi. L'importante è che contenga le parole 'game' e 'start'. L'ordine sceglilo tu :)");
                }

            }
        }

    }

    function abilitaComando(stringaPrincipale, stringa1, stringa2){
        if(stringaPrincipale.indexOf(stringa1) != -1 && stringaPrincipale.indexOf(stringa2) != -1) //cerca stringa1 e restituisce un intero
            return true;
        return false;                
    }

    function startLoadingGame(){
        if(cont == 10){
            clearInterval(time);

            //definisco il bottone per avviare il game
            div.appendChild(btnStart);
            btnStart.innerHTML =
            "<a href='gamePage.html'> <img src='IMMAGINI/INDEX/sticker_playGame.png' style='width: 20px'> <span> play </span> </a> ";
        }

        else{
            if(cont == 0)
                div.appendChild(avvisoLoading);
            div.appendChild(loading);
            incrementaQuadratini(loading);
        }
    }

    function incrementaQuadratini(loading){
        var quadratino = document.createElement("div"); //creo il quadratino
        quadratino = styleCssQuadratino(quadratino);
        loading.appendChild(quadratino); //lo metto come figlio del div LOADING

        cont = cont+1; //aumento i contatore dei quadratini stampati
    }

    function styleCssQuadratino(quadratino){ //modifico il CSS di ogni singolo quadrato
        $(quadratino).css({"width": "15px", "height": "15px", "background-color": "green"});
        $(quadratino).css({"float": "left", "margin-left": "5px", "margin-top": "5px", "margin-bottom": "5px"});

        return quadratino;
    }

    function styleCssLoading(){
        $(loading).css({"width": "205px", "height": "25px", "margin-top": "30px", "border": "2px solid green", "border-radius": "10px", "margin-left": "37.5%"});
    }

    function styleCssAvvisoLoading(){
        $(avvisoLoading).css("width", "80px").css("position", "relative").css("left", "46%").css("top", "100px");
    }

});
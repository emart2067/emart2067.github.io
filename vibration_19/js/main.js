// VARIABLES GLOBALES
let exemplevariable = "hello world"

// la page HTML a fini de charger, on peut donc
// interagir avec via des scripts sans risque d'erreur
document.addEventListener("DOMContentLoaded", function() {
    // laisser un message dans la console du navigateur
    console.log('ready');

    // lancer une fonction externe
    exemplefonction();
});

// FUNCTIONS EXTERNES
function exemplefonction() {
    // utiliser une variable pour afficher son contenu dans la console
    console.log(exemplevariable);
}

// VARIABLES
let mouseX, mouseY;
let moving = false;
let moreBubble;
let bubbleNumber = 0;
const maxBubbleNumber = 10;
const speed = 100;

// DOM READY 
document.addEventListener('DOMContentLoaded',function(){
    console.log('ready');

    document.addEventListener('mousemove', function(e){
        console.log('mousemove');
        //
        mouseX = e.pageX;
        mouseY = e.pageY;
        moving = true;
        //console.log(' X '+mouseX+' Y '+mouseY);

    });
    const button = document.querySelector('button');
    const container= document.getElementById('spawn-elements');
    button.addEventListener('click',function(){
        //console.log('click button');
        //
        if(button.classList.contains('on') ){
            //console.log('has on');
            //
            button.classList.remove('on');
            button.textContent="circle"
            clearInterval(moreBubble);
            container.innerHTML="";
            bubbleNumber = 0;
        } else {
            //console.log('does not have on');
            button.classList.add('on');
            button.textContent="bubble";
            launchBubble(container);

        }
    });
});

// FUNCTIONS
function launchBubble(container){
    console.log('launch bubble function');
    //
    moreBubble = setInterval(function(){
        console.log('in setInterval');
        //
        if(moving == true){
            console.log('moving');
            //
            bubbleNumber++;
            console.log('bubble #'+ bubbleNumber);
            //
            let bubble = document.createElement('img');
            bubble.classList.add('bubble');
            bubble.style.top = mouseY + 'px';
            bubble.style.left = mouseX + 'px';
            let rotate = Math.round ( Math.random() * 360);
            bubble.style.transform = "rotate("+ rotate +"deg)";
            bubble.setAttribute('src', 'src/img/bulle.png');
            container.append(bubble.cloneNode(true));
            //
            if(bubbleNumber >= maxBubbleNumber){
                console.log('catNumber trop grand');
                //on récupère le premier élément du container
                let first = container.firstChild;
                // et on le supprime
                first.remove();
            }
            moving = false;
        } else {
            console.log('not moving');
            return;
        }

    }, speed);
}


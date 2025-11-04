// DOM READY
$(document).ready(function() {
    console.log("ready");

    $('.line-head').click(function(){
        let $parent = $(this).closest('.line'); // on vise l'élément ligne le plus proche
        //
        if($parent.hasClass('closed')){
            // si le parent a la class "closed", on l'enlève
            // donc on "ouvre"
            $parent.removeClass('closed');
        } else {
            // sinon, on ajoute "closed"
            // donc on "ferme"
            $parent.addClass('closed');
        }
    });
});




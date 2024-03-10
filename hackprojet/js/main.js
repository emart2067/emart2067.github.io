// VARIABLES GLOBALES


// DOM READY
document.addEventListener("DOMContentLoaded", function() {
    console.log('ready');
});

// FUNCTIONS EXTERNES

function resizeSketch(iframe, parentId, aspectRatio) {
    let parent = document.getElementById(parentId);
    let w = parent.clientWidth;
    iframe.width = w;
    iframe.height = w * aspectRatio;
    iframe.contentWindow.addEventListener('resize', () => {
        let w = parent.clientWidth;
        iframe.width = w;
        iframe.height = w * aspectRatio;
    });
}

const modal = document.querySelector('.modal');
const previews = document.querySelectorAll('.gallery img');
const original = document.querySelector('.full-img');
const caption = document.querySelector('.caption');

previews.forEach(preview => {
    preview.addEventListener('click', () => {
        modal.classList.add('open');
        original.classList.add('open');

        // Dynamic change of text and image 
        const originalSrc = preview.getAttribute('data-original');
        original.src = `./assets/full/${originalSrc}`;

        const altText = preview.alt;
        caption.innerHTML = altText;
    })
});

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') ){
        modal.classList.remove('open');
        original.classList.remove('open');
    }
})
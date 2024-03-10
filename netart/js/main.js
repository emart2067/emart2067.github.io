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
let log = console.log;

window.document.elementsCache = {};
window.document.originalGetElementById = window.document.getElementById;
window.document.getElementById = function (id) {
    if (id in window.document.elementsCache) {
        return window.document.elementsCache[id];
    }
    window.document.elementsCache[id] = window.document.originalGetElementById(id);
    return window.document.elementsCache[id];
};

function setSize(elementId, width, height) {
    document.getElementById(elementId).style.width = width + 'px';
    document.getElementById(elementId).style.height = height + 'px';
}

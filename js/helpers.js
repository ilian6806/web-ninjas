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
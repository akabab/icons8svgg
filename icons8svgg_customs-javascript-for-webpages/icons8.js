// Add this to external scripts
// https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js

// METHODS

function kebabCase(str) { return str.toLowerCase().split(/\s/).join("-"); }

function append_dl_button(parent_node, onclick) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = "FREE SVG";
    button.class = "svgdl-btn";
    button.onclick = onclick;

    button.style.backgroundColor = "black";
    button.style.width = "100%";
    button.style.height = "30px";
    button.style.marginTop = "10px";
    button.style.borderRadius = "3px";
    button.style.textAlign = "center";
    button.onmouseover = function () { this.style.backgroundColor = "white"; }
    button.onmouseout = function () { this.style.backgroundColor = "black"; }

    parent_node.appendChild(button);
}

function download_icons(get_function) {
    var icons = get_function();

    var zip = new JSZip();
    icons.forEach(function (icon) {
        var filename = "icon-" + kebabCase(icon.name) + ".svg";
        zip.file(filename, icon.svg);
    });
    base64zip = zip.generate({type:"blob"});
    saveAs(base64zip, "icons.zip")
}

function get_collections_icons() {
    return angular.element($(".c-collections")).scope().colls.current.icons.map(function (e) {return e.data} );
}

function get_preview_icon() {
    return [angular.element($(".icon-preview__svg")).scope().selectedIcon.icon];
}

var contexts = [
    {name: "preview", parent_node_class: "b-bar-btns m-icon m-single-btn", get_function: get_preview_icon},
    {name: "collection", parent_node_class: "icons-set-scroll-wrapper__panel", get_function: get_collections_icons}
];

$(document).ready(function() {
    contexts.forEach(function (context) {
        var parent_node = document.getElementsByClassName(context.parent_node_class)[0];
        var onclick = function () { download_icons(context.get_function); };

        append_dl_button(parent_node, onclick);
    });
});


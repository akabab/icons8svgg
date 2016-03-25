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

function download_icons(icons) {
    var zip = new JSZip();
    icons.forEach(function (icon) {
        var filename = "icon-" + kebabCase(icon.name) + ".svg";
        zip.file(filename, icon.svg);
    });
    base64zip = zip.generate({type:"blob"});
    saveAs(base64zip, "icons.zip")
}

// CONTEXT

var contexts = [
    {
        name: "preview",
        parent_node_class: "b-bar-btns m-icon m-single-btn",
        inject_script_url: "injected_scripts/get_preview_icons.injected.js",
        event: "PREVIEW_ICON"
    },
    {
        name: "collection",
        parent_node_class: "icons-set-scroll-wrapper__panel",
        inject_script_url: "injected_scripts/get_collection_icons.injected.js",
        event: "COLLECTION_ICONS"
    }
];

function inject(script_url) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(script_url);

    (document.body || document.documentElement).appendChild(s);

    // remove script after load
    s.onload = function() { s.parentNode.removeChild(s); };
}

$(document).ready(function() {
    // ADD BUTTONS
    contexts.forEach(function (context) {
        var parent_node = document.getElementsByClassName(context.parent_node_class)[0];
        var onclick = function () { inject(context.inject_script_url); }
        append_dl_button(parent_node, onclick);

        // Event listener
        document.addEventListener(context.event, function (e) {
            if (!e.detail) {
                alert("Could not retreive icons..");
            } else {
                download_icons(e.detail);
            }
        });
    });

});

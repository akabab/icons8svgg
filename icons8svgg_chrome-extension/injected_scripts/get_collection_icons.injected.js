(function() {
    var icons = angular.element($(".c-collections")).scope().colls.current.icons.map(function (i) {return i.data} );

    var o = icons.map(function (i) { return {name: i.name, svg: i.svg}; });
    document.dispatchEvent(new CustomEvent('PREVIEW_ICON', {
        detail: o
    }));
})();
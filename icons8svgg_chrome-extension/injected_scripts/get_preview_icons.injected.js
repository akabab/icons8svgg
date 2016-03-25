(function() {
    var icon = angular.element($(".icon-preview__svg")).scope().selectedIcon.icon;

    var o = [
        {name: icon.name, svg: icon.svg}
    ];

    if (icon.effectSvg) {
        o.push({name: icon.name + ".effect", svg: icon.effectSvg});
    }

    document.dispatchEvent(new CustomEvent('PREVIEW_ICON', {
        detail: o
    }));
})();
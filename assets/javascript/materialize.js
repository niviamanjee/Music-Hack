
$(document).ready(function () {
    M.AutoInit();
    $('.sidenav').sidenav();
    $('.slider').slider({
        indicators: false,
        height: 500,
        transition: 500,
        interval: 6000,
    });
});

let slider = $(".slider");
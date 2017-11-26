var resizeTimer = null;
$(window).on('resize', function () {
    if (resizeTimer) {
        clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(function () {
        console.log("window resize");
    }, 400);
}
);
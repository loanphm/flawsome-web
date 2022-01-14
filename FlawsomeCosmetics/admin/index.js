$.ajax({
    url: "./sidebar/index.html",
    data: {
        zipcode: 97201,
    },
    success: function(result) {
        $("#sidebar").html(result);
    },
});
$.ajax({
    url: "./headerAdmin/index.html",
    data: {
        zipcode: 97201,
    },
    success: function(result) {
        $("#header-dashboard").html(result);
    },
});
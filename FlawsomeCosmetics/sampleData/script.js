function loadData() {
    $.ajax( {

        URL:"member.xml",
        dataType: "xml",
        success: function(data) {
            $("ul").children().remove();
            $(data).find("member").each (function () {
                var
            })
        }
     })
}
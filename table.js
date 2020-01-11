$(function (){

    $("#btn-input").click(function() {
        var name = $("#form-input").val();
        var date = new Date();

        var tag = "<tr><td>" + name + "</td><td>" + date + "</td></tr>";
        $("tbody").append(tag);

        $("#form-input").val("");
    });

});
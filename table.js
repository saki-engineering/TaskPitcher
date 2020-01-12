$(function (){

    $("#btn-input").click(function() {
        var m_name = $("#form-input").val();
        var today = new Date();

        var tag = "<tr><td>" + m_name + "</td><td>" + today + "</td></tr>";
        $("tbody").append(tag);

        $("#form-input").val("");
    });

});
$(function (){
    //scriptをかく
    /*例
    $("p").click(function() {
        // cssで文字色を赤に変更
        $("p").css("color","red");
    });
    */

    $("#btn-search").click(function() {
        var btn_act = '<input type="button" value="accept" id="btn-accept">'
        $("body").append(btn_act);
        var btn_rjc = '<input type="button" value="reject" id="btn-reject">'
        $("body").append(btn_rjc);
    });

});
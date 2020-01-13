$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    $("#btn-input").click(function() {
        // "hello" という文字列と123という整数を送信
        ipcRenderer.send("hoge-event", "hello" , 123); 

        var m_name = $("#form-input").val();
        var today = new Date();

        var tag = "<tr><td>" + m_name + "</td><td>" + today + "</td></tr>";
        $("tbody").append(tag);

        $("#form-input").val("");
    });

});
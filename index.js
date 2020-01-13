$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    $("#btn-search").click(function() {
        // "hello" という文字列と123という整数を送信
        ipcRenderer.send("test", 1,2); 
        
        var btn_act = '<input type="button" value="accept" id="btn-accept">'
        $("body").append(btn_act);
        var btn_rjc = '<input type="button" value="reject" id="btn-reject">'
        $("body").append(btn_rjc);
    });

});
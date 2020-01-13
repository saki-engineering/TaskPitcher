$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    //NeDBの設定
    var Datastore = require('nedb');
    var db = new Datastore({ 
        filename: 'data/member.db',
        autoload: true
    });

    $("#btn-search").click(function() {
        // "hello" という文字列と123という整数を送信
        ipcRenderer.send("test", 1,2); 

        db.findOne({}, function(err, docs){
            $("#rlt-name").html(docs.name);
            $("#rlt-date").html(docs.date);
        });
        
        var btn_act = '<input type="button" value="accept" id="btn-accept">'
        $("body").append(btn_act);
        var btn_rjc = '<input type="button" value="reject" id="btn-reject">'
        $("body").append(btn_rjc);
    });

});
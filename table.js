$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    var Datastore = require('nedb');
    var db = new Datastore({ 
        filename: 'data/member.db',
        autoload: true
    });

    db.find({}, function(err, docs){
        var table = new Tabulator("#result-table", {
            data:docs,
            columns:[
                {title:"Name", field:"name", editor:"input",},
                {title:"Last-date", field:"date", },
            ],
        });
    });

    $("#btn-input").click(function() {
        // "hello" という文字列と123という整数を送信
        ipcRenderer.send("test", 1,2);

        var m_name = $("#form-input").val();
        var today = new Date();

        var doc = {
            name: m_name,
            date: today
        };
        db.insert(doc);

        $("#form-input").val("");
    });

});
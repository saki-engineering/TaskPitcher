$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    //NeDBの設定
    var Datastore = require('nedb');
    var db = new Datastore({ 
        filename: 'data/member.db',
        autoload: true
    });

    const moment = require('moment')

    $("#btn-search").click(function() {
        // "hello" という文字列と123という整数を送信
        //ipcRenderer.send("test", 1); 
        
        db.find({date:{$lte: moment().subtract(1,'M').format('YYYY-MM-DD')}}, function(err, docs){
            if(docs.length>0){
                var random = Math.floor( Math.random() * docs.length );
                $("#rlt-name").html(docs[random].name);
                $("#rlt-period").html(docs[random].period);
                $("#rlt-date").html(docs[random].date);
            }
            else{
                db.find({}, function(err, docsum){
                    if(docsum.length>0){
                        var random = Math.floor( Math.random() * docsum.length );
                        $("#rlt-name").html(docsum[random].name);
                        $("#rlt-period").html(docsum[random].period);
                        $("#rlt-date").html(docsum[random].date);
                    }
                    else alert("データがありません");
                });
            } 
        });
        if(document.getElementById("btn-accept") == null){
            var btn_act = '<input type="button" value="accept" id="btn-accept">'
            $("body").append(btn_act);
            var btn_rjc = '<input type="button" value="reject" id="btn-reject">'
            $("body").append(btn_rjc);
        }
    });

});
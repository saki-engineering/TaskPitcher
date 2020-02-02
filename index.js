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

    const Swal = require('sweetalert2')

    $("#test").click(function() {
        Swal.fire('Any fool can use a computer');
    });

    //候補者をランダムに表示→accpet処理s
    $("#btn-search").click(function() {
        // "hello" という文字列と123という整数を送信
        //ipcRenderer.send("test", 1); 

        function select_conf(c_name,c_period,c_date){
            var dialog = c_period + "期" + c_name + "さん(最終割り振り: " + c_date + "が選ばれました。\nこの人に割り振りますか？";
            if (confirm(dialog)) {
                db.update({name:c_name, date:c_date, period:c_period}, {$set: {date: moment().format('YYYY-MM-DD')}});
                alert("処理が終わりました");
            }
        }

        db.find({active:1, date:{$lte: moment().subtract(1,'M').format('YYYY-MM-DD')}}, function(err, docs){
            if(docs.length>0){
                var random = Math.floor( Math.random() * docs.length );
                select_conf(docs[random].name,docs[random].period,docs[random].date);
            }
            else{
                db.find({active:1}, function(err, docsum){
                    if(docsum.length>0){
                        var random = Math.floor( Math.random() * docsum.length );
                        select_conf(docsum[random].name,docsum[random].period,docsum[random].date);
                    }
                    else alert("データがありません");
                });
            } 
        });
    });

});
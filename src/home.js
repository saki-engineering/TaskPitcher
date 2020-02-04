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

    //候補者をランダムに表示→accpet処理
    $("#btn-search").click(function() {
        // "hello" という文字列と123という整数を送信
        //ipcRenderer.send("test", 1); 

        //選ばれた候補者をaccept処理する
        function select_conf(c_name,c_period,c_date,c_remarks){
            var title = c_name + "さんが選ばれました"
            var dialog = c_period + "期" + c_name + "さん(最終割り振り: " + c_date + ")に仕事を割り振りますか？";
            Swal.fire({
                title: title,
                text: dialog,
                icon: 'info',
                input: 'text',
                inputPlaceholder: '備考欄の更新',
                inputValue: c_remarks,
                showCancelButton: true,
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    db.update({name:c_name, date:c_date, period:c_period}, {$set: {date: moment().format('YYYY-MM-DD'), remarks: result.value}}, function(err, newDoc){
                        if (err !== null){
                            Swal.fire({
                                icon: 'error',
                                title: 'データベースの更新に失敗しました',
                                text: err,
                            })
                        }
                        else{
                            Swal.fire({
                                icon: 'success',
                                title: 'SUCCESS!',
                                text: c_name + 'さんの最終割り振り日と備考欄を更新しました',
                            })
                        }
                    });
                }
            })
        }

        //候補者を選ぶ
        db.find({active:1, date:{$lte: moment().subtract(1,'M').format('YYYY-MM-DD')}}, function(err, docs){
            if(docs.length>0){
                var random = Math.floor( Math.random() * docs.length );
                select_conf(docs[random].name,docs[random].period,docs[random].date,docs[random].remarks);
            }
            else{
                db.find({active:1}, function(err, docsum){
                    if(docsum.length>0){
                        var random = Math.floor( Math.random() * docsum.length );
                        select_conf(docsum[random].name,docsum[random].period,docsum[random].date,docsum[random].remarks);
                    }
                    else{
                        Swal.fire({
                            icon: 'error',
                            title: '選べる候補者が一人もいません',
                            text: 'メンバーを追加するか、Member ListからメンバーをActiveにしてください。',
                        })
                    }
                });
            } 
        });
    });

});
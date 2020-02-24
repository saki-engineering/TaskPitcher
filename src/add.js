$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    //const { ipcRenderer } = require("electron");
    const ipcRenderer = window.ipcRenderer;

    //const { app } = require('electron').remote
    const app = window.app;

    //NeDBの設定
    //var Datastore = require('nedb');
    var Datastore = window.Datastore;
    var db = new Datastore({ 
        filename: app.getPath('userData')+'/member.db',
        autoload: true
    });

    //const moment = require('moment')
    const moment = window.moment;

    //const { dialog } = require('electron').remote
    const dialog = window.dialog;
    //var fs = require('fs');
    var fs = window.fs;

    //const csv = require("csv-parse");
    const csv = window.csv;

    //一人ずつ追加するフォームの挙動
    $("#btn-input").click(function() {
        // "hello" という文字列と123という整数を送信
        //ipcRenderer.send("test", 1,2);

        var m_name = $("#form-name").val();
        var m_date = moment().subtract(1,'M').format('YYYY-MM-DD');
        var m_period = $("#form-period").val();
        var m_remarks = $("#form-remarks").val();

        if(m_name == ""){
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: '追加するメンバーの名前を入力してください',
            });
        }
        else{
            var doc = {
                name: m_name,
                date: m_date,
                period: m_period,
                remarks: m_remarks,
                active: 1
            };
            db.insert(doc,function(err, newDoc){
                if (err !== null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'データの追加に失敗しました',
                        text: err,
                    });
                }
                else{
                    Swal.fire({
                        icon: 'success',
                        title: 'SUCCESS!',
                        text: 'データを追加しました',
                    });
                }
            });

            $("#form-name").val("");
            $("#form-period").val("");
            $("#form-remarks").val("");
        }
    });

    //アップロードするcsvファイルのパスを取得+アップロードボタンを有効化
    var path = "";
    $("#btn-fileslt").click(function() {
        path = dialog.showOpenDialogSync({
            filters: [
                {name: 'CSV', extensions: ['csv',]}, 
            ],
        });
        if(path){
            $("#form-file").val(path);
            $("#btn-upload").prop("disabled", false);
        }
    });

    //アップしたcsvファイルを処理
    $("#btn-filecancel").click(function() {
        path = "";
        $("#form-file").val("select file...");
        $("#btn-upload").prop("disabled", true);
    });

    $("#btn-upload").click(function() {
       fs.createReadStream(path[0],'utf-8')
        .pipe(csv({
            columns: true
        }, function (err, data) {
            //csvのパースにエラーがでた
            if (err != null){
                Swal.fire({
                    icon: 'error',
                    title: 'csvファイルを開けませんでした',
                    text: err,
                });
            }
            else{
                data = JSON.stringify(data);
                data = JSON.parse(data);

                var fail = [];

                //csvファイルにデータがない
                if(data.length==0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'NO DATA',
                        text: 'csvファイル内にデータが存在しません',
                    });
                }
                else if('date' in data[0]){
                    for(var i=0;i<data.length;i++){
                        //csvのdateプロパティが空なら、デフォルト値を設定する
                        var c_date;
                        if(data[i].date == ""){
                            c_date = moment().subtract(1,'M').format('YYYY-MM-DD');
                        }
                        else c_date = moment(data[i].date).format('YYYY-MM-DD');

                        var doc = {
                            name: data[i].name,
                            date: c_date,
                            period: data[i].period,
                            remarks: data[i].remarks,
                            active: 1
                        };
                        db.insert(doc,function(err, newDoc){
                            if (err !== null) {
                                fail.push(i);
                            }
                        });
                    }
                    if(fail.length==0){
                        Swal.fire({
                            icon: 'success',
                            title: 'SUCCESS!',
                            text: 'データを追加しました',
                        });
                    }
                    else{
                        Swal.fire({
                            icon: 'info',
                            title: '一部データの挿入に失敗しました',
                            text: '失敗したデータ→' + fail.join(','),
                        });
                    }
                }
                //jsonにdateプロパティがない
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'csvファイルの形式が違います',
                        text: 'csvファイルにdateプロパティを用意してください',
                    });
                }
            }

            //全ての場合に共通した終了処理
            path = "";
            $("#form-file").val("select file...");
            $("#btn-upload").prop("disabled", true);
        }))
    });
     
});
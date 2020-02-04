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

    const { dialog } = require('electron').remote
    var fs = require('fs');

    const csv = require("csv-parse");

    $("#btn-input").click(function() {
        // "hello" という文字列と123という整数を送信
        //ipcRenderer.send("test", 1,2);

        var m_name = $("#form-name").val();
        var today = moment().format('YYYY-MM-DD');
        var m_period = $("#form-period").val();
        var m_remarks = $("#form-remarks").val();

        if(m_name == ""){
            Swal.fire({
                icon: 'warning',
                title: 'WARNING',
                text: '名前を入力してください',
            });
        }
        else{
            var doc = {
                name: m_name,
                date: today,
                period: m_period,
                remarks: m_remarks,
                active: 1
            };
            db.insert(doc,function(err, newDoc){
                if (err !== null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'INSERT ERROR',
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

    var path = "";

    $("#btn-fileslt").click(function() {
        //var file = $("#form-importfile").val();
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
                    title: 'IMPORT ERROR',
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
                        title: 'FILE ERROR',
                        text: 'ファイルにデータが存在しません',
                    });
                }
                else if('date' in data[0]){
                    for(var i=0;i<data.length;i++){
                        //csvにremarksがないなら、デフォルト値をnull→空文字列にする
                        var c_remarks;
                        if('remarks' in data[0]){
                            c_remarks = data[i].remarks;
                        }
                        else c_remarks = "";

                        //csvのdateプロパティが空なら、デフォルト値を設定+remarksにその旨追記する
                        var c_date;
                        if(data[i].date == ""){
                            c_date = moment().subtract(1,'M').format('YYYY-MM-DD');
                            c_remarks += "(日付はインポート時のデフォルト値)";
                        }
                        else c_date = moment(data[i].date).format('YYYY-MM-DD');

                        var doc = {
                            name: data[i].name,
                            date: c_date,
                            period: data[i].period,
                            remarks: c_remarks,
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
                            title: 'PARTIAL INSERT ERROR',
                            text: '一部データの挿入に失敗しました。\n失敗したデータ→' + fail.join(','),
                        });
                    }
                }
                //jsonにdateプロパティがない
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'JSON ERROR',
                        text: 'dateプロパティを用意してください',
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
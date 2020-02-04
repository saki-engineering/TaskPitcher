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
    });

    var path;

    $("#btn-fileslt").click(function() {
        //var file = $("#form-importfile").val();
        path = dialog.showOpenDialogSync({
            filters: [
                {name: 'CSV', extensions: ['csv',]}, 
            ],
        });
    });

    $("#btn-upload").click(function() {
       fs.createReadStream(path[0],'utf-8')
        .pipe(csv({
            columns: true //header無しのCSV fileはfalse
        }, function (err, data) {

            data = JSON.stringify(data);
            data = JSON.parse(data);

            ipcRenderer.send("test", data);

            ipcRenderer.send("test", err);
        }))
    });
     
});
$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    var Datastore = require('nedb');
    var db = new Datastore({ 
        filename: 'data/member.db',
        autoload: true
    });

    db.find({}, function(err, docs){
        var data_length = docs.length;
        for(var i=0;i<data_length;i++){
            var tag = "<tr><td>" + docs[i].name + "</td><td>" + docs[i].date + "</td></tr>";
            $("tbody").append(tag);
        }
        //ipcRenderer.send("test", docs); console.logの代わり
        var table = new Tabulator("#result_list", {
            autoColumns:true,
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

        var tag = "<tr><td>" + m_name + "</td><td>" + today + "</td></tr>";
        $("tbody").append(tag);

        $("#form-input").val("");
    });

    //tabulator導入
    var tabledata = [
        {id:1, name:"Billy Bob", age:12, gender:"male", height:95, col:"red", dob:"14/05/2010"},
        {id:2, name:"Jenny Jane", age:42, gender:"female", height:142, col:"blue", dob:"30/07/1954"},
        {id:3, name:"Steve McAlistaire", age:35, gender:"male", height:176, col:"green", dob:"04/11/1982"},
    ];
    var table = new Tabulator("#example-table", {
        data:tabledata,
        autoColumns:true,
    });

});
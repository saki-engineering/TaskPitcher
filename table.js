$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    var Datastore = require('nedb');
    var db = new Datastore({ 
        filename: 'data/member.db',
        autoload: true
    });

    db.find({}, function(err, docs){
        var nameEditor = function(cell, onRendered, success, cancel){
            //create and style input
            var cellValue = cell.getValue();
            editor = document.createElement("input");
            editor.style.padding = "4px";
            editor.style.width = "100%";
            editor.style.boxSizing = "border-box";
            editor.value = cellValue;

            onRendered(function(){
                editor.focus();
                editor.style.height = "100%";
            });

            function successFunc(){
                db.update({name:cellValue}, {$set: {name: editor.value}});
                success(editor.value);
            }
            editor.addEventListener("blur", successFunc);
        
            return editor;
        };

        var table = new Tabulator("#result-table", {
            data:docs,
            columns:[
                {title:"Name", field:"name", editor:nameEditor,},
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
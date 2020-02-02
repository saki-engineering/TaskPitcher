$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    var Datastore = require('nedb');
    var db = new Datastore({ 
        filename: 'data/member.db',
        autoload: true
    });

    const moment = require('moment')

    var Tabulator = require('tabulator-tables');

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
                //var field = cell.getField();
                db.update({_id:cell.getData()._id}, {$set: {name: editor.value}});
                success(editor.value);
            }
            editor.addEventListener("blur", successFunc);
        
            return editor;
        };

        var dateEditor = function(cell, onRendered, success, cancel){
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
                ipcRenderer.send("test", moment(editor.value).isValid());
                if(moment(editor.value).isValid()){
                    db.update({_id:cell.getData()._id}, {$set: {date: editor.value}});
                    success(moment(editor.value).format('YYYY-MM-DD'));
                }
                else{
                    alert("不正な日付です");
                    success(cellValue);
                }
            }

            editor.addEventListener("blur",successFunc);
        
            return editor;
        };
        
        var remarksEditor = function(cell, onRendered, success, cancel){
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
                //var field = cell.getField();
                db.update({_id:cell.getData()._id}, {$set: {remarks: editor.value}});
                success(editor.value);
            }
            editor.addEventListener("blur", successFunc);
        
            return editor;
        };

        var table = new Tabulator("#result-table", {
            data:docs,
            columns:[
                {title:"Name", field:"name", editor:nameEditor,},
                {title:"Period", field:"period", },
                {title:"Last-date", field:"date", editor:dateEditor,},
                {title:"Remarks", field:"remarks", editor:remarksEditor},
            ],
        });
    });

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
            remarks: m_remarks
        };
        db.insert(doc);

        $("#form-name").val("");
        $("#form-period").val("");
        $("#form-remarks").val("");
        location.reload();
    });

});
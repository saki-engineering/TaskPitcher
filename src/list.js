$(function (){
    // IPC通信を行うために、レンダラープロセス側では ipcRenderer というモジュールを require する
    const { ipcRenderer } = require("electron");

    var Datastore = require('nedb');
    var db = new Datastore({ 
        filename: 'src/data/member.db',
        autoload: true
    });

    const moment = require('moment')

    var Tabulator = require('tabulator-tables');

    db.find({}, function(err, docs){
        //editorの設定
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

        var periodEditor = function(cell, onRendered, success, cancel){
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
                var peri = Number(editor.value);
                if(peri>0　&& Number.isInteger(peri)){
                    db.update({_id:cell.getData()._id}, {$set: {period: editor.value}});
                    success(editor.value);
                }
                else{
                    alert("不正な数字です");
                    success(cellValue);
                }
            }

            editor.addEventListener("blur",successFunc);
        
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
                //ipcRenderer.send("test", moment(editor.value).isValid());
                if(moment(editor.value).isValid()){
                    db.update({_id:cell.getData()._id}, {$set: {date: moment(editor.value).format('YYYY-MM-DD')}});
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

        var activeEditor = function(cell, onRendered, success, cancel){
            //create and style input
            var cellValue = cell.getValue();
            editor = document.createElement("input");
            editor.setAttribute('type', 'checkbox');
            if(cellValue == 1) editor.checked = true;
            else editor.checked = false;

            function successFunc(){
                //var field = cell.getField();
                //db.update({_id:cell.getData()._id}, {$set: {remarks: editor.value}});
                if(editor.checked){
                    db.update({_id:cell.getData()._id}, {$set: {active: 1}});
                    success(1);
                }
                else{
                    db.update({_id:cell.getData()._id}, {$set: {active: 0}});
                    success(0);
                }
            }
            editor.addEventListener("blur", successFunc);
        
            return editor;
        };

        //表を表示
        var table = new Tabulator("#result-table", {
            data:docs,
            layout:"fitColumns",
            columns:[
                {formatter:"rowSelection", titleFormatter:"rowSelection", align:"center", width:10, headerSort:false, cellClick:function(e, cell){
                    cell.getRow().toggleSelect();
                }},
                {title:"Name", field:"name", editor:nameEditor,},
                {title:"Period", field:"period", editor:periodEditor,},
                {title:"Last-date", field:"date", editor:dateEditor,},
                {title:"Remarks", field:"remarks", editor:remarksEditor,},
                {title:"Active", field:"active", formatter:"tickCross", editor:activeEditor,headerFilter:"tickCross", headerFilterParams:{"tristate":true},headerFilterEmptyCheck:function(value){return value === null}},
            ],
        });

        //データ削除ボタンの設定
        $("#del-rows").click(function(){
            Swal.fire({
                title: '確認',
                text: '選択したデータを本当に削除しますか？',
                icon: 'warming',
                showCancelButton: true,
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    var selected_data = table.getSelectedData();
                    var fail = [];

                    for(var i=0;i<selected_data.length;i++){
                        db.remove({_id:selected_data[i]._id}, function(err, newDoc){
                            if (err !== null) {
                                fail.push(i);
                            }
                        });
                    }
                    if(fail.length==0){
                        Swal.fire({
                            icon: 'success',
                            title: 'SUCCESS!',
                            text: '削除しました',
                            onAfterClose: () => location.reload(),
                        });
                    }
                    else{
                        Swal.fire({
                            icon: 'info',
                            title: '一部データの削除に失敗しました',
                            text: '失敗したデータ→' + fail.join(','),
                            onAfterClose: () => location.reload(),
                        });
                    }
                }
            })
        });

        //フィルターの設置
        function updateFilter(){
            table.setFilter($("#filter-field").val(), $("#filter-type").val(), $("#filter-value").val());
        }
        $("#filter-field, #filter-type").change(updateFilter);
        $("#filter-value").keyup(updateFilter);
        $("#filter-clear").click(function(){
            $("#filter-field").val("");
            $("#filter-type").val("=");
            $("#filter-value").val("");
            table.clearFilter();
        });

    });

});
$(function (){
    const app = window.app;
    const Datastore = window.Datastore;
    const db = new Datastore({ 
        filename: app.getPath('userData')+'/member.db',
        autoload: true
    });
    const moment = window.moment;
    const dialog = window.dialog;
    const fs = window.fs;
    const csv = window.csv;

    //一人ずつaddフォームの送信ボタンを、nameフィールド(必須項目)が入力されている時だけactivateする
    $("#form-name").change(function(){
        if($("#form-name").val()===""){
            $("#btn-input").prop("disabled", true);
        }
        else{
            $("#btn-input").prop("disabled", false);
        }
    });

    //一人ずつ追加するフォームの挙動
    $("#btn-input").click(function() {
        var m_name = $("#form-name").val();
        var m_date = moment().subtract(1,'M').format('YYYY-MM-DD');
        var m_period = $("#form-period").val();
        var m_remarks = $("#form-remarks").val();

        if(m_name == ""){
            Swal.fire({
                icon: 'warning',
                title: '追加するメンバーの名前を入力してください',
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
    var csv_path = "";
    $("#btn-fileslt").click(function() {
        csv_path = dialog.showOpenDialogSync({
            filters: [
                {name: 'CSV', extensions: ['csv',]}, 
            ],
        });
        if(csv_path){
            $("#form-file").val(csv_path);
            $("#btn-upload").prop("disabled", false);
        }
    });

    //アップしたcsvファイルを処理
    $("#btn-filecancel").click(function() {
        csv_path = "";
        $("#form-file").val("select file...");
        $("#btn-upload").prop("disabled", true);
    });

    $("#btn-upload").click(function() {
       fs.createReadStream(csv_path[0],'utf-8')
        .pipe(csv({
            trim: true,
            columns: true,
            bom: true
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
                var insert_fail = [];

                //csvファイルにデータがない
                if(data.length==0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'csvファイル内にデータが存在しません',
                    });
                }
                else{
                    for(var i=0;i<data.length;i++){
                        //csvのdateプロパティが空なら、デフォルト値を設定する
                        var c_date;
                        if(typeof(data[i].date) === "undefined" || moment(data[0].date).isValid()==false){
                            c_date = moment().subtract(1,'M').format('YYYY-MM-DD');
                        }
                        else c_date = moment(data[i].date).format('YYYY-MM-DD');

                        var doc = {
                            name: (data[i].name ? data[i].name : ""),
                            date: c_date,
                            period: (data[i].period ? data[i].period : ""),
                            remarks: (data[i].remarks ? data[i].remarks : ""),
                            active: 1
                        };
                        db.insert(doc,function(err, newDoc){
                            if (err !== null) insert_fail.push(i);
                        });
                    }
                    if(insert_fail.length==0){
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
                            text: '失敗したデータ→' + insert_fail.join(','),
                        });
                    }
                }
            }

            //全ての場合に共通した終了処理
            csv_path = "";
            $("#form-file").val("select file...");
            $("#btn-upload").prop("disabled", true);
        }))
    });
     
});
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

});
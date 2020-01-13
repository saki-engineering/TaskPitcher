'use strict';

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

/*
//NeDBの設定
var Datastore = require('nedb');
var db = new Datastore({ 
    filename: 'data/member.db',
    autoload: true
});
*/

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function(){
  if(process.platform != 'darwin'){
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function(){
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {
    nodeIntegration: true
  }});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});

// メインプロセス側では ipcMain モジュール
const { ipcMain } = require("electron");

ipcMain.on("hoge-event", (event, args) => {
  // args[0] => "hello", args[1] => 123 が入っている
  console.log("hoge-event!:", args); 
});
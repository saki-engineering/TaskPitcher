'use strict';

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

// Electronの初期化完了後に実行
app.on('ready', function(){
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {
    nodeIntegration: true
  }});
  mainWindow.loadURL('file://' + __dirname + '/home.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function(){
    mainWindow = null;
    app.quit();
  });
});

// メインプロセス側では ipcMain モジュール
const { ipcMain } = require("electron");

ipcMain.on("test", (event, args) => {
  console.log("test:", args); 
});
'use strict';

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

//アプリケーションメニュー
const Menu = electron.Menu

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

const open = require('open');

//メニューバー内容
let template = [{
  label: 'TaskPitcher',
  submenu: [{
    label: 'ReadMe',
    click: function(){
      open('https://github.com/saki-engineering/TaskPitcher');
    }
  }, {
    type: 'separator'
  }, {
    label: 'TaskPitcher を終了',
    accelerator: 'Cmd+Q',
    click: function(){
      app.quit();
    }
  }]
}, {
  label: 'Window',
  submenu: [{
    label: '最小化',
    accelerator: 'Cmd+M',
    click: function(){
      mainWindow.minimize();
    }
  }, {
    label: '最大化',
    accelerator: 'Cmd+Ctrl+F',
    click: function(){
      mainWindow.maximize();
    }
  }, {
    label: 'リロード',
    accelerator: 'Cmd+R',
    click: function(){
      BrowserWindow.getFocusedWindow().reload();
    }
  }, {
    label: '閉じる',
    accelerator: 'Cmd+W',
    click: function(){
      mainWindow.close();
    }
  }]
}]

// Electronの初期化完了後に実行
app.on('ready', function(){
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {
    nodeIntegration: true
  }});
  mainWindow.loadURL('file://' + __dirname + '/home.html');

  //メニューバー設置
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

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
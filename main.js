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

//メニューバー内容
let template = [{
  label: 'TaskPitcher',
  submenu: [{
    label: 'ReadMe',
    click: function(){
      open('https://github.com/saki-engineering/TaskPitcher', '_blank');
    }
  }, {
    type: 'separator'
  }, {
    label: 'コピー',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }]
}, {
  label: '表示',
  submenu: [{
    label: '全画面表示切り替える',
    accelerator: (function() {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function(item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
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
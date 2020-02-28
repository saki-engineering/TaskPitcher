'use strict';

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu
const open = require('open');

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

//メニューバー内容
let template = [{
  label: 'TaskPitcher',
  submenu: [{
    label: 'ReadMeを表示',
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

function createWindow (){
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {
    nodeIntegration: false,
    contextIsolation: false,
    preload: __dirname + '/preload.js'
  }});
  mainWindow.loadURL('file://' + __dirname + '/templates/home.html');

  //mainWindow.webContents.openDevTools()
}

app.on('ready', function(){
  createWindow();

  //メニューバー設置
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  // macOSでは、ユーザが Cmd + Q で明示的に終了するまで、
  // アプリケーションとそのメニューバーは有効なままにするのが一般的です。
  if (process.platform !== 'darwin') {
    mainWindow = null;
    app.quit()
  }
})

app.on('activate', () => {
  // macOSでは、ユーザがドックアイコンをクリックしたとき、
  // そのアプリのウインドウが無かったら再作成するのが一般的です。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
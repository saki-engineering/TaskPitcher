const electron = require('electron');

process.once('loaded', () => {
    global.ipcRenderer = electron.ipcRenderer;
    global.app = electron.remote.app;
    global.dialog = electron.remote.dialog;
    global.Datastore = require('nedb');
    global.moment = require('moment');
    global.Tabulator = require('tabulator-tables');
    global.stringify = require('csv-stringify');
    global.fs = require('fs');
    global.csv = require("csv-parse");
});
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 960,
    height: 540,
    frame: false,
    title: "KTaNEPad",
    icon: __dirname + "/ktanepadlogo.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  ipcMain.on('close', () => {
    win.close();
  });

  ipcMain.on('max', () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  ipcMain.on('min', () => {
    win.minimize();
  });

  ipcMain.on('visitKtaneTimwiDe', () => {
    shell.openExternal('https://ktane.timwi.de/');
  });

  win.loadURL(
    isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
    );
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
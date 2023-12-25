const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = true;

let mainWindow;
function createWindow()
{
    mainWindow = new BrowserWindow({
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

    ipcMain.on('close', () =>
    {
        mainWindow.close();
    });

    ipcMain.on('max', () =>
    {
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    });

    ipcMain.on('min', () =>
    {
        mainWindow.minimize();
    });

    ipcMain.on('visitKtaneTimwiDe', () =>
    {
        shell.openExternal('https://ktane.timwi.de/');
    });

    ipcMain.on('get-user-data-path', (event) =>
    {
        const userDataPath = app.getPath('userData');
        event.reply('user-data-path', userDataPath);
    });

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
}

app.on('ready', () =>
{
    createWindow();

    autoUpdater.setFeedURL({
        repo: 'ktanepad',
        owner: 'Cirax856',
        provider: 'github'
    });

    autoUpdater.checkForUpdates();
});

app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', () =>
{
    if (BrowserWindow.getAllWindows().length === 0)
    {
        createWindow();
    }
});

autoUpdater.on("update-available", (updateInfo) =>
{
    const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: `New version of KTaNEPad is available! (${updateInfo.version})`,
        detail: `A new version of KTaNEPad is available and being currently downloaded. It is recommended not to start a bomb while the update is installing.\nPatch notes:\n${updateInfo.releaseNotes}`
    };

    dialog.showMessageBox(dialogOpts);
});

autoUpdater.on("error", (err) =>
{
    const dialogOpts = {
        type: 'error',
        buttons: ['Ok'],
        title: 'ERROR!',
        detail: `KTaNEPad has encountered an error, please report it to the author:\n${err}`
    }

    dialog.showMessageBox(dialogOpts);
})

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) =>
{
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart KTaNEPad', 'Later (installs on exit)'],
        title: 'Update installed!',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version of KTaNEPad has been downloaded. Would you like to restart KTaNEPad now or later?'
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) =>
    {
        if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
});
const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
		nodeIntegration: true,
		contextIsolation: false,
		enableRemoteModule: true,
		preload: path.join( __dirname, 'preload.js')
    },
	
	autoHideMenuBar: true,


	icon: path.join( __dirname, 'resources', 'logo.png' ),
	//titleBarStyle: 'hidden' //Good to remove all bars, including at the top
  })

	win.loadFile('./index.html')
	
}

app.whenReady().then(createWindow)

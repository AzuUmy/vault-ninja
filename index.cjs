const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');

(async () => {

  function createWindow() {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false,  
        allowFileAccess: true 
      }
    });

    const app = express();
    const port = 5173;

    // Determine the correct 'dist' path based on development or production
    const distPath = path.join(__dirname,  'Source', 'dist');

    // Serve static files from 'dist' directory
    app.use(express.static(distPath));

    app.get('/', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });

    // Start server and load window
    app.listen(port, () => {
      //console.log(`Server running at http://localhost:${port}`);
      win.loadFile(path.join(distPath, 'index.html'));
      console.log("dispath: ", distPath);
    });
  }

  await app.whenReady();
  createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})();
const { app, BrowserWindow } = require('electron');
const { is } = require('electron-util');

// to avoid garbage collection, declare the window as a variable
let window;

// specify the details of the browser window
function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load the HTML file
  window.loadFile('index.html');

  // if in development mode, open the browser dev tools
  if (is.development) {
    window.webContents.openDevTools();
  }

  // when the window is closed, dereference the window object
  window.on('closed', () => {
    window = null;
  });
}

// when electron is ready, create the application window
app.on('ready', createWindow);

// quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS only quit when a user explicity quit's the application
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS, re-create the window when the icon is clicked in the dock
  if (window === null) {
    createWindow();
  }
});

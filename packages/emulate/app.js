const { app, BrowserWindow } = require("electron");
const path = require("path");
const navigator = require("./navigator");
isDev = process.env.NODE_ENV === "development";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      webviewTag: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: `${__dirname}/preload.js`,
    },
  });

  navigator(mainWindow);
  let indexPath = isDev
    ? `http://localhost:3000/`
    : `file://${path.join(__dirname, "build", "index.html")}`;

  mainWindow.loadURL(indexPath);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

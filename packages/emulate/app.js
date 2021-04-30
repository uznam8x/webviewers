const { app, BrowserWindow, Menu, dialog, shell } = require("electron");
const path = require("path");
const navigator = require("./src/navigator");
const { autoUpdater } = require("electron-updater");
isDev = process.env.NODE_ENV === "development";

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      webviewTag: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: `${__dirname}/src/preload.js`,
    },
  });

  Menu.setApplicationMenu(navigator(mainWindow));
  let indexPath = isDev
    ? `http://localhost:3000/`
    : `file://${path.join(__dirname, "build", "index.html")}`;

  mainWindow.loadURL(indexPath);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on("dom-ready", () => {
    autoUpdater.checkForUpdates();
  });
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

function sendStatusToWindow(text) {
  mainWindow.webContents.executeJavaScript(
    `
            (function(){
              console.log("${text}");
          })();
        `
  );
}
autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", (info) => {
  sendStatusToWindow("Update available.");

  dialog
    .showMessageBox(null, {
      type: "info",
      defaultId: 0,
      title: "Update available.",
      message:
        "There are available updates.\nPlease restart after installation.",
    })
    .then((res) => {
      shell.openExternal("https://github.com/uznam8x/webviewers/releases");
      app.quit();
    });
});
autoUpdater.on("update-not-available", (info) => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", (err) => {
  sendStatusToWindow("Error in auto-updater. " + err);
});
autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  sendStatusToWindow(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
  sendStatusToWindow("Update downloaded");
});

const { BrowserWindow, shell } = require("electron");
const { resolve } = require("path");
const appVersion = require("../../../package.json").version;

module.exports = function (mainWindow) {
  const window = new BrowserWindow({
    width: 480,
    height: 360,
    maximizable: false,
    minimizable: false,
    resizable: false,
    parent: mainWindow,
    title: "About Webviewers",
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  window.version = appVersion;

  

  window.webContents.on("dom-ready", () => {
    window.webContents.executeJavaScript(
      `
            (function(){
                const el = document.getElementById('version');
                if(!!el) el.innerHTML = "${appVersion}";
            })();
        `
    );
    
  });

  const handleRedirect = (e, url) => {
    if (url != window.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  };

  window.webContents.on("will-navigate", handleRedirect);
  window.webContents.on("new-window", handleRedirect);
  window.webContents.loadFile(resolve(__dirname, "index.html"));
};
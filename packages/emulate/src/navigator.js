const { app, Menu } = require("electron");
function navigator(window) {
  const menu = Menu.buildFromTemplate([
    {
      label: "Webviews",
      submenu: [
        {
          label: "Preference",
          accelerator: "Command+,",
          click: () => {
            window.webContents.send("app.preference", {});
          },
        },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          },
        }
      ],
    },
    {
      label: "File",
      submenu: [
        {
          label: "New window",
          accelerator: "Command+N",
          click: () => {
            window.webContents.send("app.add.browser", {});
          },
        },
      ],
    },
    {
      label: "Tools",
      submenu: [
        {
          label: "Reload",
          accelerator: "Command+R",
          click: () => {
            window.webContents.reload();
          },
        },
        {
          label: "Toggle Toolbar",
          accelerator: "Ctrl+Command+T",
          click: () => {
            window.webContents.send("app.tools.tool_bar", {});
          },
        },
        {
          label: "Toggle Statusbar",
          accelerator: "Ctrl+Command+S",
          click: () => {
            window.webContents.send("app.tools.status_bar", {});
          },
        },
        {
          label: "Toggle Full Screen",
          accelerator: "Ctrl+Command+F",
          click: () => {
            window.setFullScreen(!window.isFullScreen());
          },
        },
        {
          label: "Clear cache",
          accelerator: "Ctrl+Command+C",
          click: () => {
            window.webContents.send("app.tools.clear_cache", {});
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "Command+X", selector: "cut:" },
        { label: "Copy", accelerator: "Command+C", selector: "copy:" },
        { label: "Paste", accelerator: "Command+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "Command+A",
          selector: "selectAll:",
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}
module.exports = navigator;

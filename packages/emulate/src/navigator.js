const { app, Menu, BrowserWindow } = require("electron");
const about = require("./pages/about");
function navigator(window) {
  return Menu.buildFromTemplate([
    {
      role: "window",
      submenu: [
        {
          label: "About Webviews",
          click: () => {
            about(window);
          },
        },
        { role: "close" },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          },
        },
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

        {
          label: "Jump to the address bar",
          accelerator: "Command+L",
          click: () => {
            window.webContents.send("app.file.jump_address", {});
          },
        },
        {
          role: "separator",
        },
        ...Array(8)
          .fill(0)
          .map((value, index) => ({
            label: `Activate ${index + 1}`,
            accelerator: `Command+${index + 1}`,
            click: () => {
              window.webContents.send("app.file.activate", { index });
            },
          })),
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
        {
          label: "Open devtools",
          accelerator: "Ctrl+Command+D",
          click: () => {
            window.webContents.openDevTools();
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
}
module.exports = navigator;

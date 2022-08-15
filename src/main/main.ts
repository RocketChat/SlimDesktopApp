import { app, BrowserWindow, ipcMain } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import electron from "electron";
import { Room } from "../interfaces/room";
import Store from "electron-store";

const storage = new Store();

function getWindowSizePreference() : number[] {
    const defaultSize = [800, 600];
    const size: number[] = storage.get("rc-chat-win-size");
    if(size) return size;

    storage.set("rc-chat-win-size", defaultSize);
    return defaultSize;
}

function setWindowSizePreference(windowSize: number[]){
    const defaultSize = [800, 600];
    storage.set("rc-chat-win-size", windowSize || defaultSize);
}


declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS, {
    loadExtensionOptions: { allowFileAccess: true },
    forceDownload: false,
  })
    .then((name: string) => console.log(`Added Extension:  ${name}`))
    .catch((err: string) => console.log("An error occurred: ", err));
});

let mainWindow: null | BrowserWindow;

const createWindow = () => {

  ipcMain.on("create-window-chat", createChatWindow);
  ipcMain.on("close-all-window-chat", closeAllWindowChats);

  mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    resizable:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("closed", () => {
    mainWindow = null;
    app.quit();
  });

};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


let currentOpenedWindows: Map<String, null | BrowserWindow>;
  currentOpenedWindows = new Map<String, null | BrowserWindow>();

const createChatWindow = (e: any, room: Room) => {

  // If already opened, focus on it
  if(currentOpenedWindows.has(room._id)){
    currentOpenedWindows.get(room._id)?.show();
    currentOpenedWindows.get(room._id)?.focus();
    return;
  }

  const windowSizePref = getWindowSizePreference();
  let chatWindow: null | BrowserWindow = new BrowserWindow({
    width: windowSizePref[0],
    height: windowSizePref[1],
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  chatWindow.on('resize', function () {
    var size   = chatWindow?.getSize() || [800, 600];
    setWindowSizePreference(size);
  });

  // To make any link clicked on pop-up in the default browser
  chatWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    electron.shell.openExternal(url);
  });

  currentOpenedWindows.set(room._id, chatWindow);
  chatWindow.loadURL(
    MAIN_WINDOW_WEBPACK_ENTRY + "#/chat/" + room._id + `?name=${room.name}&avatar=${room.avatarLink}`
  );
  chatWindow.setTitle(room.name);

  chatWindow.on("closed", () => {
      currentOpenedWindows.delete(room._id);
      chatWindow = null;
  });
};

const closeAllWindowChats = () => {
  currentOpenedWindows.forEach((window) => {
    window?.close();
  });
}

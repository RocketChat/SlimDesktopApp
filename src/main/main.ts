import { app, BrowserWindow, ipcMain } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import Room from "../interfaces/room";

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
  if(currentOpenedWindows.has(room.id)){
    currentOpenedWindows.get(room.id)?.show();
    currentOpenedWindows.get(room.id)?.focus();
    return;
  }

  let chatWindow: null | BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  currentOpenedWindows.set(room.id, chatWindow);
  chatWindow.loadURL(
    MAIN_WINDOW_WEBPACK_ENTRY + "#/chat/" + room.id + `?name=${room.name}&avatar=${room.avatarLink}`
  );
  chatWindow.setTitle(room.name);

  chatWindow.on("closed", () => {
      currentOpenedWindows.delete(room.id);
      chatWindow = null;
  });
};

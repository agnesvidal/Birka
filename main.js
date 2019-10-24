//--------------------------------------------------------------------------
// Main process
//--------------------------------------------------------------------------
/**
 * Manages native elements.
 */

//--------------------------------------------------------------------------
// ...
//--------------------------------------------------------------------------
/**
 *
 * @type {Electron}
 */
var electron = require('electron');

/**
 *
 * @type {Electron.App}
 */
var app = electron.app;

/**
 *
 * @type {Electron.BrowserWindow}
 */
var BrowserWindow = electron.BrowserWindow;

/**
 * Global reference to the window object. Keeps the window from being closed
 * automatically when the JavaScript object is garbage collected.
 */
var win;

/**
 * Creates the application window.
 */
function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 900,
        height: 640,
        minHeight: 420,
        minWidth: 900,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    win.loadFile('src/index.html');

    // Open the DevTools.
    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', function(){
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

/**
 * Listens to when Electron has finished its initialization and
 * calls the function that creates the browser window(s).
 */
app.on('ready', createWindow);

/**
 * Quits when all windows are closed.
 */
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function(){
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
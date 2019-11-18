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
 *
 * @type {Electron.Menu}
 */
var Menu = electron.Menu;

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createMenu () {
    var template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open project...',
                    accelerator: "CmdOrCtrl+O",
                    selector: 'open',
                    role: 'openproject',
                    click: function () {
                        win.webContents.send('open');
                    }
                },
                {
                    label: 'Create new project...',
                    accelerator: "CmdOrCtrl+N",
                    selector: 'create',
                    role: 'createproject',
                    click: function () {
                        win.webContents.send('create');
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click(item, focusedWindow) {
                        if (focusedWindow) focusedWindow.reload()
                    }
                },
                { //@TODO Remove this for production
                    label: 'Toggle Developer Tools',
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow) {
                        if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                    }
                },
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            role: 'window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'}
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        require('electron').shell.openExternal('http://electron.atom.io')
                    }
                }
            ]
        }
    ];

    if (process.platform === 'darwin') {
        var name = app.getName();
        template.unshift({
            label: name,
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {
                    role: 'services',
                    submenu: []
                },
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        });

        // Window menu.
        template[3].submenu = [
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Zoom',
                role: 'zoom'
            },
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                role: 'front'
            }
        ]
    }

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

/**
 * Listens to when Electron has finished its initialization and
 * calls the function that creates the browser window(s).
 */
app.on('ready', createWindow);
app.on('ready', createMenu);

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
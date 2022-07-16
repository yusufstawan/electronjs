const { app, BrowserWindow, Menu, shell } = require('electron')
const path = require('path')

const menuItem = [
  {
    label: 'About',
    submenu: [
      {
        label: 'About',
      }
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'Open Camera',
        click: async () => {
          const win2 = new BrowserWindow({
            height: 500,
            width: 800,
            show: false,
            backgroundColor: '#f0f0f0'
          })

          // win2.webContents.openDevTools()
          win2.loadFile('camera.html')
          win2.once('ready-to-show', () => win2.show())
        }
      },
      {
        label: 'New Window url',
        click: async () => {
          // await shell.openExternal('https://electronjs.org')
          const win2 = new BrowserWindow({
            height: 300,
            width: 400
          })

          win2.loadURL('https://kelasweb.id/')
          win2.once('ready-to-show', () => win2.show())
        }
      },
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal('https://electronjs.org')
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Exit',
        click: () => app.quit()
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(menuItem)
Menu.setApplicationMenu(menu)

const createWindow = () => {
  const win = new BrowserWindow({
    height: 500,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

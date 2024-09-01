/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

// renderer
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    ipcRenderer.send('show-context-menu')
  })
  
  ipcRenderer.on('context-menu-command', (e, command) => {
    // ...
  })
  
  // main
  ipcMain.on('show-context-menu', (event) => {
    const template = [
      {
        label: 'Menu Item 1',
        click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
      },
      { type: 'separator' },
      { label: 'Menu Item 2', type: 'checkbox', checked: true }
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
  })
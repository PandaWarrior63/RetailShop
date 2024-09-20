let ipcRenderer: any;

if (window.require) {
    const electron = window.require('electron');
    ipcRenderer = electron.ipcRenderer;
}
export const DatabaseHelpers = {
    ipcRenderer: () => {
        return ipcRenderer;
    },
};
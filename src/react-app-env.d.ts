/// <reference types="react-scripts" />


interface Window {
    ipcRenderer: import('electron').IpcRenderer;
    api:{
        createTest:Promise<>,
    }
}
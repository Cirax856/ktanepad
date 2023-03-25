// import css
import './css/TopbarCSS.css';

// importing images
import ktanepadLogo from '../images/ktanepadlogo.png';
import minimizeLogo from '../images/minimizelogo.png';
import maximizeLogo from '../images/maximizelogo.png';
import closeLogo from '../images/closelogo.png';

// main function
export function Topbar() {
    // importing electron
    const { ipcRenderer } = window.require('electron');

    function close() {
        ipcRenderer.send('close');
    }

    function maximize() {
        ipcRenderer.send('max');
    }

    function minimize() {
        ipcRenderer.send('min');
    }

    // HTML
    return (
        <div className="Topbar">
            <img src={ktanepadLogo} alt="KTaNEPad Logo" className="Topbar__img" />
            <p className="Topbar__Drag Topbar__Text">KTaNEPad</p>
            <img src={maximizeLogo} alt="Maximize Image" className="Topbar__img Topbar__Pointer" onClick={maximize} />
            <img src={minimizeLogo} alt="Minmize Image" className="Topbar__img Topbar__Pointer" onClick={minimize} />
            <img src={closeLogo} alt="Close Image" className="Topbar__img Topbar__Pointer" onClick={close} />
        </div>
    );
}
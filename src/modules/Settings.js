// importing CSS
import './css/SettingsCSS.css';

// main function
export function Settings({ setIsLearning }) {
    // importing shell
    const { shell } = window.require('electron');

    // clicks
    function visit() {
        shell.openExternal("https://ktane.timwi.de");
    }

    function learning() {
        setIsLearning(current => !current);
    }

    // HTML
    return (
        <div className="Settings">
            <button className="Settings__Button" onClick={learning}>Learning</button>
            <button className="Settings__Button" onClick={visit}>Visit ktane.timwi.de</button>
        </div>
    );
}
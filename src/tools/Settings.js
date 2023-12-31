// importing CSS
import './css/SettingsCSS.css';

// main function
export function Settings({ setIsLearning, setIsOptions })
{
    // importing shell
    const { shell } = window.require('electron');

    // clicks
    function visit()
    {
        shell.openExternal("https://ktane.timwi.de");
    }

    function learning()
    {
        setIsLearning(true);
    }

    function options()
    {
        setIsOptions(true);
    }

    // HTML
    return (
        <div className="Settings">
            <button className="Settings__Button" onClick={learning}>Learning</button>
            <button className="Settings__Button" onClick={visit}>Visit ktane.timwi.de</button>
            <button className="Settings__Button" onClick={options}>Options</button>
        </div>
    );
}
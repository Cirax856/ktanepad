// import React
import { useState, useEffect } from 'react';

// importing CSS
import './css/TextfieldCSS.css';

// main function
export function Textfield({ textAreaRef })
{
    // line numbers state
    const [lines, setLines] = useState([0]);

    function manageInput(e)
    {
        if (e.key === 'Enter') newLine(e);
        if (e.key === 'ArrowUp') moveLine(e, 'up');
        if (e.key === 'ArrowDown') moveLine(e, 'down');
    }

    function newLine(e)
    {
        let newId = parseInt(e.target.id.match(/\d+/)) + 1;
        setLines([...lines, newId]);
    }

    useEffect(() => document.getElementById(`Textfield__Input${lines[lines.length - 1]}`).focus(), [lines]);

    function moveLine(e, dir)
    {
        let newId = parseInt(e.target.id.match(/\d+/));

        if (dir === 'up' && newId !== 0) newId--;
        if (dir === 'down' && newId !== lines.length - 1) newId++;

        document.getElementById(`Textfield__Input${newId}`).focus();
    }

    function lineClick(e)
    {
        document.getElementById(`Textfield__Input${e.target.id.match(/\d+/)}`).focus();
    }

    function outsideClick(e)
    {
        if (e.target.className === "Textfield") document.getElementById(`Textfield__Input${lines.length - 1}`).focus();
    }

    // HTML
    return (
        <div className="Textfield" onClick={event => { outsideClick(event) }}>
            {lines.map((line, index) =>
            {
                return (
                    <div className="Textfield__Line" id={index} onClick={event => { lineClick(event) }}>
                        <p className="Textfield__LineNumber" id={index}>{index + 1}</p>
                        <input className="Textfield__Input" id={`Textfield__Input${index}`} onKeyDown={event => { manageInput(event); }}></input>
                    </div>
                )
            })}
        </div>
    );
}
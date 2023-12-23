// import React
import { useState, useEffect } from 'react';

// importing CSS
import './css/TextfieldCSS.css';

// main function
export function Textfield()
{
    const [lines, setLines] = useState([{ id: 1, content: '' }]);
    const [focusedLine, setFocusedLine] = useState(1);

    function createLine(lineId)
    {
        setLines((prevLines) =>
        {
            const index = prevLines.findIndex((line) => line.id === lineId);
            const newLine = { id: prevLines.length + 1, content: '' };

            const updatedLines = [
                ...prevLines.slice(0, index + 1),
                newLine,
                ...prevLines.slice(index + 1),
            ];

            setFocusedLine(focusedLine + 1);

            return updatedLines.map((line, idx) => ({ ...line, id: idx + 1 }));
        });
    };

    useEffect(() =>
    {
        document.getElementById(`Textfield__Input${focusedLine}`).focus();
    }, [focusedLine]);

    function manageInput(e, lineId)
    {
        setLines((prevLines) =>
            prevLines.map((line) =>
                line.id === lineId ? { ...line, content: e.target.value } : line
            )
        );
    };

    function moveLine(e, dir)
    {
        if (dir === 'up' && focusedLine !== 1) setFocusedLine(focusedLine - 1);
        if (dir === 'down' && focusedLine !== lines.length) setFocusedLine(focusedLine + 1);
    }

    function deleteLine(e, backspace)
    {
        if (focusedLine !== 1)
        {
            setLines((prevLines) =>
            {
                const index = prevLines.findIndex((line) => line.id === focusedLine);

                if (backspace) prevLines.filter((line) => line.id === focusedLine - 1)[0].content += e.target.value;
                lines.splice(index, 1);
                return lines.map((line, idx) => ({ ...line, id: idx + 1 }));
            });

            setFocusedLine(focusedLine - 1);
        }
    }

    function handleKeyDown(e)
    {
        if (e.key === 'Enter') createLine(focusedLine);
        if (e.key === 'ArrowUp') moveLine(e, 'up');
        if (e.key === 'ArrowDown') moveLine(e, 'down');
        if (e.key === 'Delete') deleteLine(e, false);
        if (e.key === 'Backspace' && e.target.selectionStart === 0) deleteLine(e, true);
    };

    return (
        <div className="Textfield">
            {lines.map((line) => (
                <div className="Textfield__Line" id={line.id}>
                    <p className="Textfield__LineNumber">{line.id}</p>
                    <input
                        className="Textfield__Input"
                        id={`Textfield__Input${line.id}`}
                        value={line.content}
                        onChange={(e) => manageInput(e, line.id)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setFocusedLine(line.id)}
                    />
                </div>
            ))}
        </div>
    );
}
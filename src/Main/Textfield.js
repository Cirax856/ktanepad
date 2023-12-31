// import React
import { useState, useRef } from 'react';

// importing CSS
import './css/TextfieldCSS.css';

// main function
export function Textfield()
{
    // states
    const [lineNumbers, setLineNumbers] = useState(['']);

    // refs
    const lineNumbersRef = useRef(null);
    const textAreaRef = useRef(null);

    // text area features
    function handleTextareaScroll()
    {
        lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
    }

    function handleTextareaTextChange(e)
    {
        const text = e.target.value;
        const lines = text.split('\n');
        setLineNumbers(lines);
    }

    function addTab(e)
    {
        e.preventDefault();

        const { selectionStart } = e.target;
        const lines = textAreaRef.current.value.split('\n');
        const currentLineIndex = lines.length > 0 ? lines.slice(0, selectionStart || 0).length - 1 : 0;
        const currentLineContent = lines.length > 0 ? lines[currentLineIndex] : '';

        const spacesToAdd = 4 - (currentLineContent === undefined ? 0 : currentLineContent.length % 4);

        const newText = textAreaRef.current.value.slice(0, selectionStart || 0) + ' '.repeat(spacesToAdd) + textAreaRef.current.value.slice(selectionStart || 0);

        textAreaRef.current.value = newText;

        const newCursorPosition = (selectionStart || 0) + spacesToAdd;
        textAreaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }

    function handleKeyDown(e)
    {
        if (e.key === 'Tab') addTab(e);
    }

    // HTML
    return (
        <div className="Textfield">
            <div className="Textfield__LineNumbers" ref={lineNumbersRef}>
                {lineNumbers.map((line, index) => <p className="Textfield__LineNumber" key={index}>{index + 1}</p>)}
            </div>
            <textarea className="Textfield__Textarea" ref={textAreaRef} spellCheck="false" onChange={(e) => handleTextareaTextChange(e)} onScroll={handleTextareaScroll} onKeyDown={(e) => { handleKeyDown(e) }}></textarea>
        </div>
    );
}
// import React
import { useState, useRef } from 'react';

// importing CSS
import './css/TextfieldCSS.css';

// main function
export function Textfield()
{
    const [lineNumbers, setLineNumbers] = useState(['']);

    const lineNumbersRef = useRef(null);
    const textAreaRef = useRef(null);

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

        const { selectionStart, selectionEnd } = textAreaRef.current;
        const text = textAreaRef.current.value;

        const updatedText = text.substring(0, selectionStart) + '\t' + text.substring(selectionEnd);

        textAreaRef.current.value = updatedText;
        textAreaRef.current.setSelectionRange(selectionStart + 1, selectionStart + 1);
    }

    function handleKeyDown(e)
    {
        if (e.key === 'Tab') addTab(e);
    }

    // HTML
    return (
        <div className="Textfield">
            <div className="Textfield__LineNumbers" ref={lineNumbersRef}>
                {lineNumbers.map((line, index) => <p class="Textfield__LineNumber" key={index}>{index + 1}</p>)}
            </div>
            <textarea className="Textfield__Textarea" ref={textAreaRef} spellCheck="false" onChange={(e) => handleTextareaTextChange(e)} onScroll={handleTextareaScroll} onKeyDown={(e) => {handleKeyDown(e)}}></textarea>
        </div>
    );
}
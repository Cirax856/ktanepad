// import React
import { useRef, useState } from 'react';

// importing CSS
import './css/TextfieldCSS.css';

// main function
export function Textfield({ textAreaRef }) {
    // line numbers state
    const [lineNumbers, setLineNumbers] = useState(['']);

    // ref variable
    const lineNumbersRef = useRef(null);

    function handleTextareaScroll() {
        lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
    }

    function handleTextareaTextChange(e) {
        const text = e.target.value;
        const lines = text.split('\n');
        setLineNumbers(lines);
    }

    // HTML
    return (
        <div className="Textfield">
            <div className="Textfield__LineNumbers" ref={lineNumbersRef}>
                {lineNumbers.map((line, index) => {
                    return <div key={index}>{index + 1}</div>;
                })}
            </div>
            <textarea ref={textAreaRef} spellCheck="false" className="Textfield__Textarea" onChange={handleTextareaTextChange} onScroll={handleTextareaScroll} tabIndex="5"></textarea>
        </div>
    );
}
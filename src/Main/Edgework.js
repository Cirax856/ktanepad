// import React
import { useRef } from 'react';

// import CSS
import './css/EdgeworkCSS.css';

// main function
export function Edgework()
{
    // input ref
    const EdgeworkTextareaRef = useRef(null);

    // clear method
    function EdgeworkClear()
    {
        EdgeworkTextareaRef.current.value = '';
    }

    // HTML
    return (
        <div className="Edgework">
            <div className="Edgework__Container">
                <textarea className="Edgework__Textarea" ref={EdgeworkTextareaRef} tabIndex="-1" spellCheck="false"></textarea>
                <button className="Edgework__Clear" onClick={EdgeworkClear} tabIndex="-1">CLEAR</button>
            </div>
        </div>
    );
}
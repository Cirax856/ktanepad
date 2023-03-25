// import React
import { useRef } from 'react';

// import CSS
import './css/EdgeworkCSS.css';

// main function
export function Edgework({ textAreaRef }) {
    // input ref
    const EdgeworkInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    // clear method
    function EdgeworkClear() {
        EdgeworkInputRefs.forEach((ref) => {
            ref.current.value = '';
        })
    }

    // enter to switch through edgework input fields method
    function EnterSwitch(event, key) {
        if(event.key === 'Enter') {
            if(key !== 3) {
                EdgeworkInputRefs[key + 1].current.focus();
            } else {
                event.preventDefault()
                textAreaRef.current.focus();
            }
        }
    }

    // HTML
    return (
        <div className="Edgework">
            <div className="Edgework__Container">
                <p className="Edgework__Text">Batteries:</p>
                <input className="Edgework__Input" ref={EdgeworkInputRefs[0]} onKeyDown={(e) => EnterSwitch(e, 0)} tabIndex="1"></input>
                <button className="Edgework__Clear" onClick={EdgeworkClear} tabIndex="-1">CLEAR</button>
                <p className="Edgework__Text">Indicators:</p>
                <input className="Edgework__Input Edgework__Span" ref={EdgeworkInputRefs[1]} onKeyDown={(e) => EnterSwitch(e, 1)} tabIndex="2"></input>
                <p className="Edgework__Text">Ports:</p>
                <input className="Edgework__Input Edgework__Span" ref={EdgeworkInputRefs[2]} onKeyDown={(e) => EnterSwitch(e, 2)} tabIndex="3"></input>
                <p className="Edgework__Text">Serial Number:</p>
                <input className="Edgework__Input Edgework__Span" ref={EdgeworkInputRefs[3]} onKeyDown={(e) => EnterSwitch(e, 3)} tabIndex="4"></input>
            </div>
        </div>
    );
}
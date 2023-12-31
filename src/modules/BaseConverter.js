// importing React
import { useRef } from 'react';

// importing CSS
import './css/BaseConverterCSS.css';

// main function
export function BaseConverter()
{
    // refs
    const inputInputRef = useRef(null);
    const inputBaseRef = useRef(null);
    const outputInputRef = useRef(null);
    const outputBaseRef = useRef(null);

    // convert function
    function convertBase()
    {
        const input = inputInputRef.current.value;
        const fromBase = inputBaseRef.current.value;
        const toBase = outputBaseRef.current.value;

        const digitsNormal = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz*/";
        const digits64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        const digits = fromBase === '64' ? digits64 : digitsNormal;

        // converting to base 10
        var base10 = 0;
        var base10exponent = 0;

        for (let i = input.toString().length - 1; i >= 0; i--)
        {
            base10 += digits.indexOf(input.toString()[i]) * Math.pow(fromBase, base10exponent);
            base10exponent++;
        }

        // converting to toBase
        var output = "";

        while (base10 !== 0)
        {
            output += digitsNormal[base10 % toBase].toString();
            base10 = Math.floor(base10 / toBase);
        }

        if (output === "") output = "0";

        outputInputRef.current.value = output.split("").reverse().join("");
    }

    // HTML
    return (
        <div className="BaseConverter">
            <div className="BaseConverter__inputSide BaseConverter__column">
                <h1 className="BaseConverter__center">INPUT</h1>

                <p className="BaseConverter__center">Base:</p>
                <div className="BaseConverter__center">
                    <input className="BaseConverter__inputBase BaseConverter__inputElement BaseConverter__center" ref={inputBaseRef}></input>
                </div>
                <p className="BaseConverter__center">Input:</p>
                <div className="BaseConverter__center">
                    <input className="BaseConverter__inputInput BaseConverter__inputElement BaseConverter__center" ref={inputInputRef}></input>
                </div>
            </div>
            <div className="BaseConverter__outputSide BaseConverter__column">
                <h1 className="BaseConverter__center">OUTPUT</h1>

                <p className="BaseConverter__center">Base:</p>
                <div className="BaseConverter__center">
                    <input className="BaseConverter__outputBase BaseConverter__inputElement" ref={outputBaseRef}></input>
                </div>
                <p className="BaseConverter__center">Output: (disabled)</p>
                <div className="BaseConverter__center">
                    <input className="BaseConverter__outputInput BaseConverter__inputElement BaseConverter__inputElement_disabled" ref={outputInputRef} disabled></input>
                </div>
            </div>
            <div className="BaseConverter__convert">
                <button className="BaseConverter__button" onClick={convertBase}>CONVERT</button>
            </div>
        </div>
    );
}
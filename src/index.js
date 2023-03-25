// importing React
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// importing parts
import { Topbar } from './Main/Topbar';
import { Textfield } from './Main/Textfield';
import { Edgework } from './Main/Edgework';
import { Module } from './Main/Module';

// import css
import './main.css';

// main function
function App() {
    const [isLearning, setIsLearning] = useState(false);
    const TextfieldRef = useRef(null);

    // HTML
    return (
        <>
            <Topbar className="Main__Topbar" />
            {
                isLearning
                ?
                (
                    <div className="Main_Learning__Container">
                        <h1>COMING SOON</h1>
                    </div>
                )
                :
                (
                    <div className="Main__Container">
                        <Textfield classname="Main__Textfield" textAreaRef={TextfieldRef} />
                        <div className="Main__Right_Container">
                            <Edgework className="Main__Edgework" textAreaRef={TextfieldRef} />
                            <Module className="Main__Module" setIsLearning={setIsLearning} />
                        </div>
                    </div>
                )
            }
        </>
    );
}

// rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <App />;
root.render(element);
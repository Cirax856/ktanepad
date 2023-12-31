// importing React
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// importing parts
import { Topbar } from './Main/Topbar';
import { Textfield } from './Main/Textfield';
import { Edgework } from './Main/Edgework';
import { Tools } from './Main/Tools';

// import css
import './main.css';

// main function
function App()
{
    // states and refs
    const [isLearning, setIsLearning] = useState(false);
    const [isOptions, setIsOptions] = useState(false);

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
                        isOptions
                            ?
                            (
                                <div className="Main_Options__Container">
                                    <h1>COMING SOON</h1>
                                </div>
                            )
                            :
                            (
                                <div className="Main__Container">
                                    <Textfield classname="Main__Textfield" />
                                    <div className="Main__Right_Container">
                                        <Edgework className="Main__Edgework" />
                                        <Tools className="Main__Tools" setIsLearning={setIsLearning} setIsOptions={setIsOptions} />
                                    </div>
                                </div >
                            )
                    )
            }
        </>
    );
}

// rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <App />;
root.render(element);
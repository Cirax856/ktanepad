// import React
import { useState } from 'react';

// import CSS
import './css/ToolsCSS.css';

// importing images
import searchIcon from '../images/searchlogo.png';
import settingsIcon from '../images/settingsicon.png';

// importing tools
import { EnglishAlphabetWithPositions } from '../tools/EnglishAlphabetWithPositions';
import { NoTool } from '../tools/NoTool';
import { Settings } from '../tools/Settings';
import { MorseCodeTranslation } from '../tools/MorseCodeTranslation';
import { BaseConverter } from '../tools/BaseConverter';
import { PhoneticAlphabet } from '../tools/PhoneticAlphabet';

// main function
export function Tool({ setIsLearning, setIsOptions })
{
    // states
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // tool array
    const tools = [
        <NoTool />,
        <Settings setIsLearning={setIsLearning} setIsOptions={setIsOptions} />,
        <EnglishAlphabetWithPositions />,
        <MorseCodeTranslation />,
        <PhoneticAlphabet />,
        <BaseConverter />,
    ];
    const toolNames = ['English Alphabet With Positions', 'Morse Code Translation', 'Phonetic Alphabet', 'Base Converter'];
    const filteredToolNames = toolNames.filter(name => searchValue.length < 2 ? true : name.toLowerCase().includes(searchValue.toLowerCase()));
    const [toolIndex, setToolIndex] = useState(0);

    // search logic
    function toolSearchCheck(e)
    {
        if (e.target.value.length > 0)
        {
            setIsSearching(true);
        } else
        {
            setIsSearching(false);
        }

        setSearchValue(e.target.value);
    }

    function toolClick(e)
    {
        setSearchValue('');
        setIsSearching(false);

        setToolIndex(toolNames.indexOf(e) + 2);
    }

    // image click
    function searchIconClick()
    {
        setToolIndex(0);
    }

    function settingsClick()
    {
        setSearchValue('');
        setIsSearching(false);
        setToolIndex(1);
    }

    // HTML
    return (
        <div className="Tool">
            <div className="Tool__Container">
                <div className="Tool__Content">
                    {
                        isSearching
                            ?
                            (
                                <div className="Tool__SearchResults">
                                    {
                                        filteredToolNames.map(x =>
                                        {
                                            return <button key={x} value={x} onClick={(e) => { toolClick(e.target.value) }} className="Tool__ToolButton">{x}</button>
                                        })
                                    }
                                </div>
                            )
                            :
                            tools[toolIndex]
                    }
                </div>
                <div className="Tool__Search">
                    <div className="Tool__imgContainer">
                        <img draggable="false" src={searchIcon} alt="Search Icon" className="Tool__img" onClick={searchIconClick} />
                    </div>
                    <input className="Tool__Input" onChange={toolSearchCheck} value={searchValue}></input>
                    <div className="Tool__imgContainer">
                        <img draggable="false" src={settingsIcon} alt="Settings Icon" className="Tool__img" onClick={settingsClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}
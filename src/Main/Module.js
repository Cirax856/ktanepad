// import React
import { useState } from 'react';

// import CSS
import './css/ModuleCSS.css';

// importing images
import searchIcon from '../images/searchlogo.png';
import settingsIcon from '../images/settingsicon.png';

// importing modules
import { EnglishAlphabetWithPositions } from '../modules/EnglishAlphabetWithPositions';
import { NoModule } from '../modules/NoModule';
import { Settings } from '../modules/Settings';
import { MorseCodeTranslation } from '../modules/MorseCodeTranslation';
import { BaseConverter } from '../modules/BaseConverter';
import { PhoneticAlphabet } from '../modules/PhoneticAlphabet';

// main function
export function Module({ setIsLearning, textAreaRef }) {
    // states
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // module array
    const modules = [
        <NoModule />,
        <Settings setIsLearning={setIsLearning} />,
        <EnglishAlphabetWithPositions />,
        <MorseCodeTranslation />,
        <PhoneticAlphabet />,
        <BaseConverter />,
    ];
    const moduleNames = ['English Alphabet With Positions', 'Morse Code Translation', 'Phonetic Alphabet', 'Base Converter'];
    const filteredModuleNames = moduleNames.filter(name => searchValue.length < 2 ? true : name.toLowerCase().includes(searchValue.toLowerCase()));
    const [moduleIndex, setModuleIndex] = useState(0);

    // search logic
    function ModuleSearchCheck(e) {
        if(e.target.value.length > 0) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }

        setSearchValue(e.target.value);
    }

    function moduleClick(e) {
        setSearchValue('');
        setIsSearching(false);

        setModuleIndex(moduleNames.indexOf(e) + 2);
    }

    // image click
    function searchIconClick() {
        setModuleIndex(0);
    }

    function settingsClick() {
        setModuleIndex(1);
    }

    // HTML
    return (
        <div className="Module">
            <div className="Module__Container">
                <div className="Module__Content">
                    {
                        isSearching
                        ?
                        (
                            <div className="Module__SearchResults">
                                {
                                    filteredModuleNames.map(x => {
                                        return <button value={x} onClick={(e) => {moduleClick(e.target.value)}} className="Module__ModuleButton">{x}</button>
                                    })
                                }
                            </div>
                        )
                        :
                        modules[moduleIndex]
                    }
                </div>
                <div className="Module__Search">
                    <div className="Module__imgContainer">
                        <img src={searchIcon} alt="Search Icon" className="Module__img" onClick={searchIconClick} />
                    </div>
                    <input className="Module__Input" onChange={ModuleSearchCheck} value={searchValue} tabIndex="6"></input>
                    <div className="Module__imgContainer">
                        <img src={settingsIcon} alt="Settings Icon" className="Module__img" onClick={settingsClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}
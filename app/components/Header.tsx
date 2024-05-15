"use client"
import React, { useState, useEffect} from 'react'
import "../stylesheets/Header.scss" 
import "../stylesheets/AnimatedTheme.scss" 
import { useLocale } from 'next-intl'
import { useCounterStore } from '../store/storeProvider'
import { ResetTest } from '../helpers/resetTest'
import { getCookie } from 'cookies-next'

export interface Options {

    language: string[];
}

export const options: Options = {
    language: [
        "en",
        "tr",
    ],
};

interface AnimationProps {
    top: number;
    left: number;
    theme: string;
}
const Header = () => {
const store = useCounterStore((state) => state)
const { setWordList, timerSet, timerId, language, setLanguage } = useCounterStore((state) => state)
const locale = useLocale();
const [animationProps, setAnimationProps] =
useState<AnimationProps | null>();


const changeLanguage = (nextLanguage:any) => {
    window.location.replace(nextLanguage);
    setLanguage(nextLanguage)
  };

useEffect(() => {
    const lng = locale || getCookie("NEXT_LOCALE")
    const time = parseInt(localStorage.getItem("time") || "60", 10);

        import(`../wordlists/${lng}.json`).then((words) =>
            setWordList(words.default)
        )
 
    timerSet(time);
}, [locale]);

useEffect(() => {
    if (language !== "") {
        document.querySelector(".language")?.childNodes.forEach((el) => {
            if (el instanceof HTMLButtonElement)
                el.classList.remove("selected");
        });
        document
            .querySelector(`button[value="${language}"]`)
            ?.classList.add("selected");
            setLanguage(language);
            ResetTest(store, locale);
    }
}, [language]);


const handleOptions = ({ target }: React.MouseEvent) => {
    if (target instanceof HTMLButtonElement && target.dataset.option) {
        switch (target.dataset.option) {
            case "language":
                changeLanguage(target.value)
                break;
        }       
        target.blur();
    }
};


  return (
    <header className={timerId ? "hidden" : undefined}>
    <a href="." className="brand">
        typing-test
    </a>
    <div className="buttons">

    {Object.entries(options).map(([option, choices]) => (
                    <div key={option} className={option}>
                        {option}:
                        {choices.map((choice: string) => (
                            <button
                                className="mini"
                                key={choice}
                                data-option={option}
                                value={choice}
                                onClick={(e) => handleOptions(e)}>
                               {choice}
                            </button>
                        ))}
                    </div>
                ))}

   
    </div>
     {animationProps ? (
        <div
            className={`animated-theme ${animationProps.theme}`}
            style={{
                top: animationProps.top,
                left: animationProps.left,
            }}
            onAnimationEnd={() => setAnimationProps(null)}></div>
    ) : null} 
</header>
  )
}

export default Header

function t(arg0: string, arg1: { lng: any }): string | URL {
    throw new Error('Function not implemented.')
}

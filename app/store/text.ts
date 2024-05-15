import { createStore } from 'zustand/vanilla'
import { RefObject } from 'react';

export type WordState = {
    currWord: string;
    typedWord: string;
    typedHistory: string[];
    wordList: string[];
    activeWordRef: RefObject<HTMLDivElement> | null;
    caretRef: RefObject<HTMLSpanElement> | null;
    timer: number;
    timerId: NodeJS.Timeout | null;
    language:string
}

export type CounterActions = {
    setChar : (payload:any) =>any
    setWord: (payload:any) => any
    backtrackWord: (payload:any) => any
    setWordList:(payload:any) => any
    setRef:(payload:any) => any
    setCaretRef:(payload:any) => any
    timerDecrement: () => any
    timerSet: (payload:any) => any
    setTimerId: (id:any) => any
    setLanguage:(payload:any) => any
    appendTypedHistory : () => any
    setTypedWord : (payload:any) => any
}

export type CounterStore = WordState & CounterActions

export const defaultInitState: WordState = {
    currWord: "",
    typedWord: "",
    typedHistory: [],
    wordList: [],
    activeWordRef: null,
    caretRef: null,
    timer: 1,
    timerId: null,
    language:""
}

export const createWordStore = (
  initState: WordState = defaultInitState,
  
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    setWord : (payload) => set((state) => {return {...state,typedHistory:[...state.typedHistory, payload] }} ),
    setChar : (payload) => set((state) =>{ return { ...state, typedWord: payload } }),
    backtrackWord : (payload) => set((state) => {
        const prevIdx = state.typedHistory.length - 1
        return {
        ...state,
        currWord: state.wordList[prevIdx],
        typedWord: !payload ? state.typedHistory[prevIdx] : "",
        typedHistory: state.typedHistory.splice(0, prevIdx),
      } } ),
    setWordList : (payload) => {
        const areNotWords = payload.some((word: string) =>
            word.includes(" ")
        );    var shuffledWordList: string[] = payload.sort(
            () => Math.random() - 0.5
        );    if (areNotWords)
            shuffledWordList = payload.flatMap((token: string) =>
                token.split(" ")
            );  set((state) => { return {   ...state,
                typedWord: "",
                typedHistory: [],
                currWord: shuffledWordList[0],
                wordList: shuffledWordList }} )},
    setRef : (payload) => set((state) => { return {   ...state,
        activeWordRef: payload, }}),
    setCaretRef : (payload) => set((state) => {return {  ...state,
        caretRef: payload, }}),
        timerDecrement: () => set((state) => { return  {...state, timer: state.timer - 1}}),
        timerSet : (payload) => set((state) => { 
            return { ...state, timer: payload }}),
        setTimerId : (id) => set((state) => { return {...state, timerId: id  }}),
        setLanguage : (payload) => set((state) => ({...state, language: payload  })),
        appendTypedHistory :() =>  set((state) => {
            const nextIdx = state.typedHistory.length + 1
            return  {...state, typedWord:"", currWord: state.wordList[nextIdx], typedHistory: [...state.typedHistory, state.typedWord]  }}),
        setTypedWord: (payload) => set((state) => { return {...state, typedWord: payload} } ),
  }))
}

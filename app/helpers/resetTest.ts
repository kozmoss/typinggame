import { CounterStore } from "../store/text";
export const ResetTest = async (store: CounterStore, lng: string) => {
    const { timerId, setTimerId, setWordList, timerSet } = store
    document
        .querySelectorAll(".wrong, .right")
        .forEach((el) => el.classList.remove("wrong", "right"));
    if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
    }
    console.log("lang",lng)
    import(`../wordlists/${lng}.json`).then((words) =>
        setWordList(words.default)
    );
    timerSet(60)
};
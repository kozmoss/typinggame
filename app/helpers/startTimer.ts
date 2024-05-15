import { CounterStore } from "../store/text";

export const StartTimer = (store:CounterStore) => {
    const { timerDecrement, setTimerId} = store
    const timerId = setInterval(() => {
        timerDecrement();
    }, 1000);
    setTimerId(timerId);
};
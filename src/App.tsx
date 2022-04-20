import {defineStore, useStore} from "./store";

const store = defineStore({
    counter: 0
});

export const App = () => {
    const counter = useStore(store, (s) => s.counter);
    const inc = () => {
        store.setState((s) => ({
            ...s,
            counter: s.counter + 1
        }));
    };

    return (
        <div>
            <div>{counter}</div>

            <button onClick={inc}>Inc</button>
        </div>
    );
};

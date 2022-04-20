import {defineStore, useStore} from "./store";

const store = defineStore({
    counter: 0,
    message: ""
});

export const WholeState = () => {
    const state = useStore(store);

    return <div>{JSON.stringify(state)}</div>;
};

export const Counter = () => {
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

export const Message = () => {
    const message = useStore(store, (s) => s.message);
    const update = (e) => {
        store.setState((s) => ({
            ...s,
            message: e.target.value
        }));
    };

    return (
        <div>
            <input onChange={update} value={message} />
        </div>
    );
};

export const App = () => {
    return (
        <div>
            <Counter />
            <Message />
            <WholeState />
        </div>
    );
};

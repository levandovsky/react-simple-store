import {defineStore, useStore} from "./store";

interface State {
    counter: number;
    message: string;
}

const initialState: State = {
    counter: 0,
    message: ""
}

const store = defineStore<State>(initialState);

const resetStore = () => {
    store.setState(initialState);
};

export const WholeState = () => {
    const state = useStore(store);

    return (
        <div style={{padding: "1rem", border: "1px solid blue"}}>
            <div>Whole state component:</div>

            <div>{JSON.stringify(state)}</div>
        </div>
    );
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
        <div style={{padding: "1rem", border: "1px solid red"}}>
            <div>Counter component</div>

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
        <div style={{padding: "1rem", border: "1px solid purple"}}>
            <div>Message component:</div>

            <div>
                <input onChange={update} value={message} />
            </div>
        </div>
    );
};

export const App = () => {
    return (
        <div>
            <Counter />
            <Message />
            <WholeState />

            <br />

            <button onClick={resetStore}>Reset</button>
        </div>
    );
};

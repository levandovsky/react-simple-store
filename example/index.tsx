import {createRoot} from "react-dom/client";
import {defineStore, useStore} from "..";

const store = defineStore({
    counter: 0
});

const App = () => {
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

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

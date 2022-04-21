import {defineStore, useStore} from "./store";
import styles from "./App.module.css";

const initialState = {
    counter: 0,
    message: ""
}

const store = defineStore(initialState);

const resetStore = () => {
    store.setState(initialState);
};

export const WholeState = () => {
    const state = useStore(store);

    return (
        <section className={`${styles.section} ${styles.mb} ${styles.borderRed}`}>
            <div>Whole state component:</div>

            <div>{JSON.stringify(state)}</div>
        </section>
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
        <section className={`${styles.section} ${styles.mb} ${styles.borderBlue}`}>
            <div>Counter component</div>

            <div>{counter}</div>

            <button onClick={inc}>Inc</button>
        </section>
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
        <section className={`${styles.section} ${styles.mb} ${styles.borderOrange}`}>
            <div>Message component:</div>

            <div>
                <input onChange={update} value={message} />
            </div>
        </section>
    );
};

const ResetState = () => <section className={`${styles.section} ${styles.borderPink}`}>
    <div>
        Reset state component:
    </div>
    <button onClick={resetStore}>Reset</button>
</section>

export const App = () => {
    return (
        <main>
            <Counter />
            <Message />
            <WholeState />
            <ResetState />
        </main>
    );
};

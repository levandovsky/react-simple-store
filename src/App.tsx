import styles from "./App.module.css";

import {ChangeEvent} from "react";
import {useStore} from "./simple-store/store";
import {resetStore, StateStore} from "./state";

const WholeState = () => {
    const state = useStore(StateStore);

    return (
        <section className={`${styles.section} ${styles.mb} ${styles.borderRed}`}>
            <div>Whole state component:</div>

            <div>{JSON.stringify(state)}</div>
        </section>
    );
};

const Counter = () => {
    const counter = useStore(StateStore, (s) => s.counter);
    const inc = () => {
        StateStore.setState({
            counter: counter + 1
        });
    };

    return (
        <section className={`${styles.section} ${styles.mb} ${styles.borderBlue}`}>
            <div>Counter component</div>

            <div>{counter}</div>

            <button onClick={inc}>Inc</button>
        </section>
    );
};

const Message = () => {
    const message = useStore(StateStore, (s) => s.message);

    const update = (e: ChangeEvent<HTMLInputElement>) => {
        StateStore.setState({message: e.target.value});
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

const ResetState = () => (
    <section className={`${styles.section} ${styles.borderPink}`}>
        <div>Reset state component:</div>
        <button onClick={resetStore}>Reset</button>
    </section>
);

export const App = () => (
    <main>
        <Counter />
        <Message />
        <WholeState />
        <ResetState />
    </main>
);

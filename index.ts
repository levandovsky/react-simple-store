import {useEffect, useState} from "react";

export type UpdateFn<State> = (state: State) => State;
export type SetterFn<State> = (update: UpdateFn<State>) => void;
export type SelectorFn<State> = (state: State) => unknown;

export interface Store<State> {
    getState(): State;
    setState: SetterFn<State>;
    subscribe(listener: VoidFunction): void;
}

export function defineStore<State>(initialState: State): Store<State> {
    let state = initialState;
    const listeners = new Set<VoidFunction>();

    const getState = () => state;
    const setState = (update: UpdateFn<State>) => {
        state = update(state);

        listeners.forEach((listener) => {
            listener();
        });
    };

    const subscribe = (listener: VoidFunction) => {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    };

    return {
        setState,
        getState,
        subscribe
    };
}

export function useStore<State>(store: Store<State>): State;
export function useStore<State, Selector extends SelectorFn<State>>(store: Store<State>, selector: Selector): ReturnType<Selector>;
export function useStore<State>(store: Store<State>, selector?: SelectorFn<State>) {
    const s = (slice: State) => {
        if (selector) return selector(slice);
        return slice;
    };

    const [state, setState] = useState(() => s(store.getState()));

    useEffect(() => {
        const callback = () => {
            setState(s(store.getState()));
        };
        const unsubscribe = store.subscribe(callback);
        callback();
        return unsubscribe;
    }, [state, selector]);

    return state;
}


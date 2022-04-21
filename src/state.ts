import {defineStore} from "./simple-store/store";

const initialState = {
    counter: 0,
    message: ""
};

export const StateStore = defineStore(initialState);

export const resetStore = () => {
    StateStore.setState(initialState);
};

import { createContext } from "react";

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adults: undefined,
        children: undefined,
        room: undefined,
    }
};

export const SearchContext  = createContext(INITIAL_STATE);
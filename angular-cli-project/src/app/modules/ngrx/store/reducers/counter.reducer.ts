import {Action} from "@ngrx/store";


export const COUNTER_INCREMENT = 'increment';
export const COUNTER_DECREMENT = 'decrement';


export function counterReducer(state: number, action: Action) {
    switch (action.type) {
        case COUNTER_INCREMENT:

            return ++state;

        case COUNTER_DECREMENT:

            return --state;

        default:

            return state;
    }
}

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";
import { selectDateStart } from "./recorder";
import { create } from "domain";

export interface UserEvent {
    id: number;
    title: string;
    dateStart: string;
    dateEnd: string;
}

interface UserEventsState {
    byIds: Record<UserEvent['id'], UserEvent>,
    allIds: UserEvent['id'][];
}
const LOAD_REQUEST = 'userEvents/load_request';
interface LoadRequestAction extends Action<typeof LOAD_REQUEST> { };

const LOAD_SUCCESS = 'userEvents/load_success';
interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
    payload: {
        events: UserEvent[];
    }
};

const LOAD_ERROR = 'userEvents/load_error';
interface LoadErrorAction extends Action<typeof LOAD_ERROR> {
    error: string;
};

export const loadUserEvents = (): ThunkAction<
    void,
    RootState,
    undefined,
    LoadRequestAction | LoadSuccessAction | LoadErrorAction
> => async (dispatch, getState) => {
    dispatch({
        type: LOAD_REQUEST
    });

    try {
        const response = await fetch('http://localhost:3001/events');
        const events: UserEvent[] = await response.json();

        dispatch({
            type: LOAD_SUCCESS,
            payload: { events }
        })
    } catch (e) {
        dispatch({
            type: LOAD_ERROR,
            error: 'Faild to load events.'
        })
    }
};

const CREATE_REQUEST = 'userEvents/create_request';

interface CreateRequestAction extends Action<typeof CREATE_REQUEST> { };

const CREATE_SUCCESS = 'userEvents/create_success';
interface CreateSuccessAction extends Action<typeof CREATE_SUCCESS> {
    payload: {
        event: UserEvent;
    };
};

const CREATE_ERROR = 'userEvents/create_error';
interface CreateErrorAction extends Action<typeof CREATE_ERROR> {
    error: string;
};
export const createUserEvent = (): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    CreateRequestAction | CreateSuccessAction | CreateErrorAction
> => async (dispatch, getState) => {
    dispatch({
        type: CREATE_REQUEST
    });

    try {
        const dateStart = selectDateStart(getState());
        const event: Omit<UserEvent, 'id'> = {
            title: ' No name',
            dateStart,
            dateEnd: new Date().toISOString()
        };

        const response = await fetch(`http://localhost:3001/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        const createdEvent: UserEvent = await response.json();
        dispatch({
            type: CREATE_SUCCESS,
            payload: { event: createdEvent }
        });
    } catch (e) {
        dispatch({
            type: CREATE_ERROR,
            error: 'Failed to create new event.'
        })
    }
};

const selectUserEventsState = (rootState: RootState) => rootState.userEvents;

export const selectUserEventsArray = (rootState: RootState) => {
    const state = selectUserEventsState(rootState);
    return state.allIds.map(id => state.byIds[id]);
};

const initialState: UserEventsState = {
    byIds: {},
    allIds: []
}
const userEventsReducer = (
    state: UserEventsState = initialState,
    action: LoadSuccessAction | CreateSuccessAction
) => {
    switch (action.type) {
        case LOAD_SUCCESS:
            const { events } = action.payload;
            return {
                ...state, allIds: events.map(({ id }) => id),
                byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
                    byIds[event.id] = event;
                    return byIds;
                }, {})
            };
        case CREATE_SUCCESS:
            const { event } = action.payload
            return {
                ...state, 
                allIds: [...state.allIds, event.id], 
                byIds: {...state.byIds, [event.id]: event}
            };
        default:
            return state;
    }
}

export default userEventsReducer;
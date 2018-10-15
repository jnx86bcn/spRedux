import {Reducer} from 'redux';

import { State } from '../state';
import { Action, ActionTypes } from '../actions';

const initState = new State();

export const sharepointReducer: Reducer<State> = (state: State = initState, action: Action): State => {

    switch (action.type) {

        case ActionTypes.SET_ERROR:
            return state.setError(action.payload);
        case ActionTypes.SET_SUCCESS:
            return state.setSuccess(action.payload);
        case ActionTypes.SET_INPROCESS:
            return state.setInProcess(action.payload);

        case ActionTypes.ADD_ITEM_REQUEST:
            return state;
        case ActionTypes.ADD_ITEM_SUCCESS:
            return state.addItem(action.payload);
        case ActionTypes.ADD_ITEM_ERROR:
            return state;

        case ActionTypes.GET_LIST_ITEM_BY_ID_REQUEST:
            return state;
        case ActionTypes.GET_LIST_ITEM_BY_ID_SUCCESS:
            return state.getListItemById(action.payload);
        case ActionTypes.GET_LIST_ITEM_BY_ID_ERROR:
            return state;

        case ActionTypes.GET_CHOICE_FIELD_REQUEST:
            return state;
        case ActionTypes.GET_CHOICE_FIELD_SUCCESS:
            return state.getChoiceOptions(action.payload);
        case ActionTypes.GET_CHOICE_FIELD_ERROR:
            return state;

        case ActionTypes.GET_LOOKUP_LIST_REQUEST:
            return state;
        case ActionTypes.GET_LOOKUP_LIST_SUCCESS:
            return state.getLookupList(action.payload);
        case ActionTypes.GET_LOOKUP_LIST_ERROR:
            return state;

        default: 
            return state;
    };
}
import { ActionTypes, Action } from './actionTypes';

//#region messages
export const setErrorMessage = (message: string): Action => ({
    type: ActionTypes.SET_ERROR,
    payload: message
});

export const setSuccessMessage = (message: string): Action => ({
    type: ActionTypes.SET_SUCCESS,
    payload: message
});

export const setInProcess = (value: boolean): Action => ({
    type: ActionTypes.SET_INPROCESS,
    payload: value
});
//#endregion

//#region addItem
export const addItem_Request = (): Action => ({
    type: ActionTypes.ADD_ITEM_REQUEST
});

export const addItem_Success = (model: any): Action => ({
    type: ActionTypes.ADD_ITEM_SUCCESS,
    payload: model
});

export const addItem_Error = (error: Error): Action => ({
    type: ActionTypes.ADD_ITEM_ERROR,
    payload: error.message
});
//#endregion

//#region getListItemById
export const getListItemById_Request = (): Action => ({
    type: ActionTypes.GET_LIST_ITEM_BY_ID_REQUEST
});

export const getListItemById_Success = (model: any): Action => ({
    type: ActionTypes.GET_LIST_ITEM_BY_ID_SUCCESS,
    payload: model
});

export const getListItemById_Error = (error: Error): Action => ({
    type: ActionTypes.GET_LIST_ITEM_BY_ID_ERROR,
    payload: error.message
});
//#endregion

//#region getChoiceOptionsField
export const getchoiceOptionsField_Request = (): Action => ({
    type: ActionTypes.GET_CHOICE_FIELD_REQUEST
});

export const getchoiceOptionsField_Success = (choiceOptions: Array<any>): Action => ({
    type: ActionTypes.GET_CHOICE_FIELD_SUCCESS,
    payload: choiceOptions
});

export const getchoiceOptionsField_Error = (error: Error): Action => ({
    type: ActionTypes.GET_CHOICE_FIELD_ERROR,
    payload: error.message
});
//#endregion

//#region lookupList
export const getLookupList_Request = (): Action => ({
    type: ActionTypes.GET_LOOKUP_LIST_REQUEST
});

export const getLookupList_Success = (lookupList: Array<any>): Action => ({
    type: ActionTypes.GET_LOOKUP_LIST_SUCCESS,
    payload: lookupList
});

export const getLookupList_Error = (error: Error): Action => ({
    type: ActionTypes.GET_LOOKUP_LIST_ERROR,
    payload: error.message
});
//#endregion
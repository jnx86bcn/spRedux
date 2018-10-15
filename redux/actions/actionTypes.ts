
export enum ActionTypes {
    SET_ERROR = "SET_ERROR",   
    SET_SUCCESS = "SET_SUCCESS", 
    SET_INPROCESS = "SET_INPROCESS",

    ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST",
    ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS",
    ADD_ITEM_ERROR = "ADD_ITEM_ERROR",

    GET_LIST_ITEM_BY_ID_REQUEST = "GET_LIST_ITEM_BY_ID_REQUEST",
    GET_LIST_ITEM_BY_ID_SUCCESS = "GET_LIST_ITEM_BY_ID_SUCCESS",
    GET_LIST_ITEM_BY_ID_ERROR = "GET_LIST_ITEM_BY_ID_ERROR",

    GET_CHOICE_FIELD_REQUEST = "GET_CHOICE_FIELD_REQUEST",
    GET_CHOICE_FIELD_SUCCESS = "GET_CHOICE_FIELD_SUCCESS",
    GET_CHOICE_FIELD_ERROR = "GET_CHOICE_FIELD_ERROR",

    GET_LOOKUP_LIST_REQUEST = "GET_LOOKUP_LIST_REQUEST",
    GET_LOOKUP_LIST_SUCCESS = "GET_LOOKUP_LIST_SUCCESS",
    GET_LOOKUP_LIST_ERROR = "GET_LOOKUP_LIST_ERROR"
}

export type Action =
    { type: ActionTypes.SET_ERROR, payload: string } |
    { type: ActionTypes.SET_SUCCESS, payload: string } |
    { type: ActionTypes.SET_INPROCESS, payload: boolean } |

    { type: ActionTypes.ADD_ITEM_REQUEST } |
    { type: ActionTypes.ADD_ITEM_SUCCESS, payload: any } |
    { type: ActionTypes.ADD_ITEM_ERROR, payload: string } |

    { type: ActionTypes.GET_LIST_ITEM_BY_ID_REQUEST } |
    { type: ActionTypes.GET_LIST_ITEM_BY_ID_SUCCESS, payload: any } |
    { type: ActionTypes.GET_LIST_ITEM_BY_ID_ERROR, payload: string } |

    { type: ActionTypes.GET_CHOICE_FIELD_REQUEST } |
    { type: ActionTypes.GET_CHOICE_FIELD_SUCCESS, payload: Array<any> } |
    { type: ActionTypes.GET_CHOICE_FIELD_ERROR, payload: string } |

    { type: ActionTypes.GET_LOOKUP_LIST_REQUEST } |
    { type: ActionTypes.GET_LOOKUP_LIST_SUCCESS, payload: Array<any> } |
    { type: ActionTypes.GET_LOOKUP_LIST_ERROR, payload: string };
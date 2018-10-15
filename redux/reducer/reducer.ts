import {combineReducers} from 'redux'
import {i18nState} from 'redux-i18n' 

import {sharepointReducer} from '.';

const appReducer = combineReducers({
    i18nState, 
    sharepointReducer
})

export default appReducer
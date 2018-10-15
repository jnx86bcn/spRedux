
import pnp from 'sp-pnp-js/lib/pnp';

import { setErrorMessage, setSuccessMessage, setInProcess, 
         addItem_Request, addItem_Success,addItem_Error,
         getchoiceOptionsField_Request,getchoiceOptionsField_Success,getchoiceOptionsField_Error,
         getLookupList_Request,getLookupList_Success,getLookupList_Error, getListItemById_Request, getListItemById_Error, getListItemById_Success 
       } from './actions';


/**
 * Init pnp
 */
pnp.setup({
    sp: {
        headers: {
            "Accept": "application/json; odata=verbose"
        }
    }
});


/**
 * get item by Id
 * @param listName string
 * @param itemId number
 */
export function getListItemById(listName: string,Id: number) {

    return async (dispatch: any) => {

        dispatch(setInProcess(true));
        dispatch(getListItemById_Request());

        pnp.sp.web.lists.getByTitle(listName).
        items.
        getById(Id).
        get().
        then((data: any) => {

            dispatch(setInProcess(false));
            dispatch(getListItemById_Success(data));

        }).catch(error => {

            dispatch(setInProcess(false));
            dispatch(getListItemById_Error(error));

        });

    }
}


/**
 * get choiceFieldOptions
 * @param listName listName
 */
export function getChoiceOptions(listName: string,fieldInternalName: string) {

    return async (dispatch: any) => {

        let choiceOptions = new Array<string>();

        let item:{
            key: number,
            text: string
        }

        dispatch(setInProcess(true));
        dispatch(getchoiceOptionsField_Request());

        pnp.sp.web.lists.getByTitle(listName).
        fields.
        getByInternalNameOrTitle(fieldInternalName).
        get().
        then((arrayData: any) => {

            arrayData.Choices.results.forEach((item: any, index: number)=>{

                item = {key: index, text: item}
                choiceOptions.push(item);

            });

            dispatch(setInProcess(false));
            dispatch(getchoiceOptionsField_Success(choiceOptions));

        }).catch(error => {

            dispatch(setInProcess(false));
            dispatch(getchoiceOptionsField_Error(error));

        });

    }
}


/**
 * get lookuplist
 * @param listName listName
 */
export function getLookupList(listName: string) {

    return async (dispatch: any) => {

        let lookupList = new Array<string>();

        let item:{
            key: number,
            text: string
        }

        dispatch(setInProcess(true));
        dispatch(getLookupList_Request());

        pnp.sp.web.lists.getByTitle(listName).
        items.
        get().
        then((arrayData: Array<any>) => {

            arrayData.forEach((item: any)=>{

                item = {key: item.Id, text: item.Title}
                lookupList.push(item);

            });

            dispatch(setInProcess(false));
            dispatch(getLookupList_Success(lookupList));

        }).catch(error => {

            dispatch(setInProcess(false));
            dispatch(getLookupList_Error(error));

        });

    }
}


/**
 * add new Item to sharepoint list
 * @param listName listName Projects
 * @param model of chosen list
 * @param successText for item added correctly
 * @param errorText for itemm not added to list
 */
export function addItem(listName: string, model: any, successText: string, errorText: string) {

    return async (dispatch: any) => {

        dispatch(setInProcess(true));
        dispatch(addItem_Request());

        pnp.sp.web.lists.getByTitle(listName).
        items.
        add(model.toSPItem()).
        then(() => {

            dispatch(setInProcess(false));
            dispatch(setSuccessMessage(successText));
            dispatch(addItem_Success(model));

        }).catch(error => {

            dispatch(setInProcess(false));
            dispatch(setErrorMessage(errorText));
            dispatch(addItem_Error(error));

        });

    }
}
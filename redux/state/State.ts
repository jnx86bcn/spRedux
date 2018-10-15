import * as Immutable from 'immutable';

import { IStateState } from '.';

export const initialState: IStateState = {
    model: null,
    error: '',
    success: '',
    inProcess: false,
    lookupList: [],
    choiceOptions: []
    
};

//Immutable State.
export class State extends Immutable.Record(initialState) implements IStateState {

    //#region Getters
    
    public readonly model: any;
    public readonly error: string;
    public readonly success: string;
    public readonly inProcess: boolean;
    public readonly lookupList: Array<string>;
    public readonly choiceOptions: Array<string>;
    
    //#endregion

    public setError(error: string): State {
        return this.set("error", error) as State;
    }

    public setSuccess(success: string): State {
        return this.set("success", success) as State;
    }

    public setInProcess(inProcess: boolean): State {
        return this.set("inProcess", inProcess) as State;
    }

    public addItem(model: any): State {
        return this.set ("model", model) as State;
    }

    public getListItemById(model: any): State {
        return this.set ("model", model) as State;
    }

    public getLookupList(lookupList: Array<string>): State {
        return this.set("lookupList", lookupList) as State;
    }

    public getChoiceOptions(choiceOptions: Array<string>): State {
        return this.set("choiceOptions", choiceOptions) as State;
    }
    
}
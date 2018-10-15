
import {IFormField, ISPLoockupValue} from '.'

export class IFormFieldLookup extends IFormField {

    public value: ISPLoockupValue;

    constructor(internalName: string) {

        super();

        this.value = {
            Id: 0,
            Title: '',
        };
        this.internalName = internalName;
    }
}

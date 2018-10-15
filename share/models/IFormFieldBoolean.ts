import {IFormField} from '.'

export class IFormFieldBoolean extends IFormField {

    public value: boolean;

    constructor(internalName: string) {

        super();

        this.value = false;
        this.internalName = internalName;
    }
}
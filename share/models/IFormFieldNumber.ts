import {IFormField} from '.'

export class IFormFieldNumber extends IFormField {

    public value: number;

    constructor(internalName: string) {

        super();

        this.value = 0;
        this.internalName = internalName;
    }
}
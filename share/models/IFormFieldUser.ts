import {IFormField, ISPUser} from '.'

export class IFormFieldUser extends IFormField {

    public value: ISPUser;

    constructor(internalName: string) {

        super();

        this.value = {
            Id: 0,
            displayName: '',
            loginName:''
        };
        this.internalName = internalName;
    }
}

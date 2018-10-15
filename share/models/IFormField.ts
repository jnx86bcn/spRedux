export class IFormField {

    public required: boolean;
    public disabled: boolean;
    public error: string;
    public internalName: string;

    constructor() {
        this.disabled = true;
        this.error = '',
            this.internalName = '',
            this.required = false;
    }

    public haveError(): boolean {
        return this.error.length > 0;
    }

    public changeDisabledValueByConfig(fields: Array<string>) {

        this.disabled = fields.indexOf(this.internalName) == -1;
    }
}
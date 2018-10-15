import { IFormFieldDate, IFormFieldString, IFormFieldUser, ISPUser, IFormFieldLookup } from '../share/models';
import { EnumsStatusOptions } from '../share/constants/enums';

export class TicketModel {

    /** Public properties */
    public Id?: number;
    public ticket: IFormFieldString;
    public employee: IFormFieldUser;
    public infoTask: IFormFieldString;
    public responseInfoTask: IFormFieldString;
    public department: IFormFieldLookup;
    public deadline: IFormFieldDate;
    public status: string;
    public priority: IFormFieldString;

    constructor() {

        this.Id = 0;
        this.ticket = new IFormFieldString('Title');
        this.employee = new IFormFieldUser('TestingEmployee');
        this.infoTask = new IFormFieldString('TestingMessageInfoTask');
        this.responseInfoTask = new IFormFieldString('TestingResponseMessageInfoTask');
        this.department = new IFormFieldLookup('TestingDepartment');
        this.deadline = new IFormFieldDate('TestingDeadLine');
        this.status = EnumsStatusOptions.Started;
        this.priority = new IFormFieldString('TestingPriority');

        //Add fields required by default
        this.requiredFields();

        //Disable fields
        this.disabledAllFields();

    }


    /**
     * Convert Item to get by pnp
     * @param item Item to get SharePoint item
     */
    public fromSPItem(item: any): TicketModel {
  
        let model: TicketModel = new TicketModel();
        model.Id = item.Id || 0;
        model.ticket.value = item.Title || '';
        model.employee.value.Id = item.TestingEmployeeId > 0 ? item.TestingEmployeeId : { Id: 0, loginName: "",displayName:"" };
        model.infoTask.value = item.TestingMessageInfoTask || '';
        model.responseInfoTask.value = item.TestingResponseMessageInfoTask || '';
        model.department.value.Id = item.TestingDepartmentId > 0 ? item.TestingDepartmentId : { Id: 0, Title: "" };
        model.deadline.value = item.TestingDeadLine || new Date();
        model.status = item.TestingStatus;
        model.priority.value = item.TestingPriority;
        return model;
    }


    /**
     * Convert to object in Item to upload SHP by pnp
     */
    public toSPItem(): any {

        var newSPItem: any = {
            Title: this.ticket.value,
            TestingEmployeeId: this.employee.value.Id > 0 ? this.employee.value.Id : undefined,
            TestingMessageInfoTask: this.infoTask.value,
            TestingResponseMessageInfoTask: this.responseInfoTask.value,
            TestingDepartmentId: this.department.value.Id > 0 ? this.department.value.Id : undefined,
            TestingDeadLine: this.deadline.value,
            TestingStatus: this.status,
            TestingPriority: this.priority.value,

        };

        return newSPItem;
    }

    /**
     * Disable fields from form
     */
    private requiredFields() {

        this.ticket.required = true;
        this.infoTask.required = true;

    }


    /**
     * Disable fields from form
     */
    public disabledAllFields() {
        this.responseInfoTask.disabled = true
    }


    /**
     * Validation TicketModel model
     */
    /*public validationTicketModel(required: string): TicketModel {

        this.name.error = this.name.required || this.name.value.length == 0 ? required : '';
        this.owner.error = this.owner.required || this.owner.value.id == 0 ? required : '';
 
        return this;
    }*/
}
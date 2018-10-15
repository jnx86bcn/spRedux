import { TicketModel } from '../../models';

export interface ITicketFormState {
    __inProcess: boolean;
    __error: string;
    __success: string;
    __model: TicketModel;
    __departments: Array<any>;
    __priorities: Array<any>;
}
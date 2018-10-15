import { IPersonaProps  } from 'office-ui-fabric-react';

export interface IpeoplePickerProps {     
    defaultValues?: IPersonaProps[];
    multi?: boolean;
    onChange?: (people: IPersonaProps[]) => void;
    label: string;
    required?: boolean;
}
import { IPersonaProps } from 'office-ui-fabric-react';

export interface IPeopleModel extends IPersonaProps{
    userID?: string;
    loginName?: string;
}
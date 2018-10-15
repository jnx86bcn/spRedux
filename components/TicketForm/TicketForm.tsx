import React from 'react';

//Models
import { ISPUser } from '../../share/models/ISPUser';
import { TicketModel } from '../../models/TicketModel';

//Enums
import { EnumsModels, EnumsI18N, EnumFields, EnumsList, EnumsTypeTags } from '../../share/constants/enums';

//PropTypes for Context
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import { addItem,setErrorMessage,setSuccessMessage, getLookupList, getChoiceOptions, getListItemById } from '../../redux';

//Props and State for Compoent
import { ITicketFormState } from '.';

//Fabric
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

//Fabric Icons
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

//other components
import SPPeoplePicker from '../../share/components/people-picker/SPPeoplePicker';

//Styles
import '../../../UX/styles/main';

interface IConnectedDispatch {
    ISetErrors_LS: (message: string) => void;
    ISetSuccess_LS: (message: string) => void;
    IAddTicket_LS: (listName: string, model: TicketModel, successText: string, errorText: string) => void;
    IGetDepartments_LS: (listName: string) => void;
    IGetPriorities_LS: (listName: string, fieldInternalName: string) => void;
    IGetItemById_LS: (listName: string, Id: number) => void;
}

interface IConnectedState {
    error_LS: string;
    success_LS: string;
    inProcess_LS: boolean;
    departments_LS: Array<any>;
    priorities_LS: Array<any>;
    ticket_LS: TicketModel;
}

//Map the application state to the properties of the Components.
function mapStateToProps(state: any): IConnectedState {
    return {
        
        error_LS: state.sharepointReducer.error,
        success_LS: state.sharepointReducer.success,
        inProcess_LS: state.sharepointReducer.inProcess,
        departments_LS: state.sharepointReducer.lookupList,
        priorities_LS: state.sharepointReducer.choiceOptions,
        ticket_LS: state.sharepointReducer.model,
    };
}

//Map the actions to the properties of the Component.
const mapDispatchToProps = (dispatch: any): IConnectedDispatch => ({

    IGetPriorities_LS: (listName: string, fieldInternalName: string) => {
        dispatch(getChoiceOptions(listName,fieldInternalName))
    },
    IGetDepartments_LS: (listName: string) => {
        dispatch(getLookupList(listName))
    },
    IAddTicket_LS: (listName: string, model: TicketModel, successText: string, errorText: string) => {
        dispatch(addItem(listName, model, successText, errorText))
    },
    IGetItemById_LS: (listName: string, Id: number) => {
        dispatch(getListItemById(listName, Id))
    },
    ISetErrors_LS: (message: string) => {
        dispatch(setErrorMessage(message));
    },
    ISetSuccess_LS: (message: string) => {
        dispatch(setSuccessMessage(message));
    }

});

class TicketForm extends React.Component<IConnectedState & IConnectedDispatch, ITicketFormState> {

    /**
     * Add i18n
     */
    static contextTypes = {
        t: PropTypes.func.isRequired
    }


    /**
     * Constructor
     */
    constructor(props) {
        
        super(props);

        this.state = {
            __error: '',
            __success: '',
            __inProcess: false,
            __model: new TicketModel(),
            __departments: [],
            __priorities: []
        }

        this.updateUser = this.updateUser.bind(this);

        initializeIcons();

    }


    /**
     * load info before render component
     */
    componentDidMount() {
        this.props.IGetDepartments_LS(EnumsList.List_Departments);
        this.props.IGetPriorities_LS(EnumsList.List_Ticketing,EnumFields.Field__InternalName_Priorities);
        let idItem = this.getIdItem();
        if(idItem != 0)
        {
            this.props.IGetItemById_LS(EnumsList.List_Ticketing,idItem);
        }
        else
        {
            console.log('is new')
        }
    }


    /**
     * @param nextProps 
     */
    componentWillReceiveProps(nextprops: IConnectedState & IConnectedDispatch) {

        nextprops.inProcess_LS != this.props.inProcess_LS ?
            this.setState({ __inProcess: nextprops.inProcess_LS }) : null;

        nextprops.error_LS.length != this.props.error_LS.length ?
            this.setState({ __error: nextprops.error_LS }) : null;

        nextprops.success_LS.length != this.props.success_LS.length ?
            this.setState({ __success: nextprops.success_LS, __model: new TicketModel() }) : null;

        nextprops.departments_LS.length > 0 ? 
            this.setState({__departments: nextprops.departments_LS}) : null;

        nextprops.priorities_LS.length > 0 ? 
            this.setState({__priorities: nextprops.priorities_LS}) : null;

        nextprops.ticket_LS != this.props.ticket_LS ? 
            this.setState({__model: new TicketModel().fromSPItem(nextprops.ticket_LS)}) : null;

    }


    /**
     * get id item from url if is new return 0
     */
    private getIdItem(): number {

        let id_check = /[?&]ID=([^&]+)/i;
        let match = id_check.exec(document.URL);

        return parseInt(match != null ? match[1] : "0");
    }


    /**
     * @param e 
     * @param name 
     */
    private changeValueText(e: any, name: string, typeField: string): void {

        let modelAux = this.state.__model;
        //change Text Field in model
        switch (typeField) {
            case EnumsTypeTags.TAG_FIELD_TEXT:
                    modelAux[name].value = e;
                    this.setState({ __model: modelAux });
                    break;
            case EnumsTypeTags.TAG_FIELD_LOOKUP:
                    let itemSelected= {Id: e.key,Title: e.text}
                    modelAux[name].value = itemSelected
                    this.setState({ __model: modelAux });
                    break;
            case EnumsTypeTags.TAG_FIELD_CHOICE:
                    modelAux[name].value = e.text;
                    this.setState({ __model: modelAux });
                    break;
        }
        
    }


    /**
     * @param name 
     */
    private updateUser(e: any) {

        let modelAux = this.state.__model;

        let user: ISPUser = {
            Id: 0, 
            loginName: '',
            displayName: '',
        }

        if (e.length > 0) {
            
            user = {
                Id: e[0].userID,
                loginName: e[0].loginName,
                displayName: e[0].primaryText,
            }

        }

        modelAux[EnumsModels.Employee].value.Id = user.Id;
        this.setState({ __model: modelAux });
    }


    /**
     *  buttonClicked
     */
    private buttonClicked(type: string) {
        if(type != EnumsI18N.BTN_EXIT_TEXT){
            this.props.ISetErrors_LS('');
            this.props.ISetSuccess_LS('');
            this.props.IAddTicket_LS(EnumsList.List_Ticketing,
                                     this.state.__model,
                                     this.context.t(EnumsI18N.MESSAGE_ITEM_SAVED_OK), 
                                     this.context.t(EnumsI18N.MESSAGE_ITEM_SAVED_ERROR)
                                    );
        }
        else{
            console.log('exit button')
        }
    }


    render() {
        
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <TextField  value={this.state.__model.ticket.value}
                                    required={this.state.__model.ticket.required}
                                    disabled={this.state.__inProcess}
                                    errorMessage={this.state.__model.ticket.error}
                                    label={this.context.t(EnumsI18N.TEXTFIELD_TITLE)}
                                    onChanged={(e) => this.changeValueText(e, EnumsModels.Ticket, EnumsTypeTags.TAG_FIELD_TEXT)} />
                    </div>
                </div>
                <br/>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <SPPeoplePicker  value={this.state.__model.employee.value}
                                         required={this.state.__model.employee.required}
                                         disabled={this.state.__inProcess}
                                         errorMessage={this.state.__model.employee.error}
                                         multi={false}
                                         label={this.context.t(EnumsI18N.TEXTFIELD_EMPLOYEE)}
                                         onChange={(e) => this.updateUser(e)} />
                    </div>
                </div>
                <br/>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <TextField  value={this.state.__model.infoTask.value}
                                    required={this.state.__model.infoTask.required}
                                    disabled={this.state.__inProcess}
                                    errorMessage={this.state.__model.infoTask.error}
                                    label={this.context.t(EnumsI18N.TEXTFIELD_MESSAGE_TICKET)}
                                    multiline rows={6}
                                    onChanged={(e) => this.changeValueText(e, EnumsModels.infoTask, EnumsTypeTags.TAG_FIELD_TEXT)} 
                        />
                    </div>
                </div>
                <br/>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <TextField  value={this.state.__model.responseInfoTask.value}
                                    required={this.state.__model.responseInfoTask.required}
                                    disabled={this.state.__inProcess || this.state.__model.responseInfoTask.disabled}
                                    errorMessage={this.state.__model.responseInfoTask.error}
                                    label={this.context.t(EnumsI18N.TEXTFIELD_MESSAGE_TICKET_RESPONSE)}
                                    multiline rows={6}
                                    onChanged={(e) => this.changeValueText(e, EnumsModels.responseInfoTask, EnumsTypeTags.TAG_FIELD_TEXT)} 
                        />
                    </div>
                </div>
                <br/>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Dropdown  label={this.context.t(EnumsI18N.TEXTFIELD_DEPARTMENT)}
                                   placeHolder={this.context.t(EnumsI18N.PLACEHOLDER_TEXT_DEPARTMENT)}
                                   onChanged={(e) => this.changeValueText(e, EnumsModels.department, EnumsTypeTags.TAG_FIELD_LOOKUP)}
                                   required={this.state.__model.department.required}
                                   disabled={this.state.__inProcess}
                                   options={this.state.__departments}
                        />
                    </div>
                </div>
                <br/>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Dropdown  label={this.context.t(EnumsI18N.TEXTFIELD_PRIORITY)}
                                   placeHolder={this.context.t(EnumsI18N.PLACEHOLDER_TEXT_PRIORITY)}
                                   onChanged={(e) => this.changeValueText(e, EnumsModels.priority, EnumsTypeTags.TAG_FIELD_CHOICE)}
                                   required={this.state.__model.priority.required}
                                   disabled={this.state.__inProcess}
                                   options={this.state.__priorities}
                        />
                    </div>
                </div>
                {/* <br/>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <TextField  type = {"Date"}
                                    value={this.state.__model.deadline.value.toString()}
                                    required={this.state.__model.deadline.required}
                                    disabled={this.state.__inProcess}
                                    errorMessage={this.state.__model.deadline.error}
                                    label={this.context.t(EnumsI18N.TEXTFIELD_DEADLINE)}
                                    onChanged={(e) => this.changeValueText(e, EnumsModels.deadline)} 
                        />
                    </div>
                </div> */}
                <br/>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <PrimaryButton  disabled={this.state.__inProcess} 
                                        onClick={() => this.buttonClicked(EnumsI18N.BTN_SAVE_TEXT)} style={{ marginRight: '8px' }}>{this.context.t(EnumsI18N.BTN_SAVE_TEXT)}
                        </PrimaryButton>
                        
                        <DefaultButton  disabled={this.state.__inProcess} 
                                        onClick={() => this.buttonClicked(EnumsI18N.BTN_EXIT_TEXT)}>{this.context.t(EnumsI18N.BTN_EXIT_TEXT)}
                        </DefaultButton>
                    </div>
                </div>
                <br />
                {this.state.__success.length > 0 ?
                    <MessageBar  messageBarType={MessageBarType.success} 
                                 isMultiline={false}>{this.state.__success}
                    </MessageBar>
                :   
                    null
                }
                {this.state.__error.length > 0 ?
                    <MessageBar messageBarType={MessageBarType.error} 
                                isMultiline={false}>{this.state.__error}
                    </MessageBar>
                : 
                    null
                }
            </div>
        )
    }
}

//Export component
export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);
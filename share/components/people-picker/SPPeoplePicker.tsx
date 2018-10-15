import * as React from 'react';
import { connect } from 'react-redux';

import { IpeoplePickerProps } from '.';

import { CompactPeoplePicker, IPersonaProps, IBasePickerSuggestionsProps  } from 'office-ui-fabric-react';
import { IPeopleModel } from '../../models';
import { Label } from 'office-ui-fabric-react/lib/Label';
//import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

interface IConnectedState {
    lang: any;
    translations: any;
}

//Map the application state to the properties of the Components.
function mapStateToProps(state: any, ownProps: IpeoplePickerProps): IConnectedState {
    return {
        lang: state.i18nState.lang,
        translations: state.i18nState.translations
    };
}

export class SPPeoplePicker extends React.Component<IpeoplePickerProps & IConnectedState, any> {
   
    /* static propTypes = {      
        label: PropTypes.string.isRequired
    }; */

    public static defaultProps: Partial<IpeoplePickerProps> = {
        required: false,
        label: "PeoplePicker",       
        multi: true       
    };    

    constructor(props) {
        super(props);       
        this._onFilterChanged = this._onFilterChanged.bind(this); 
        this._onStateChange = this._onStateChange.bind(this);
        this.state = {};  
        //initializeIcons();     
    }

    public componentDidMount(): void {

        this.setState({
            pickerEnabled: (!(this.props.defaultValues != null && this.props.defaultValues.length > 0)) || this.props.multi            
        });
    }

    public render(): React.ReactElement<null> {
        const suggestionProps: IBasePickerSuggestionsProps = {
            noResultsFoundText: 'No results found',
            loadingText: 'Loading'
        };

        const pickerDisplayProps: React.HTMLProps<HTMLInputElement> = {
            disabled: !this.state.pickerEnabled
        };
        return (
            <div>
                {
                this.props.label != '' ? 
                    <Label required={this.props.required}>{this.props.label}</Label> :
                    null
                }
                <CompactPeoplePicker onResolveSuggestions={this._onFilterChanged} 
                            onChange={this._onStateChange} 
                            className={'ms-PeoplePicker'} 
                            pickerSuggestionsProps={suggestionProps} 
                            inputProps={pickerDisplayProps} 
                            defaultSelectedItems={this.props.defaultValues} />              
            </div>
        );
    }

    private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
        if (filterText) {
            return this._getResultsAsPromise(filterText);
        } else {
            return [];
        }
    }

    private _onStateChange(currentPersonas: IPersonaProps[]) {
        this.setState({ pickerEnabled: currentPersonas.length === 0 || this.props.multi });
        if (this.props.onChange) {
            this.props.onChange(currentPersonas);
        }
    }

    private _getResultsAsPromise(filterText: string): Promise<IPersonaProps[]> {
        return new Promise<IPersonaProps[]>((resolve, reject) => {
            let url = _spPageContextInfo.siteServerRelativeUrl + '/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser';

            //var query = { 'queryParams': { 'QueryString': filterText, 'MaximumEntitySuggestions': 50, 'AllowEmailAddresses': false, 'AllowOnlyEmailAddresses': false, 'PrincipalType': 1, 'PrincipalSource': 1, 'SharePointGroupID': 0 } };
            let digest : any = document.getElementById("__REQUESTDIGEST");
            let query = {
                'queryParams': {
                    '__metadata': {
                        'type':'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
                    },
                    'QueryString': filterText,
                    'AllowEmailAddresses':true,
                    'AllowMultipleEntities':false,
                    'AllUrlZones':false,
                    'MaximumEntitySuggestions':50,
                    'PrincipalSource': 1,
                    'PrincipalType': 1,
                }
            };

            if (window.location.host.indexOf('localhost') !== -1) {
                return resolve([{ primaryText: 'Awesome pants', text: 'account@account' }]);
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    //'Accept': 'application/json;odata=minimalmetadata',
                    //'Content-Type': 'application/json;odata=minimalmetadata',
                    'accept':'application/json;odata=verbose',
                    'content-type':'application/json;odata=verbose',
                    'Cache': 'no-cache',
                    //'X-RequestDigest': _spPageContextInfo.formDigestValue
                    'X-RequestDigest': digest.value
                },
                credentials: 'include',
                body: JSON.stringify(query)
            }).then((res) => {
                return res.json();
            }).then((suggestions: any) => {
                let people: any[] = JSON.parse(suggestions.d.ClientPeoplePickerSearchUser);
                let personas: IPersonaProps[] = [];

                for (var i = 0; i < people.length; i++) {
                    var p = people[i];
                    let account = p.Key.substr(p.Key.lastIndexOf('|') + 1);

                    let s: IPeopleModel = {
                        primaryText: p.DisplayText,
                        text: p.DisplayText,
                        imageUrl: `/_layouts/15/userphoto.aspx?size=S&accountname=${account}`,
                        imageShouldFadeIn: true,
                        userID: p.EntityData.SPUserID,
                        loginName: account              
                    }
                    personas.push(s);
                }
                return resolve(personas);
            }).catch(() => {
                return reject([]);
            });
        });
    }
}

export default connect(mapStateToProps)(SPPeoplePicker);
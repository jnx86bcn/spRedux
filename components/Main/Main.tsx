import React from 'react';

//Redux
import { connect,Provider } from 'react-redux';
import configureStore from '../../redux/store/store';

//i18n
import I18n from 'redux-i18n'
import { translations } from '../../share/translations/translations'
import { setTranslations } from 'redux-i18n'

//Other components
import TicketForm from '../TicketForm/TicketForm';

//Props and State for Compoent
import { IMainProps,IMainState } from '.';

//Styles
import '../../../UX/styles/main';

const store = configureStore();

export class Main extends React.Component<IMainProps, IMainState> {

    
    constructor(props) {
        
        super(props);

    }


    componentDidMount() {

        store.dispatch(setTranslations(translations));

    }


    render() {

        return (
            <Provider store={store} >
                <I18n translations={translations} useReducer={true}>
                    <TicketForm/>
                </I18n>
            </Provider>
        )
    }
}
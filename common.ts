import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as components from './components';

export function renderComponent(componentName: string, elementId: any, props?: any, callback?: () => void) {
    let component: React.ComponentElement<any, any> = React.createElement(components[componentName], props);
    let element = document.getElementById(elementId);

    if (element) {
        ReactDOM.render(component, element, callback);
    } else {
        console.log('%cElement with id "%s" not found.', 'color: red;', elementId);
    }
}

window['renderComponent'] = renderComponent;
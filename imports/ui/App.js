import React from 'react';
import { renderRoutes } from './../Router';

//COMPONENTS
import MyCities from '././MyCities';

export default class App extends React.Component {

    constructor(){
        super();
    }

    render() {

        return (
            <div>
                <MyCities />
            </div>
        );
    }
}
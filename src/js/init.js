'use strict';
import React from 'react';
import * as immutable from 'immutable';

export class Hello extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

React.render(<Hello name='World' />,
    document.getElementById('root')
);

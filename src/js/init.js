'use strict';
import React from 'react';

export class MyComponent extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

React.render(<MyComponent name='World' />,
    document.getElementById('root')
);

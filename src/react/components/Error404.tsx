import React, { Component, ReactNode } from 'react';
import ContextInterface from '../ContextInterface';

class Error404 extends Component<ContextInterface> {
    public constructor(props: any) {
        super(props);
        if (this.props.staticContext) {
            this.props.staticContext.status = 404;
        }
    }
    public render(): ReactNode {
        return <h1>404</h1>;
    }
}

export default Error404;

import React, { Component, ReactNode } from 'react';
import { Redirect as ReactRedirect } from 'react-router-dom';
import ContextInterface from '../ContextInterface';

interface RedirectInterface extends ContextInterface{
    status?: number;
    to: string | object;
}

export default class Redirect extends Component<RedirectInterface, ContextInterface> {
    public constructor(props: any) {
        super(props);
        if (props.staticContext) {
            props.staticContext.status = this.props.status || 302;
        }
    }
    public render(): ReactNode {
        return <ReactRedirect to={this.props.to} />;
    }
}

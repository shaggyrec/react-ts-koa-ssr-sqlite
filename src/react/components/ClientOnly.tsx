import { Component, ReactNode } from 'react';

export default class ClientOnly extends Component {
    public render(): ReactNode {
        if ( window !== undefined ) {
            return this.props.children;
        }
        return null;
    }
}

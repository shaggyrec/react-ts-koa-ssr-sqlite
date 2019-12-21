import React, { Component, ReactElement } from 'react';
import UserSchema from '../../dataTypes/UserSchema';
import { Dispatch } from 'redux';

interface MeInterface extends UserSchema {
    logout: () => Dispatch;
}

class Me extends Component<MeInterface> {
    public render(): ReactElement {
        return (
            <div>
                <h1>profile <b>{ this.props.username }</b></h1>
                <ul>
                    <li>email: <b>{ this.props.email }</b></li>
                </ul>
                <button onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

export default Me;

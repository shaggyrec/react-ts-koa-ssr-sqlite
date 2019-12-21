import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import UserSchema from '../../dataTypes/UserSchema';
import Me from '../components/Me';
import Redirect from '../components/Redirect';
import ContextInterface from '../ContextInterface';
import { AppStore } from '../ducks';
import { Dispatch } from 'redux';
import { logout } from '../ducks/user';

interface UserInterface  extends ContextInterface  {
    user: UserSchema;
    logout: () => Dispatch;
}

class User extends Component<UserInterface> {
    public render(): ReactNode {
        return this.props.user ?
            <Me {...this.props.user} logout={this.props.logout} /> :
            <Redirect staticContext={this.props.staticContext} to="/login" />;
    }
}

export default connect(
    (state: AppStore): object => ({
        user: state.user.current
    }),
    (dispatch: Dispatch): object => ({
        logout: (): Dispatch => dispatch(logout())
    })
)(User);

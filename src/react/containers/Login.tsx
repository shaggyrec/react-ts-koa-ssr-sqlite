import { css } from 'glamor';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Loader from '../components/Loader';
import LoginForm from '../components/LoginForm';
import { AppStore } from '../ducks';
import * as userActions from '../ducks/user';
import { Redirect } from 'react-router-dom';
import UserSchema from '../../dataTypes/UserSchema';

interface LoginInterface {
    login: (email: string, password: string) => Dispatch;
    loading: boolean;
    error: string;
    user: UserSchema;
    from: string;
}

class Login extends Component<LoginInterface> {
    private styles: { container: string, error: string } = {
        container: css({
            maxWidth: '500px',
            margin: '0 auto',
            background: 'rgba(255,255,255, .05)',
            padding: '1rem'
        }) + '',
        error: css({
            color: '#b71c1c',
            fontWeight: 900
        }) + ''
    };

    public render(): React.ReactElement {
        if (this.props.user) {
            return <Redirect to={this.props.from}/>;
        }
        return(
            <div className={this.styles.container}>
                {this.props.loading && <Loader loading={true} overlay/>}
                {this.props.error && <h3 className={this.styles.error}>{ this.props.error }</h3>}
                <LoginForm
                    login={this.props.login}
                />
            </div>
        );
    }
}

export default connect(
    (state: AppStore, props: { location: any }) => ({
        user: state.user.current,
        loading: state.user.loading,
        error: state.user.error,
        from: (props.location.state && props.location.state.from) || '/me'
    }),
    (dispatch: Dispatch) => ({
        login: (email: string, password: string): Dispatch => dispatch(userActions.login(email, password))
    })
)(Login);

import React, { Component } from 'react';
import { Dispatch } from 'redux';

interface LoginFormInterface {
    login: (email: string, password: string) => Dispatch
}

class LoginForm extends Component<LoginFormInterface> {

    public state: { email: string; password: string } = {
        email: '',
        password: ''
    };

    private handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    };

    private handleInputChange = ({ target: { name, value } }: any): void => {
        this.setState({ [name]: value });
    };

    public render(): any {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="formField my-1">
                    <input
                        className="formField__input"
                        type="email"
                        name="email"
                        required
                        onChange={this.handleInputChange}
                    />
                    <label className="formField__label">Login</label>
                </div>
                <div className="formField my-1">
                    <input
                        className="formField__input"
                        type="password"
                        name="password"
                        required
                        onChange={this.handleInputChange}
                    />
                    <label className="formField__label">Password</label>
                </div>
                <div className="my-1">
                    <button type="submit">Enter</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;

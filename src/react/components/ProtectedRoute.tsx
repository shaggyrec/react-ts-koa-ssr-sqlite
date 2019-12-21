import React, { Component, ReactElement } from 'react';
import { Route } from 'react-router-dom';
import Redirect from './Redirect';

interface ProtectedRouteInterface {
    component: React.ComponentClass;
    isAuthorized: boolean;
    path: string;
    exact: boolean;
}

class ProtectedRoute extends Component<ProtectedRouteInterface> {
    public render(): React.ReactElement {
        const ProtectedComponent = this.props.component;
        return (
            <Route
                path={this.props.path}
                exact={this.props.exact}
                render={(props: any): ReactElement => (
                    this.props.isAuthorized
                        ? <ProtectedComponent {...props} />
                        : <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location.pathname }
                        }}/>
                )}
            />
        );
    }
}

export default ProtectedRoute;

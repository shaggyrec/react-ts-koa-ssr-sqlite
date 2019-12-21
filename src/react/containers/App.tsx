import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import UserSchema from '../../dataTypes/UserSchema';
import Error404 from '../components/Error404';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from './Home';
import { AppStore } from '../ducks';
import '../globalStyles';
import Login from './Login';
import Page from './Page';
import User from './User';
import PageEdit from './PageEdit';
import PageAdd from './PageAdd';
import ProtectedRoute from '../components/ProtectedRoute';
import SnackBar from '../components/SnackBar';
import AppMessageInterface from '../dataTypes/AppMessage';
import { deleteMessage } from '../ducks/application';
import { Dispatch } from 'redux';
import Blog from './Blog';

interface AppInterface {
    meta?: {
        title: string;
        description: string;
        keywords: string;
    };
    user: UserSchema;
    messages: AppMessageInterface[];
    deleteMessage: (i: number) => Dispatch;
}

class App extends Component<AppInterface> {

    private handleMessageClick = (index: number): void => {
        this.props.deleteMessage(index);
    };

    public render(): any {
        const { meta: { title, description, keywords }, user }: any = this.props;
        return(
            <Fragment>
                <Helmet>
                    <title>{title}</title>
                    { description && <meta name="description" content={description} /> }
                    { keywords && <meta name={'keywords'} content={keywords} /> }
                </Helmet>
                <Header user={ user }/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/me" exact component={User}/>
                        <Route path="/blog/:pageNumber?" exact component={Blog} />
                        <ProtectedRoute path="/page/add" exact component={PageAdd} isAuthorized={!!user}/>
                        <Route path="/page/:id" exact component={PageEdit}/>
                        <Route path="/:alias" exact component={Page}/>
                        <Route component={Error404}/>
                    </Switch>
                </div>
                <Footer text="shogenov.com"/>
                <SnackBar
                    messages={this.props.messages}
                    onMessageClick={this.handleMessageClick}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state: AppStore) => ({
        meta: state.application.meta,
        user: state.user.current,
        messages: state.application.messages
    }),
    (dispatch: Dispatch): object => ({
        deleteMessage: (i: number): Dispatch => dispatch(deleteMessage(i))
    })
)(App);

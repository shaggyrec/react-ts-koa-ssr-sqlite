import React, { Component, Fragment } from 'react';
import PostEditor from '../components/PostEditor';
import EditBar from '../components/EditBar';
import { AppStore } from '../ducks';
import { Dispatch } from 'redux';
import * as pageActions from '../ducks/pages';
import PageSchema from '../../dataTypes/PageSchema';
import { connect } from 'react-redux';
import ContextInterface from '../ContextInterface';
import UserSchema from '../../dataTypes/UserSchema';
import Error404 from '../components/Error404';
import Loader from '../components/Loader';

interface PageEditInterface extends ContextInterface {
    page?: PageSchema;
    loading: boolean;
    fetch: (id: number) => {};
    reset: () => {};
    match: any;
    user: UserSchema;
    update: (id: number, data: object) => {}
}

class PageEdit extends Component<PageEditInterface> {

    public state: any = {
        page: null
    };

    public componentDidMount(): void {
        if (!this.props.page || this.props.page.id !== this.props.match.params.id) {
            this.props.fetch(this.props.match.params.id);
        }
    }

    public componentDidUpdate(): void {
        if (this.props.page && !this.state.page) {
            this.setCurrentPage(this.props.page);
        }
        if (!this.props.page) {
            this.props.fetch(this.props.match.params.id);
        }
    }

    private setCurrentPage(page: PageSchema): void {
        this.setState({
            page: {
                title: page.title,
                alias: page.alias,
                active: page.active,
                header: page.header,
                content: page.content,
                description: page.description,
                tags: page.tags,
                excludeFromBlog: page.excludeFromBlog
            }
        });
    }

    private handleClickSave = (): void => {
        this.props.update(this.props.page.id, this.state.page);
    };

    private handlePostChange = (name: string, value: string): void => {
        this.setState({ page: { ...this.state.page, [name]: value } });
    };

    public render(): React.ReactElement {
        if (this.props.loading) {
            return <Loader loading={this.props.loading}/>;
        }
        if (!this.props.user || !this.props.page) {
            return <Error404 staticContext={this.props.staticContext}/>;
        }

        if (this.state.page) {
            return (
                <Fragment>
                    <PostEditor onChange={this.handlePostChange} {...this.state.page}/>
                    <EditBar show>
                        <button onClick={this.handleClickSave}>save</button>
                    </EditBar>
                </Fragment>
            );
        }

        return null;
    }
}

export default connect(
    (state: AppStore): object => ({
        page: state.pages.current,
        loading: state.pages.loading,
        user: state.user.current,
    }),
    (dispatch: Dispatch): object => ({
        reset: (): Dispatch => dispatch(pageActions.reset()),
        fetch: (id: number): Dispatch => dispatch(pageActions.fetchById(id)),
        update: (id: number, data: PageSchema): Dispatch => dispatch(pageActions.update(id, data)),
    })
)(PageEdit);

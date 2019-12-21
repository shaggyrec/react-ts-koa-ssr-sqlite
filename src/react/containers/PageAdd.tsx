import React, { Component, Fragment } from 'react';
import PostEditor from '../components/PostEditor';
import EditBar from '../components/EditBar';
import { AppStore } from '../ducks';
import { Dispatch } from 'redux';
import * as pageActions from '../ducks/pages';
import PageSchema from '../../dataTypes/PageSchema';
import { connect } from 'react-redux';

interface PageAddInterface {
    loading: boolean;
    error?: string;
    save: (page: PageSchema) => any;
}

class PageAdd extends Component<PageAddInterface> {
    public state: any = {
        page: {
            title: '',
            alias: '',
            active: false,
            header: '',
            content: '',
            description: '',
            tags: ''
        }
    };

    private handleClickSave = (): void => {
        this.props.save(this.state.page);
    };

    private handlePostChange = (name: string, value: string): void => {
        this.setState({ page: { ...this.state.page, [name]: value } });
    };

    public render(): React.ReactNode {
        return (
            <Fragment>
                <PostEditor onChange={this.handlePostChange} {...this.state.page}/>
                <EditBar show>
                    <button onClick={this.handleClickSave}>save</button>
                </EditBar>
            </Fragment>
        );
    }
}

export default connect(
    (state: AppStore): object => ({
        loading: state.pages.loading,
        error: state.pages.error
    }),
    (dispatch: Dispatch): object => ({
        save: (data: PageSchema): Dispatch => dispatch(pageActions.create(data)),
    })
)(PageAdd);

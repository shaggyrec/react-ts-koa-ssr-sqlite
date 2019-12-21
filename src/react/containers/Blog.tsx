import React, { Component, ReactNode } from 'react';
import PageList from './PageList';
import Paginator from '../components/Paginator';
import { connect } from 'react-redux';
import { AppStore } from '../ducks';
import PageSchema from '../../dataTypes/PageSchema';
import Loader from '../components/Loader';
import Error404 from '../components/Error404';
import * as pageActions from '../ducks/pages';
import { Dispatch } from 'redux';

interface BlogInterface {
    posts: PageSchema[];
    loading: boolean;
    pageNumber: number;
    fetch: (pageNumber: number) => Dispatch
}

class Blog extends Component<BlogInterface> {
    private pageNumber: number;

    public componentDidMount(): void {
        this.props.fetch(this.props.pageNumber);
    }

    public componentDidUpdate(prevProps: Readonly<BlogInterface>): void {
        if (prevProps.pageNumber !== this.props.pageNumber) {
            this.props.fetch(this.props.pageNumber);
        }
    }

    public render(): ReactNode {
        if (this.props.loading) {
            return <Loader loading />;
        }
        if (this.props.posts.length === 0) {
            return <Error404 />;
        }
        return (
            <div>
                <h1>Blog</h1>
                <PageList pageNumber={this.props.pageNumber}/>
                <Paginator
                    pageNumber={this.props.pageNumber}
                    prefix="/blog"
                />
            </div>
        );
    }
}

export default connect(
    (state: AppStore, props: any): object => ({
        posts: state.pages.list,
        loading: state.pages.loading,
        pageNumber: props.match.params.pageNumber || 1,
    }),
    (dispatch: Dispatch): object => ({
        fetch: (pageNumber: number): Dispatch => dispatch(pageActions.fetchList(pageNumber))
    })
)(Blog);

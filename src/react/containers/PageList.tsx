import { css } from 'glamor';
import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import stripTags from 'striptags';
import PageSchema from '../../dataTypes/PageSchema';
import Loader from '../components/Loader';
import Post from '../components/Post';
import { AppStore } from '../ducks';
import * as pageActions from '../ducks/pages';
import { truncateString } from '../functions';

interface PageListInterface {
    list: PageSchema[];
    fetch: (pageNumber: number) => void;
    loading: boolean;
    pageNumber: number;
}

class PageList extends Component<PageListInterface> {
    private styles: any = {
        post: css({
            marginBottom: '1rem'
        }) + ''
    };

    public componentDidMount(): void {
        if (this.props.list.length === 0) {
            this.props.fetch(this.props.pageNumber);
        }
    }

    public render(): ReactNode {
        if (this.props.loading) {
            return <Loader loading />;
        }
        return (
            <div>
                {this.props.list.map((page: PageSchema): ReactNode => (
                    <div key={`postListItem${page.id}`} className={this.styles.post}>
                        <Link to={'/' + page.alias}>
                            <Post
                                {...page}
                                content={truncateString(stripTags(page.content), 30)}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state: AppStore, props: any): object => ({
        list: state.pages.list,
        loading: state.pages.loading,
        pageNumber: props.pageNumber || 1
    }),
    (dispatch: Dispatch): object => ({
        fetch: (pageNumber: number): Dispatch => dispatch(pageActions.fetchList(pageNumber))
    })
)(PageList);

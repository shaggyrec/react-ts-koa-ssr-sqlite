import React, { Component, Fragment, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PageSchema from '../../dataTypes/PageSchema';
import UserSchema from '../../dataTypes/UserSchema';
import Error404 from '../components/Error404';
import Loader from '../components/Loader';
import Post from '../components/Post';
import ContextInterface from '../ContextInterface';
import { AppStore } from '../ducks';
import * as pageActions from '../ducks/pages';
import EditBar from '../components/EditBar';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

interface PageInterface extends ContextInterface {
    page?: PageSchema;
    loading: boolean;
    fetch: (alias: string) => {};
    next: (id: number) => {};
    reset: () => {};
    match: any;
    user: UserSchema;
    alias: string;
    noNext: boolean;
}

class Page extends Component<PageInterface> {

    public state: any = {
        editMode: false,
        page: null,
        requestingNext: false,
        currentId: null
    };

    public componentDidMount(): void {
        if (!this.props.page || this.props.page.alias !== this.props.alias) {
            this.props.fetch(this.props.alias);
        }
        if (!this.props.noNext) {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    public componentDidUpdate(prevProps: Readonly<PageInterface>): void {
        if (this.props.page && this.props.page.next && prevProps.page.next !== this.props.page.next) {
            this.setState({
                currentId: this.props.page.next.slice(-1)[0].id,
                requestingNext: false
            });
        }
    }

    public componentWillUnmount(): void {
        if (!this.props.noNext) {
            window.removeEventListener('scroll', this.handleScroll);
        }
        this.props.reset();
    }

    private handleScroll = (): void =>  {
        if (this.state.requestingNext || !this.props.page) {
            return;
        }
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        const paddingFromBottom = 100;
        if (windowBottom >= docHeight - paddingFromBottom) {
            this.setState({ requestingNext: true });
            this.props.next(this.state.currentId || this.props.page.id);
        }
    };

    public render(): ReactNode {
        const { page, loading }: PageInterface = this.props;
        if (loading) {
            return <Loader loading={loading}/>;
        }
        if (!page) {
            return <Error404 staticContext={this.props.staticContext}/>;
        }
        return (
            <Fragment>
                {!this.props.page.excludeFromBlog &&
                    <Breadcrumbs crumbs={[{ title: 'Back to blog', url: '/blog' }]}/>
                }
                <Post {...page} />
                {page.next && page.next.map((post: PageSchema, i: number): ReactNode => (
                    <div key={`nextPage${i}`}>
                        <hr style={{margin: '3rem 0'}}/>
                        <Post {...post} />
                    </div>
                ))}
                <EditBar show={!!this.props.user}>
                    <Link to={`/page/${this.props.page.id}`}><button>edit</button></Link>
                </EditBar>
            </Fragment>
        );
    }
}

export default connect(
    (state: AppStore, props: any): object => ({
        page: state.pages.current,
        loading: state.pages.loading,
        user: state.user.current,
        alias: props.match ? props.match.params.alias : props.alias
    }),
    (dispatch: Dispatch): object => ({
        reset: (): Dispatch => dispatch(pageActions.reset()),
        fetch: (alias: string): Dispatch => dispatch(pageActions.fetch(alias)),
        next: (id: number): Dispatch => dispatch(pageActions.fetchNextPage(id))
    })
)(Page);

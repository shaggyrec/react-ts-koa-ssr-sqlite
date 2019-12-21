import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Page from './Page';
import PageList from './PageList';
import ResumeLink from '../components/ResumeLink';

class Home extends Component {
    public render(): ReactNode {
        return(
            <div>
                <Page alias="_" noNext/>
                <ResumeLink />
                <hr />
                <h2>Last articles in Russian</h2>
                <PageList />
                <Link className="button" to="/blog">All articles</Link>
            </div>
        );
    }
}

export default Home;

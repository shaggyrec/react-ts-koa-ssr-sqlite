import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

interface Crumb {
    url: string;
    title: string;
}

interface BreadcrumbsInterface {
    crumbs: Crumb[];
}

class Breadcrumbs extends Component<BreadcrumbsInterface> {

    private styles: any = {
        crumbs: css({
            background: '#676767',
            display: 'flex'
        }) + '',
        crumb: css({
            position: 'relative',
            padding: '.5rem 1rem',
            textDecoration: 'none',
            color: '#fff',
            ':after': {
                content: ' ',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: '#fff'
            }
        }) + ''
    };

    public renderCrumbs(crumbs: Crumb[]): ReactNode[] {
        return crumbs.map((crumb: Crumb, index: number): Link => (
            <Link
                key={`breadcrumb${index}`}
                to={crumb.url}
                className={this.styles.crumb}
            >
                {crumb.title}
            </Link>
        ));
    }

    public render(): ReactNode {
        const { crumbs }: BreadcrumbsInterface = this.props;
        if (crumbs.length > 0) {
            return (
                <div className={this.styles.crumbs}>
                    {this.renderCrumbs(crumbs)}
                </div>
            );
        }

        return null;
    }
}

export default Breadcrumbs;

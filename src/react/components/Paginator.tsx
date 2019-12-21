import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import { center } from 'glamor/utils';

interface PaginatorInterface {
    pageNumber: number;
    prefix: string;
}

class Paginator extends Component<PaginatorInterface> {

    private styles: any = {
        paginator: css({
            display: 'flex',
            justifyContent: 'center'
        }) + '',
        button: css({
            textDecoration: 'none',
            color: '#fff',
            fontSize: '3rem',
            margin: '0 1rem'
        }) + ''
    };

    private readonly next: number;
    private readonly prev: number;
    public constructor(props: any) {
        super(props);
        this.next = parseInt(props.pageNumber) + 1;
        this.prev = props.pageNumber > 1 ? props.pageNumber - 1 : null;
    }
    public render(): ReactNode {
        return (
            <div className={this.styles.paginator}>
                { this.prev && <Link className={this.styles.button} to={`${this.props.prefix}/${this.prev}`}>{'<'}</Link> }
                { this.next && <Link className={this.styles.button} to={`${this.props.prefix}/${this.next}`}>{'>'}</Link> }
            </div>
        );
    }
}
export default Paginator;

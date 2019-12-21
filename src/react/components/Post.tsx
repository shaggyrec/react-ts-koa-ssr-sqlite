import { css } from 'glamor';
import React, { Component } from 'react';
import PageSchema from '../../dataTypes/PageSchema';

class Post extends Component<PageSchema> {

    private readonly styles: any = {
        h1: css({
            marginTop: 0
        }) + ''
    };

    public render(): any {
        return(
            <article>
                <h1 className={this.styles.h1}>{this.props.header}</h1>
                <div dangerouslySetInnerHTML={{__html: this.props.content}}/>
            </article>
        );
    }
}

export default Post;

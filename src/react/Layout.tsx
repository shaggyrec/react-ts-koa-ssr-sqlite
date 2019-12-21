import React, { Component } from 'react';
import Meta from '../dataTypes/Meta';

interface LayoutInterface {
    meta: Meta;
}

export default class Layout extends Component<LayoutInterface> {
    public render(): any {
        const { title, description, keywords }: Meta = this.props.meta;
        return (
            <React.Fragment>
                <html>
                    <head>
                        <title>{title || 'Shogenov.com'}</title>
                        { description && <meta name="description" content={description} /> }
                        { keywords && <meta name="keywords" content={keywords} /> }
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                        />
                        <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.bubble.css"/>
                    </head>
                    <body>
                        {this.props.children}
                    </body>
                    <script src="/index.js"/>
                </html>
            </React.Fragment>
        );
    }
}

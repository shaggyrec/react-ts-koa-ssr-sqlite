import React, { Component } from 'react';
import { css } from 'glamor';

interface FooterInterface {
    text?: string
}

class Footer extends Component<FooterInterface> {
    private readonly year: number = (new Date()).getFullYear();
    private styles = {
        footer: css({
            marginTop: '1rem',
            padding: '1rem',
            textAlign: 'center'
        }) + ''
    };

    render() {
        return (
            <div className={this.styles.footer}>
                <div className="container">
                    &copy; {this.year} {this.props.text || ''}
                </div>
            </div>
        )
    }
}

export default Footer;

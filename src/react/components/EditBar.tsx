import { css } from 'glamor';
import React, { Component, ReactNode } from 'react';

interface EditBarInterface {
    loading?: boolean;
    show: boolean;
}

class EditBar extends Component<EditBarInterface> {
    private styles: any = {
        barWrapper: css({
            height: '3rem'
        }) + '',
        bar: css({
            position: 'fixed',
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between'
        }) + '',
        buttonLoading: css({
            background: '#263238'
        }) + '',
        buttonSaved: css({
            background: '#00c853'
        }) + ''
    };

    public render(): ReactNode {
        if (this.props.show) {
            return (
                <div className={this.styles.barWrapper}>
                    <div className={this.styles.bar}>
                        <div className="container">
                            { this.props.children }
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default EditBar;

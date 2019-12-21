import { css } from 'glamor';
import React, { Component, ReactElement } from 'react';

interface LoaderInterface {
    loading?: boolean;
    overlay?: boolean;
}

class Loader extends Component<LoaderInterface> {
    private styles: any = {
        loader: css({
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            textAlign: 'center',
            zIndex: 999
        }) + ''
    };

    public render(): ReactElement {
        return (
            this.props.loading ?
                <div className={this.props.overlay ? this.styles.loader : ''}>Загрузка...</div>
                : null
        );
    }
}

export default Loader;

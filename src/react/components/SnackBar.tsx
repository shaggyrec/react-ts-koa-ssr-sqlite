import React, { Component } from 'react';
import { css } from 'glamor';
import AppMessageInterface from '../dataTypes/AppMessage';

interface SnackBarInterface {
    messages: AppMessageInterface[];
    onMessageClick: (index: number) => any;
}

class SnackBar extends Component<SnackBarInterface> {

    private styles: any = {
        snackbar: css({
            position: 'fixed',
            zIndex: 999999,
            top: '12px',
            right: '12px'
        }) + '',
        message: css({
            position: 'relative',
            overflow: 'hidden',
            margin: '0 0 6px',
            padding: '15px 15px 15px 50px',
            width: '300px',
            opacity: .95,
            boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
            color: '#fff',
            cursor: 'pointer',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '15px center'
        }) + '',
        success: css({
            backgroundColor: '#00c851',
            backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==)'
        }) + '',
        error: css({
            backgroundColor: '#b71c1c',
            backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=)'
        }) + ''
    };

    private handleClick = (index: number): void => {
        this.props.onMessageClick(index);
    };

    private renderMessage = (message: AppMessageInterface, index: number): React.ReactElement => {
        return(
            <div
                key={`snackbar_message_${index}`}
                className={`${this.styles.message} ${message.type ? this.styles[message.type] : this.styles.success}`}
                onClick={(): void => this.handleClick(index)}
            >
                {message.content}
            </div>
        );
    };

    public render(): React.ReactElement {
        if (this.props.messages.length > 0) {
            return (
                <div className={this.styles.snackbar}>
                    {this.props.messages.map(this.renderMessage)}
                </div>
            );
        }

        return null;
    }
}

export default SnackBar;

import { css } from 'glamor';
import React, { Component, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import UserSchema from '../../dataTypes/UserSchema';

interface HeaderInterface {
    user?: UserSchema;
}

class Header extends Component<HeaderInterface> {
    private readonly styles: any = {
        logo: css({
            background: 'url(/img/shogenovLogoWhite.png) no-repeat 50% 50%',
            backgroundSize: '100%',
            height: '50px',
            width: '150px'
        }) + '',
        container: css({
            display: 'flex',
            justifyContent: 'space-between'
        }) + ''
    };

    public render(): ReactElement {
        return (
            <header>
                <div className={`container ${this.styles.container}`}>
                    <Link to="/"><div className={this.styles.logo}/></Link>
                    {this.props.user && <Link to="/me">{ this.props.user.username }</Link>}
                </div>
            </header>
        );
    }
}

export default Header;

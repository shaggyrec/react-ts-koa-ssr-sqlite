import React, { Component, ReactNode } from 'react';
import { css } from 'glamor';

// @ts-ignore
const animation = css.keyframes({
    '0%': { backgroundImage: 'url(/img/cv1.png)', },
    '50%': { backgroundImage: 'url(/img/cv2.png)', }
});

class ResumeLink extends Component {
    private styles: any = {
        link: css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            backgroundImage: 'url(/img/cv1.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 50%',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            animation: `${animation} 5s infinite`,
            fontSize: '1px',
            textShadow: '0 2px 5px rgba(0,0,0,.16)',
            ':hover': {
                height: '100vh',
                color: '#fff',
                fontSize: '50px'
            }
        }) + ''
    };

    public render(): ReactNode {
        return (
            <div>
                <h2>Interactive animated CV:</h2>
                <a className={this.styles.link} href="/resume" target="_blank">Click to see</a>
            </div>
        );
    }
}
export default ResumeLink;

import { css } from 'glamor';

css.global('@font-face', {
    fontFamily: 'AvertaDemoPE-Regular',
    src: 'url("/font/averta/AvertaDemoPE-Regular.eot?#iefix") format("embedded-opentype"),  url("/font/averta/AvertaDemoPE-Regular.otf")  format("opentype"), url("/font/averta/AvertaDemoPE-Regular.woff") format("woff"), url("/font/averta/AvertaDemoPE-Regular.ttf")  format("truetype"), url("/font/averta/AvertaDemoPE-Regular.svg#AvertaDemoPE-Regular") format("svg")',
    fontWeight: 'normal',
    fontStyle: 'normal'
});
css.global('body', {
    margin: 0,
    background: '#1D1B22',
    color: '#fff',
    font: '18px/1.4 "AvertaDemoPE-Regular"',
    position: 'relative'
});
css.global('*', {
    boxSizing: 'border-box'
});
css.global('a', {
    color: '#67b8ff',
    transition: 'all .5s'
});

css.global('a:hover', { color: '#8fcbff' });

css.global('section', {
    color: '#000',
    background: '#fff',
    padding: '10px 15px'
});

css.global('.container', {
    width: '100%',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
});

css.global('article', {
    background: '#fff',
    color: '#000',
    padding: '1rem'
});

css.global('article img', {
    maxWidth: '100%'
});

css.global('.formField__input', {
    fontSize: '1rem',
    borderRadius: '4px',
    border: 0,
    outline: 'none',
    background: 'rgba(255, 255, 255, .1)'
});

css.global('.formField', {
    position: 'relative',
    width: '100%',
    padding: '.5rem 0'
});
css.global('.formField__input', {
    boxSizing: 'border-box',
    padding: '1rem .5rem',
    height: 'auto',
    width: '100%',
    color: '#fff'
});

css.global('.formField__label', {
    position: 'absolute',
    top: '-.2rem',
    left: 0,
    fontSize: '.9rem',
    lineHeight: 1,
    borderRadius: '4px',
    padding: '2px 5px'
});

css.global('button, .button', {
    fontFamily: 'inherit',
    fontWeight: 900,
    fontSize: '1rem',
    background: '#01579b',
    border: 'none',
    borderRadius: '4px',
    padding: '1rem',
    width: '100%',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    transition: 'all .5s',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
    boxSizing: 'border-box'
});

css.global('button:hover, .button:hover', {
    background: '#046ec1',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.06), 0 2px 10px 0 rgba(0,0,0,.02)'
});

css.global('.shadow', {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)'
});

css.global('.my-1', { marginTop: '1rem', marginBottom: '1rem' });
css.global('.mt-1', { marginTop: '1rem' });
css.global('.mb-1', { marginBottom: '1rem' });

css.global('.ql-editor p, .ql-editor blockquote', {
    fontSize: '18px',
    lineHeight: '1.8'
});

css.global('.ql-editor blockquote', {
    background: '#e6e6e6'
});
css.global('.ql-editor  .ql-video', {
    width: '450px',
    height: '300px',
    margin: '.5rem auto'
});

css.global('blockquote', {
    margin: 0,
    padding: '1rem',
    background: '#ccc'
});

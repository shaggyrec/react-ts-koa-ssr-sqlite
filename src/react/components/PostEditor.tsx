import { css } from 'glamor';
import { Component, Fragment, ReactNode } from 'react';
import React from 'react';
import PageSchema from '../../dataTypes/PageSchema';
import TextFieldEditor from './TextFieldEditor';

interface PostEditorInterface extends PageSchema {
    onChange: (name: string, value: string) => void;
}

class PostEditor extends Component<PostEditorInterface> {
    private readonly styles: any = {
        h1: css({
            marginTop: 0,
            fontSize: '1.5em',
            border: 'none',
            width: '100%'
        }) + '',
        input: css({
            border: 'none',
            fontSize: '1rem',
            width: '100%',
            lineHeight: 1
        }) + '',
        content: css({
            margin: '0 -15px'
        }) + '',
        tag: css({
            display: 'flex'
        }) + '',
        tagButton: css({
            width: '50px'
        }) + ''
    };

    public state: { tags: [] };

    public constructor(props: PostEditorInterface) {
        super(props);
        this.state = {
            tags: props.tags ? JSON.parse(props.tags) : []
        };
    }

    private handleContentChange = (name: string, content: string): void => {
        this.setState({ [name]: content });
        this.props.onChange(name, content);
    };

    private handleInputChange = ({ target: { name, value } }): void => {
        this.setState({[name]: value});
        this.props.onChange(name, value);
    };

    private handleTagsChange = (index: number, value: string): void => {
        const newTags = this.state.tags.map((tag: string, i: number) => {
            if (index === i) {
                return value;
            }
            return tag;
        });

        this.setState({ tags: newTags });
        this.props.onChange('tags', JSON.stringify(newTags));
    };

    private handleTagAdd = (e: any): void => {
        e.preventDefault();
        const newTags = [ ...this.state.tags, e.target[0].value ];
        this.setState({ tags: newTags });
        this.props.onChange('tags', JSON.stringify(newTags));
        e.target[0].value = '';
    };

    private handleTagDelete = (i: number): void => {
        const newTags = this.state.tags.filter(({}, index: number) => index !== i)
        this.setState({ tags: newTags });
        this.props.onChange('tags', JSON.stringify(newTags));
    };

    private handleCheckBoxChange = ({ target: { name, checked } }): void => {
        this.props.onChange(name, checked);
    };

    private renderTags(tags: any[]): ReactNode[] {
        return tags.map((tag: string, i: number): ReactNode => (
            <div key={`tagInput${i}`} className={`formField ${this.styles.tag}`}>
                <input
                    type="text"
                    className="formField__input"
                    value={tag || ''}
                    onChange={({ target: { value } }) => this.handleTagsChange(i, value)}
                    name="tags"
                    placeholder="tags"
                    required
                />
                <label className="formField__label">tag {i + 1}</label>
                <button className={this.styles.tagButton} onClick={(): void => this.handleTagDelete(i)}>x</button>
            </div>
        ));
    }

    public render(): ReactNode {
        return (
            <Fragment>
                <div className="formField">
                    <label>
                        <input
                            type="checkbox"
                            checked={this.props.active}
                            onChange={this.handleCheckBoxChange}
                            name="active"
                        />
                        <span>active</span>
                    </label>
                </div>
                <div className="formField">
                    <label>
                        <input
                            type="checkbox"
                            checked={this.props.excludeFromBlog}
                            onChange={this.handleCheckBoxChange}
                            name="excludeFromBlog"
                        />
                        <span>Exclude from blog</span>
                    </label>
                </div>
                <article>
                    <input
                        type="text"
                        className={this.styles.h1}
                        value={this.props.header}
                        onChange={this.handleInputChange}
                        name="header"
                        placeholder="header"
                    />
                    <div className={this.styles.content}>
                        <TextFieldEditor
                            onChange={this.handleContentChange}
                            name="content"
                            value={this.props.content}
                        />
                    </div>
                </article>
                <hr />
                <h3>Meta:</h3>
                <div className="formField">
                    <input
                        type="text"
                        className="formField__input"
                        value={this.props.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="title"
                    />
                    <label className="formField__label">title</label>
                </div>
                <div className="formField">
                    <input
                        type="text"
                        className="formField__input"
                        value={this.props.description}
                        onChange={this.handleInputChange}
                        name="description"
                        placeholder="description"
                    />
                    <label className="formField__label">description</label>
                </div>
                <div className="formField">
                    <input
                        type="text"
                        className="formField__input"
                        value={this.props.alias}
                        onChange={this.handleInputChange}
                        name="alias"
                        placeholder="alias"
                        required
                    />
                    <label className="formField__label">alias</label>
                </div>
                <hr/>
                <h4>Tags</h4>
                {this.renderTags(this.state.tags)}
                <form className={`formField ${this.styles.tag}`} onSubmit={this.handleTagAdd}>
                    <input
                        type="text"
                        className="formField__input"
                        name="tags"
                        placeholder="new tag"
                        required
                    />
                    <label className="formField__label">new tag</label>
                    <button className={this.styles.tagButton}>+</button>
                </form>
            </Fragment>
        );
    }
}

export default PostEditor;

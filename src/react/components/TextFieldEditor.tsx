import React, { Component, ReactNode } from 'react';

const editorModules = {
    toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
        [{indent: '-1'}, {indent: '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
};

interface TextFieldEditorInterface {
    value: string;
    name: string;
    onChange: (name: string, content: string) => void;
}

class TextFieldEditor extends Component<TextFieldEditorInterface> {
    public state: any;
    private readonly ReactQuill: any;
    public constructor(props: any) {
        super(props);
        this.state = {
            value: props.value || ''
        };
        if (typeof window !== 'undefined') {
            this.ReactQuill = require('react-quill');
        }
    }

    private handleChange = (content: string): void => {
        this.props.onChange(this.props.name, content);
    };

    public render(): ReactNode {
        const ReactQuill = this.ReactQuill;
        if (ReactQuill) {
            return (
                <ReactQuill
                    style={{fontSize: '1rem'}}
                    modules={editorModules}
                    theme="bubble"
                    defaultValue={this.state.value}
                    placeholder="Контент"
                    onChange={this.handleChange}
                />
            );
        }
        return null;
    }
}

export default TextFieldEditor;

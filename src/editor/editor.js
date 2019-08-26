import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { async } from 'q';

class EditorComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }

    updateBody = async (val) => {
        await this.setState({ text: val });
        this.update();
    };

    update = debounce(() => {
        console.log('updaing database');
    }, 1500);

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.editorContainer}>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.updateBody}
                >
                </ReactQuill>
            </div>
        )
    }
}

export default withStyles(styles)(EditorComponent)
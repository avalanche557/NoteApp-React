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

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        })
    }

    componentDidUpdate = () => {
        if (this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            })
        }
    }

    updateBody = async (val) => {
        await this.setState({ text: val });
        this.update();
    };

    update = debounce(() => {
        this.props.noteUpdate(this.state.id, { title: this.state.title, body: this.state.text });
    }, 1500);

    updateTitle = async (val) => {
        await this.setState({ title: val });
        this.update();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}/>
                <input
                    className={classes.titleInput}
                    placeholder='Note title...'
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e) => this.updateTitle(e.target.value)}
                ></input>
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
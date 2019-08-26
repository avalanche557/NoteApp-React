import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helper';

class SidebarItemComponent extends React.Component {

    render() {
        const { note, index, selectedNoteIndex, classes, selectNote, deleteNote } = this.props
        return (
            <div key={index}>
                <ListItem className={classes.listItem} selected={selectedNoteIndex === index} alignItems='flex-start'>
                    <div className={classes.textSection} onClick={selectNote}>
                        <ListItemText
                            primary={note.title}
                            secondary={removeHTMLTags(note.body.substring(0, 30) + '...')}
                        >
                        </ListItemText>
                    </div>

                </ListItem>
            </div>
        )
    }
}

export default withStyles(styles)(SidebarItemComponent)
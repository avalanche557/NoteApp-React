import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sideBarItem';

class SideBarCompoment extends React.Component {
    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: null
        }
    }

    newNoteBtnClick = () => {
        console.log("new note click");
        this.setState({
            addingNote: !this.state.addingNote,
            title: null
        })
    }

    updateTitle = (text) => {
        console.log('here is the text', text);
        this.setState({
            title: text
        })
    }

    newNote = () => {
        console.log(this.state);
    }

    selectNote = () => {
        console.log('select note');  
    }

    deleteNote = () => {
        console.log('delete google'); 
    }

    render() {
        const { notes, classes, selectedNoteIndex } = this.props;
        if(notes){
            return (
                <div className={classes.sidebarContainer}>
                    <Button
                        onClick={this.newNoteBtnClick}
                        className={classes.newNoteBtn}
                    >
                        {!this.state.addingNote ? 'New Note' : 'Cancel'}
                    </Button>
                    {
                        this.state.addingNote ?
                            <div>
                                <input
                                    type='text'
                                    className={classes.newNoteInput}
                                    placeholder='Enter note title'
                                    onKeyUp={(e) => this.updateTitle(e.target.value)}
                                >
                                </input>
                                <Button
                                    className={classes.newNoteSubmitBtn}
                                    onClick={this.newNote}
                                >
                                    Submit Note
                                </Button>
                            </div>
    
                            :
                            null
                    }
                    <List>
                        {
                            notes.map((note, index) => {
                                return(
                                    <div key={index}>
                                        <SidebarItemComponent
                                            note={note}
                                            index={index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}
                                        >
    
                                        </SidebarItemComponent>
                                        <Divider></Divider>
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
            )
        } else {
            return(
                <div>
                    Add a Note!
                </div>
            )
        }
    }
}

export default withStyles(styles)(SideBarCompoment)
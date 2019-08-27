import React from 'react';
import './App.css';
import SideBarCompoment from './sidebar/sideBar';

import EditorComponent from './editor/editor';
import { async } from 'q';

const firebase = require('firebase');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedNoteIndex: null,
            selectedNote: null,
            notes: null
        }
    }

    componentDidMount = () => {
        firebase.firestore().collection('notes').onSnapshot(
            serverUpdate => {
                const notes = serverUpdate.docs.map(_doc => {
                    const data = _doc.data();
                    data['id'] = _doc.id;
                    return data;
                });
                console.log(notes);
                this.setState({
                    notes: notes
                })
            }
        );
    }

    selectNote = (note, index) => {
        this.setState({
            selectedNoteIndex: index,
            selectedNote: note
        }, () => {
            console.log('seleted',this.state.selectedNote);

        })
    }

    noteUpdate = (id, noteObj) => {
        console.log((id, noteObj));
        firebase.firestore().collection('notes').doc(id).update({
            title: noteObj.title,
            body: noteObj.body,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    newNote = async (title) => {
        const note = {
            title: title,
            body: ''
        };
        const newNoteFromDB = await firebase.firestore().collection('notes').add(
            {
                title: note.title,
                body: note.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        const newId = newNoteFromDB.id;
        await this.setState({
            notes: [...this.state.notes, note]
        })
        const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newId)[0])
        this.setState({
            selectedNote: this.state.notes[newNoteIndex],
            selectedNoteIndex: newNoteIndex
        })
    }

    deleteNote = async (note) => {
        const noteIndex = this.state.notes.indexOf(note);
        await this.setState({
            notes: this.state.notes.filter(_note => _note !== note)
        })
        if (this.state.selectedNoteIndex === noteIndex) {
            this.setState({
                selectedNoteIndex: null,
                selectedNote: null
            })
        } else {
            this.state.notes.length > 1 ?
                this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
                :
                this.setState({
                    selectedNoteIndex: null,
                    selectedNote: null,
                })
        }
        firebase.firestore().collection('notes').doc(note.id).delete()
    }

    render() {
        return (
            <div className='app-container'>
                <SideBarCompoment
                    selectedNoteIndex={this.state.selectedNote}
                    notes={this.state.notes}
                    deleteNote={this.deleteNote}
                    selectNote={this.selectNote}
                    newNote={this.newNote}
                >
                </SideBarCompoment>
                {
                    this.state.selectedNote ?
                        <EditorComponent selectedNote={this.state.selectedNote} selectedNoteIndex={this.state.selectedNoteIndex} notes={this.state.notes} noteUpdate={this.noteUpdate} />
                        :
                        null
                }
            </div>
        )
    }
}

export default App;

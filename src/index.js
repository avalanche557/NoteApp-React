import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDEkewMzOK97GwS9nEbbfzoSckBFMmXJwc",
    authDomain: "ever-note-ad0f6.firebaseapp.com",
    databaseURL: "https://ever-note-ad0f6.firebaseio.com",
    projectId: "ever-note-ad0f6",
    storageBucket: "ever-note-ad0f6.appspot.com",
    messagingSenderId: "571354284823",
    appId: "1:571354284823:web:743cf53f3f22092c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

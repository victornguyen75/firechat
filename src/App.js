import React from 'react';
import './App.css';

// Firebase SDK
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.intitializeApp({
  apiKey: "AIzaSyA5ELh78m9dIlc9JUH6Q3Vw7FGw1P0Y5-E",
  authDomain: "firechat-9c596.firebaseapp.com",
  projectId: "firechat-9c596",
  storageBucket: "firechat-9c596.appspot.com",
  messagingSenderId: "715001458183",
  appId: "1:715001458183:web:96bac93460eef137f184a2",
  measurementId: "G-C60W2YVGJF"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;

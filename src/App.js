import React, { useState } from 'react';
import './App.css';

// Firebase SDK
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
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
  const [ user ] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>🔥This Chat 💬 is Lit🔥</h1>
          <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createAt').limit(25);
  const [ messages ] = useCollectionData(query, {idField: 'id'});
  const [ formValue, setFormValue ] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  }


  return (
    <>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
    </div>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={e => setFormValue(e.target.value)}/>
      <button type="submit">Enter 🕊️</button>
    </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img alt="userProfilePicture" src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default App;

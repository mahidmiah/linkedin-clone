import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(userAuth => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          profileUrl: userAuth.user.photoURL,
        }))
      })
      .catch(error => {
        alert(error)
      })
  }

  const register = () => {
    if (!name){
      return alert("Please enter a full name!")
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // User signed in 
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: profilePic,
        })
          .then(() => {
              dispatch(login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: name,
                photoUrl: profilePic
              }));
          });
      })
      .catch(error => {
        // Handle errors
        console.log(error)
      });
  }

  return (
    <div className='login'>
      <img src='https://logos-download.com/wp-content/uploads/2016/03/LinkedIn_Logo_2019.png' />

      <form>
        <input value={name} onChange={e => setName(e.target.value)} placeholder='Full name (required if registering)' type='text' />

        <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder='Profile pic URL (optional)' type='text' />

        <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type='email' />

        <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type='password' />

        <button type='submit' onClick={loginToApp}>Sign In</button>
      </form>

      <p>
        Not a member?
        <span className='login_register' onClick={register}> Register Now</span>
      </p>

    </div>
  )
}

export default Login
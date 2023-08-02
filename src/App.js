import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';

import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import Widgets from './Widgets';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User logged in
        dispatch(login({
          email: user.email,
          uid: user.uid, 
          displayName: user.displayName,
          photoUrl: user.photoUrl  
        }));
  
      } else {
        // User logged out  
        dispatch(logout());
      }
    });
  
    return unsubscribe;
  
  }, [dispatch]);

  return (
    <div className="app">

      {!user ? 
        ( 
          <Login /> 
        ) 
        : 
        (
          <>
            <Header />
            <div className='app_body'>
              <Sidebar />
              <Feed />
              {/* Widgets */}
              <Widgets />
            </div>
          </>
        )
      }

    </div>
  );
}

export default App;

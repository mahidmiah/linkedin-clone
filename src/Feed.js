import React, { useEffect, useState } from 'react'
import './Feed.css'

import CreateIcon from '@mui/icons-material/Create'
import ImageIcon from '@mui/icons-material/Image'
import SubscriptionIcon from '@mui/icons-material/Subscriptions'
import EventIcon from '@mui/icons-material/EventNote'
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay'

import InputOption from './InputOption'
import Post from './Post'
import { db } from './firebase'

import { collection, onSnapshot, doc, addDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'

import FlipMove from 'react-flip-move';

function Feed() {

  const user = useSelector(selectUser);

  const [input, setInput] = useState('');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,  
        data: doc.data(),
      })));
      console.log('the posts: ')
      console.log(posts)
    });
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
  
    const collectionRef = collection(db, "posts");
  
    addDoc(collectionRef, {
      name: user.displayName, 
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || '',
      timestamp: serverTimestamp(),
    });

    setInput('');
  }

  return (
    <div className='feed'>
      <div className='feed_inputContainer'>
        <div className='feed_input'>
          <CreateIcon />
          <form>
            <input value={input} onChange={e => setInput(e.target.value)} type='text' />
            <button onClick={sendPost} type='submit' hidden>Send</button>
          </form>
        </div>

        <div className='feed_inputOptions'>
          <InputOption Icon={ImageIcon} title={'Photo'} color={'#70B5F9'} />
          <InputOption Icon={SubscriptionIcon} title={'Video'} color={'#E7A33E'} />
          <InputOption Icon={EventIcon} title={'Event'} color={'#C0CBCD'} />
          <InputOption Icon={CalendarViewDayIcon} title={'Write Article'} color={'#7FC15E'} />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map((post) => {
          return (
            <Post 
              key={post.id}
              name={post.data.name}
              description={post.data.description}
              message={post.data.message}
              photoUrl={post.data.photoUrl}
            />
          )
        })}
      </FlipMove>

    </div>
  )
}

export default Feed
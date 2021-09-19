import React, { useContext, useRef, useEffect } from 'react'
import './styles.scss'
import { UserContext } from '../hooks/userContext'
import NewMessage from './NewMessage'


export default function Messages() {
  const {state} = useContext(UserContext)
  const messagesEndRef = useRef(null)
  const {dispatch} = useContext(UserContext);

  const messages = Object.keys(state).map(message => {
    if (state[message]['sent'] === "Anton") {
      return (
        <div 
          className="message message-personal"
          key = {message}> 
          {state[message]['msg']}
        </div>)
    } else {
      return (
        <div className="message new"
        key = {message}>
          <figure className="avatar">
          <img src="https://img-9gag-fun.9cache.com/photo/ayeRAm8_460s.jpg" alt = "avatar" />
          </figure>  {state[message]['msg']}
        </div>
      )
    }
  });
  
  //Sort messages by date:

  const sortedMessages = messages.sort((firstElem, secondElem) => {
    console.log(firstElem.key)
    if (firstElem.key > secondElem.key){
      return 1
    } else {
      return -1 
    }
  })

  const submitMessage = (e, msg) => {
    //Remove me later
    const names = ["Anton", "James", "Doug", "Jane"]
    const pickName = names[Math.floor(Math.random() * 4)]

    if (msg !== 0){
      dispatch({type: 'newmessage', values : { msg: msg, sent: pickName, date: Date.now()}})
    }
  }

  const handleKeyPress = (e, msg) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      submitMessage(e, msg);
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <>
    <div className="messages">
      <div className="messages-content"></div>
      {sortedMessages}
      <div className="message-null" ref={messagesEndRef} />
    </div>
    <NewMessage 
    onSumbit = {submitMessage} 
    onEnter = {handleKeyPress}
    />
    
    </>
  )
}



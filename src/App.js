import './App.css';
import Chat from './Components/Chat';
import React, { useReducer } from 'react';
import { UserContext } from './hooks/userContext';


const NEWMESSAGE = 'newmessage'

function reducer(state, action){

  const newMessage = (input) => {
    const newState = {...state}
    const updateState = {...newState, [Date.now()] : input}
    return updateState
  }

  const actions = {
    [NEWMESSAGE] : newMessage
  }

  return actions[action.type](action.values);

}

function App() {
  const initialState = { 0 : { msg: "Hello", sent: "Anton", date: Date.now()}}
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
  <UserContext.Provider value = {{state, dispatch}}>
    <Chat />
   </UserContext.Provider>
  );
}

export default App;

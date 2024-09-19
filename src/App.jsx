import React, { useEffect, useState } from "react";
import IO from "socket.io-client";
import { Routes,Route } from "react-router-dom";
import "../public/css/common.css";
import "../public/css/style.css";
import Chat from "./components/Chat";
import Auth from "./components/Auth";

const socket = IO.connect("http://localhost:4003");
const pvsocket = IO.connect("http://localhost:4003/pvs");
console.log('ss',socket);
function App() {
  const [pvs, setPvs] = useState([]);
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    socket.on("privateChats", (pvs) => setPvs([...pvs]));
    confirmMSG()
    confirmremoveMSG()
  }, []);
const Joiningchat=(sender,receiver)=>{
  pvsocket.emit('joining',{
sender,receiver
  })
}
const sendMSG=(message,sender,receiver)=>{
  console.log(message,sender,receiver);
pvsocket.emit('newMsg',{
  message,
  pv:{
    sender,receiver
  }
})
}
const confirmMSG=()=>{
  pvsocket.on('confirmMsg',(data)=>{
setMessage((messages)=> [...messages, data])
console.log(messages);
  })
}
const removeMsg=(msgID)=>{
  pvsocket.emit('removeMsg',{msgID})
}
const confirmremoveMSG=()=>{
pvsocket.on('confirmRemoveMsg',data=>{
  setMessage((messages)=>
    messages.filter(item=> item.msgID !== data.msgID)
  )
})
}
  return (
 <Routes>
   <Route path="/" element={<Chat  pvs={pvs} Joiningchat={Joiningchat} sendMSG={sendMSG} messages={messages} removeMsg={removeMsg} />} />
   <Route path="/auth" element={<Auth/>} />
 </Routes>
  );
}

export default App;

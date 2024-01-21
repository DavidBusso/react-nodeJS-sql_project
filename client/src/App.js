import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./jsx_files/login";
import Home from "./jsx_files/home";
import Todo from "./jsx_files/todo";
import Posts from "./jsx_files/posts";

function App() {
  const [log, setLog] = useState(true);
  const [userId, setUserId] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [postId, setPostId] = useState("")
  //   const nameOfUser = async () => {
  //     let reject = await fetch("http://localhost:3300/sql/login/user/" + userId)
  //     let name = await reject.json();
  //     console.log(userId,name.name);
  //     setCurrentName(name.name);
  //   }

  //   useEffect(() => {
  //     nameOfUser();
  // }, [userId,currentName]);
  return (
    <div className="App">
      <input type="button" value={log ? 'login' : 'logout'} onClick={() => { setLog(false); window.location.href = '/sql/login' }} />
      <h3>hello {currentName}</h3>
      <div className="comp">
        <BrowserRouter>
          <Routes>
            <Route path='/sql/login' element={<Login setUserId={setUserId} setLog={setLog} />}></Route>
            <Route path={`/sql/login/home`} element={<Home userId={userId} />} ></Route>
            {/* <Route path='/Register' element={<Register />} ></Route> */}
            <Route path={`/sql/todo/${userId}`} element={<Todo userId={userId} />}></Route>
            <Route path={`/sql/posts/${userId}`} element={<Posts userId={userId} />}></Route>
            {/*  <Route path={`/User/${userId}/home/Albums`} element={<Comments userId={userId} setPostId={setPostId} />}></Route> */}
            {/* <Route path={`/User/${userId}/home/Albums`} element={<Albums userId={userId} setAlbumId={setAlbumId} />}></Route> */}
            {/* <Route path={`/User/${userId}/home/Albums/Photos`} element={<Photos userId={userId} albumId={albumId} />}></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

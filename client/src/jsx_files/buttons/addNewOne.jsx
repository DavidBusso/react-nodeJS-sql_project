import { useState } from "react";
import axios from 'axios';
import '../../cssFiles/addNewOne.css'
export default function AddNewOne(props) {
    const [showAdd, setShowAdd] = useState(false)
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [valueTheInput, setValueTheInput] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const [valueTheTextarea, setValueTheTextarea] = useState("");
    const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    const editNewOne = async () => {
        await add();
        await props.setData((prevData) => [...prevData, newOne])
        await props.open();
    }
    let newOne = {};
    if (props.types === "posts") {
        newOne = {
            title: valueTheInput,
            userId: props.userId,
            body: valueTheTextarea
        }
    }
    if (props.types === "todo") {
        newOne = {
            completed: statusValue === true,
            title: valueTheInput,
            userId: props.userId
        }
    }
    if (props.types === "comments") {
        newOne = {
            postId: props.postIdId,
            name: nameValue,
            email: emailValue,
            body: valueTheTextarea
        }
    }
    
    const add = async () => {
        if (props.types === "comments")
            await axios.post(`http://localhost:3300/sql/${props.types}/user/1/` + props.userId.postId, newOne,{headers:{'auth':`${user}:${password}`}});
        else
        await axios.post(`http://localhost:3300/sql/${props.types}/user/` + props.userId, newOne,{headers:{'auth':`${user}:${password}`}});
    }
    return (
        <div className="container">
            <button onClick={() => setShowAdd(!showAdd)}>add new one</button>
            <div style={{ display: showAdd ? "block" : "none" }}>
                
                <div style={{ display: props.types === "comments" ? "block" : "none" }}>
                    <label for="title">write a name </label>
                    <input type="text" name="title" onChange={(event) => setNameValue(event.target.value)} />

                </div>
                <div style={{ display: props.types === "comments" ? "block" : "none" }}>
                    <label for="title">write a email </label>
                    <input type="text" name="title" onChange={(event) => setEmailValue(event.target.value)} />
                </div>


                <div style={{ display: props.types !== "comments" ? "block" : "none" }}>
                    <label for="title">write a title </label>
                    <input type="text" name="title" onChange={(event) => setValueTheInput(event.target.value)} />

                </div>
                <div style={{ display: props.types !== "todo" ? "block" : "none" }}>
                    <label for="body">write a body </label>
                    <textarea type="text" name="body" onChange={(event) => setValueTheTextarea(event.target.value)} >
                    </textarea>
                </div >
                <div style={{ display: props.types === "todo" ? "block" : "none" }}>
                    <label for="status">Choose a status </label>
                    <select id="status" name="status" onChange={(event) => setStatusValue(event.target.value === "true")}>
                        <option value="Choose" disabled selected>Choose</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </div>
                <button onClick={editNewOne}>EditNewOne</button>
            </div>
        </div>
    )
}
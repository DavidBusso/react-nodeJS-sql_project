import { useState } from "react";
import axios from 'axios';
export default function EditCurrent(props) {
    const [valueTheInput, setValueTheInput] = useState("");
    const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    const editCurrent = async () => {
        await add();
        await props.setData((prevData) => [...prevData, newOne])
        await props.open();
    }
    let newOne = { id: props.data.id, title: valueTheInput, };
    const add = async () => {
        await axios.put(`http://localhost:3300/sql/${props.types}/user/${props.data.userId}/editTitle`, newOne,{headers:{'auth':`${user}:${password}`}})
    }
    return (
        <div>
            <label for="title"> </label>
            <input type="text" name="title" onChange={(event) => setValueTheInput(event.target.value)} />
            <button onClick={editCurrent}>Edit title</button>
        </div>
    )
}
import { useState } from "react";
import axios from 'axios';
export default function EditCurrentBody(props) {
    const [valueTheInput, setValueTheInput] = useState("");
    const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    const editCurrentBody = async () => {
        await add();
        await props.setData((prevData) => [...prevData, newOne])
        await props.open();
    }
    let newOne = {
        id: props.data.id,
        body: valueTheInput,
    }
    const add = async () => {
        await axios.put(`http://localhost:3300/sql/${props.types}/user/${props.data.userId}/editBody`, newOne,{headers:{'auth':`${user}:${password}`}})
    }
    return (
        <div>
            <label for="body"> </label>
            <textarea type="text" name="body" onChange={(event) => setValueTheInput(event.target.value)} >
            </textarea>
            <button onClick={editCurrentBody}>Edit body</button>
        </div>
    )
}
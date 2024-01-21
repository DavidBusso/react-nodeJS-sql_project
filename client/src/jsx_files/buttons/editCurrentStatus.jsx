import { useState } from "react";
import axios from 'axios'
export default function EditCurrentStatus(props) {
    const [statusValue, setStatusValue] = useState(null);
    const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    const editCurrent = async () => {
        await add();
        await props.setData((prevData) => [...prevData, newOne])
        await props.open();
    }
    let newOne = {
        id: props.data.id,
        completed: statusValue
    }
    const add = async () => {
       await axios.put(`http://localhost:3300/sql/todo/user/${props.data.userId}/editCompleted`,newOne,{headers:{'auth':`${user}:${password}`}})
    }
    return (
        <div>
            <label for="status"></label>
            <select id="status" name="status" onChange={(event) => setStatusValue(event.target.value)}>
                <option value="Choose" disabled selected>Choose</option>
                <option value={1}>true</option>
                <option value={0}>false</option>
            </select>
            <button onClick={editCurrent}>Edit status</button>
        </div>
    )
}

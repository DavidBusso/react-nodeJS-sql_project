import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddNewOne from "./buttons/addNewOne";
import EditCurrent from "./buttons/editCurrent";
import EditCurrentStatus from "./buttons/editCurrentStatus";
import DeleteOne from "./buttons/deleteOne";
import '../cssFiles/todo.css'
export default function Todo(props) {
    const navigate = useNavigate();
    const [tasksURL, setTasksURL] = useState([]);
    const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    console.log(password,user);
    const open = async () => {
        let tasksUrl = await axios.get("http://localhost:3300/sql/todo/user/" + props.userId,{headers:{'auth':`${user}:${password}`}});
        let { data } = tasksUrl;
        setTasksURL(data)
    }
    const openBoolean = async (value) => {
        let tasksUrlBoolean = await axios.get(`http://localhost:3300/sql/todo/user/${props.userId}/${value}`,{headers:{'auth':`${user}:${password}`}});
        let { data } = tasksUrlBoolean;
        setTasksURL(data)
    }
    const orderBy = async (value) => {
        let tasksUrlOrderBy = await axios.get(`http://localhost:3300/sql/todo/user/${props.userId}/orderby/${value}`,{headers:{'auth':`${user}:${password}`}});
        let { data } = tasksUrlOrderBy;
        setTasksURL(data)
    }
    let valueTheInput = "";
    const byInput = async (event) => {
        valueTheInput = event.target.value;
        if (valueTheInput.length === 0) {
       open();
        }
        else {
            let tasksUrlOrderBy = await axios.get(`http://localhost:3300/sql/todo/user/${props.userId}/included/${valueTheInput}`,{headers:{'auth':`${user}:${password}`}});
            let { data } = tasksUrlOrderBy;
            setTasksURL(data)
        }
    }
    useEffect(() => {
        open();

    }, []);
    return (
        <div>
            <div className="table-section">
                <div className="buttons-section">
                    <button onClick={() => openBoolean(1)}>filter true</button>
                    <button onClick={() => openBoolean(0)}>filter false</button>
                    <button onClick={() => open()}>sort By Numbers</button>
                    <button onClick={() => orderBy(`title`)}>sort By Letters</button>
                    <button onClick={() => orderBy(`completed`)}>sort By Boolean</button>
                </div>
                <div>
                    <div>
                        <label htmlFor="searchTitle"> search title</label>
                        <input type="text" name={"searchTitle"} onChange={byInput} />
                    </div>
                    {/* <SearchByTitle setData={setTasksURL} types={"todo"} userId={props.userId} /> */}
                    <AddNewOne data={tasksURL} setData={setTasksURL} userId={props.userId} open={open} types={"todo"} />
                </div>
                <div className="table-section">
                    <table >
                        <thead >
                            <tr>
                                <th style={{ width: '25px' }}>id</th>
                                <th style={{ width: '200px' }}>title</th>
                                <th style={{ width: '50px' }}>completed</th>
                                <th style={{ width: '150px' }}> adit status </th>
                                <th style={{ width: '200px' }}> adit title </th>
                                <th style={{ width: '200px' }}> delete </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksURL.map((element, index) => (
                                <tr key={index}>
                                    <td style={{ width: '25px' }}>{element.id}</td>
                                    <td style={{ width: '200px' }}>{element.title}</td>
                                    <td style={{ width: '50px' }}>{element.completed ? "true" : "false"}</td>
                                    <td style={{ width: '150px' }}>
                                        <EditCurrentStatus
                                            data={element}
                                            setData={setTasksURL}
                                            open={open}
                                            types={"todo"}
                                        /></td>
                                    <td style={{ width: '200px' }}>
                                        <EditCurrent
                                            data={element}
                                            setData={setTasksURL}
                                            open={open}
                                            types={"todo"}
                                        /></td>
                                    <td style={{ width: '200px' }}>
                                        <DeleteOne
                                            data={element}
                                            setData={setTasksURL}
                                            open={open}
                                            types={"todo"}
                                            userId={props.userId}
                                        /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
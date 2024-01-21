import React from "react";
import axios from "axios";
export default function SearchByBooleanTrue(props) {
    const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    let currentUserData = [];
    const searchByBooleanTrue = async () => {
        await openTrue();
        await filterData();
    }
    const filterData = async () => {
        let newData = currentUserData.filter((a) => a.completed === true)
        await props.setData(newData)
    }
    const openTrue = async () => {
        let tasksUrl =await axios.get(`http://localhost:3300/sql/todo/user/${ props.userId}/1`,{headers:{'auth':`${user}:${password}`}} );
        let {dataTrue} =  tasksUrl;
        currentUserData = dataTrue;
        await props.setData(currentUserData)
    }
    return (
        <div>
            <button onClick={searchByBooleanTrue}>SearchByBooleanTrue</button>
        </div>
    )
}
import React, { useState, useEffect } from "react"
import axios from 'axios';
import AddNewOne from "./buttons/addNewOne";
import DeleteOne from "./buttons/deleteOne";




export default function Comments(props) {
    const [commentsURL, setCommentsURL] = useState([]);
    const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    const open = async () => {
        let commentsUrl = await axios.get(`http://localhost:3300/sql/comments/user/${props.userId}/${props.postId}`,{headers:{'auth':`${user}:${password}`}});
        let { data } = commentsUrl;
        setCommentsURL(data)
    }
    useEffect(() => {
        open();
    }, []);
    let showDelete=props.currentUser===props.userId;
    return (
        <div >
            {commentsURL.map((element, index) => (
                <div key={index} className="comments">
                    <div >
                        <p className="name">{element.name}</p>
                    </div>
                    <div>
                        <p className="email">{element.email}</p>
                    </div>
                    <div>
                        <p className="comm">{element.body}</p>
                    </div>
                    <div style={{ display: showDelete ? "block" : "none" }} >
                        <DeleteOne
                            data={element}
                            setData={setCommentsURL}
                            open={open}
                            types={"comments"} 
                            userId={props.userId}/>
                    </div>


                </div>
            ))}
            <AddNewOne
                data={commentsURL}
                setData={setCommentsURL}
                userId={commentsURL[0]}
                open={open}
                types={"comments"} />
        </div>
    );
}
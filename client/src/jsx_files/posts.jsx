import React, { useState, useEffect } from "react"
import axios from 'axios';
import '../cssFiles/posts.css'

import AddNewOne from "./buttons/addNewOne";
import CurrentPost from "./buttons/currentPosts";
import Comments from "./comments";

export default function Posts(props) {
    const [postsURL, setPostsURL] = useState([]);
    const [currentName, setCurrentName] = useState({});
        const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    const open = async () => {
       let postsUrl = await axios.get("http://localhost:3300/sql/posts/user/" + props.userId,{headers:{'auth':`${user}:${password}`}});
        let { data } = postsUrl;
        setPostsURL(data)
    }
    const openName = async () => {
        let postsUrl = await axios.get("http://localhost:3300/sql/posts/user/" + props.userId,{headers:{'auth':`${user}:${password}`}});
        let { dataName } = postsUrl;
        setCurrentName(dataName)
    }
    const orderBy = async (value) => {
      let postsUrlOrderBy = await axios.get(`http://localhost:3300/sql/posts/user/${props.userId}/order/${value}`,{headers:{'auth':`${user}:${password}`}});
        let { data } = postsUrlOrderBy;
        setPostsURL(data)
    }
    let valueTheInput = "";
    const byInput = async (event) => {
        valueTheInput=event.target.value;
       let postsByInput = await axios.get(`http://localhost:3300/sql/todo/user/${props.userId}/included/${valueTheInput}`,{headers:{'auth':`${user}:${password}`}});
        let { data } = postsByInput;
        setPostsURL(data)
    }
    useEffect(() => {
        open();
        // openName();
    }, []);
    return (
        <div>
            post
            <button onClick={() => open()}>sort By Numbers All the posts</button>
            <button onClick={() => orderBy(`title`)}>sort by title to Only your posts</button>
            <button onClick={() => orderBy(`body`)}>sort by body to Only your posts</button>
            <div>
                <label htmlFor="searchTitle"> search title</label>
                <input type="text" name={"searchTitle"} onChange={byInput} />
            </div>
            <AddNewOne data={postsURL} setData={setPostsURL} userId={props.userId} open={open} types={"posts"} />
            <div>
                {postsURL.map((post, index) => (
                    <div >
                        <CurrentPost
                            key={index}
                            post={post}
                            setData={setPostsURL}
                            open={open}
                            types={"posts"}
                            currentName={currentName}
                            postId={props.userId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

}
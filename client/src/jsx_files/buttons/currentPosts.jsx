
import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import EditCurrent from "./editCurrent";
import DeleteOne from "./deleteOne";
import EditCurrentBody from "./editCurrentBody";
import Comments from "../comments";

export default function CurrentPost(props) {
    const [showBody, setShowBody] = useState(false);
    let showEdit=props.post.userId === props.postId;
    return (
        <div>
            <div key={props.key} className="post">
                <h3>
                    <p>{props.currentName.name}</p>
                    <p>{"user " + props.post.userId}</p>
                    <p>{"id " + props.post.id}</p></h3>
                <h2>{props.post.title}</h2>
                <button onClick={() => setShowBody(!showBody)}>{showBody ? "hide Body&comments" : "read Body&comments"}</button>
                <p style={{ display: showBody ? "block" : "none" }}>{props.post.body}</p>
                <div style={{ display: showEdit ? "block" : "none" }}>
                    <div style={{ width: '200px' }}>
                        <EditCurrent
                            data={props.post}
                            setData={props.setData}
                            open={props.open}
                            types={"posts"}
                        /></div>
                    <div style={{ width: '200px', display: showBody ? "block" : "none" }}>
                        <EditCurrentBody
                            data={props.post}
                            setData={props.setData}
                            open={props.open}
                            types={"posts"}
                        /></div>
                    <div style={{ width: '200px' }}>
                        <DeleteOne
                            data={props.post}
                            setData={props.setData}
                            open={props.open}
                            types={"posts"}
                            userId={props.post.userId}
                        /></div>

                </div>
                <div style={{ width: '200px', display: showBody ? "block" : "none" }}>
                    <Comments
                        userId={props.post.userId}
                        postId={props.post.id}
                        currentUser={props.postId}
                    />
                </div>
            </div>


        </div>
    )
}
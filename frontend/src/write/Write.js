import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import './Write.css'

function Write(){
    const history = useHistory();

    const [postThing, setPostThing] = useState({
        writer: '',
        password: '',
        title: '',
        content: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setPostThing((prevPosts) => {
            return {
              ...prevPosts,
              [name]: value
            };
          });
    }

    const postSubmitHandler = async event => {
        event.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/posts/writing`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: postThing.title,
                    writer: postThing.writer,
                    password: postThing.password,
                    content: postThing.content
                })
            });
            const responseData = await response.json();
            history.push('/')
            return responseData;
        } catch (err) { }
    }

    return (
        <div className="board-container">
            <div className="board-name-box">
                <h2 className="board-name">Board</h2>
            </div>
            <div className="write-frame">
                <form onSubmit={postSubmitHandler}>
                    <div className="write-writer">
                        <input 
                            className="writer-input" 
                            type="text" 
                            name="writer" 
                            value={postThing.writer} 
                            placeholder="작성자" 
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className="post-password">
                        <input className="password-input" type="password" name="password" value={postThing.password} placeholder="비밀번호" onChange={handleChange}></input>
                    </div>
                    <div className="post-title">
                        <input className="title-input" type="text" name="title" value={postThing.title} placeholder="제목" onChange={handleChange}></input>
                    </div>
                    <div className="post-content">
                        <textarea className="content-input" name="content" value={postThing.content} rows={35} cols={128} placeholder="내용" onChange={handleChange}></textarea>
                    </div>
                    <div className="post-regist">
                        <button className="regist-button" type="submit">등록</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Write;
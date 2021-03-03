import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";

const Update = (props) => {
    const history = useHistory();
    const pid = useParams().pid;

    const [updateThing, setUpdateThing] = useState(
        {
            title: "",
            content: ""
        }
    );

    useEffect(()=> {
        setUpdateThing({
            title: props.item.title,
            content: props.item.content
        });
    }, [props]);

    function handleChange(event) {
        const { name, value } = event.target;
        setUpdateThing((prevUpdateThings) => {
            return {
              ...prevUpdateThings,
              [name]: value
            };
        });
    }

    const clickUpdate = async event => {
        event.preventDefault();
            
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/posts/${pid}/update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: updateThing.title,
                    content: updateThing.content
                })
            });
            const responseData = await response.json();
            history.push(`/${pid}`);
            return responseData;
        } catch (err) { }
    }

    const clickCancel = event => {
        event.preventDefault();
        history.push(`/${pid}`);
    }

    return(
        <div className="board-container">
            <div className="board-name-box">
                <h2 className="board-name">{props.item.title}</h2>
            </div>
            <div className="write-frame">
                <form onSubmit={clickUpdate}>
                    <div className="write-writer">
                        <p>{props.item.writer}</p>
                    </div>
                    <div className="post-title">
                        <input 
                            className="title-input" 
                            type="text" 
                            name="title" 
                            value={updateThing.title}
                            placeholder="제목"
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className="post-content">
                        <textarea 
                            className="content-input" 
                            name="content" 
                            value={updateThing.content}
                            rows={35} cols={128}
                            placeholder="내용"
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className="post-regist">
                        <button className="regist-button">수정</button>
                        <button className="regist-button" onClick={clickCancel}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(Update);
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import './Post.css';

function  Post(props) {

    const history = useHistory();
    const pid = useParams().pid;
    
    const [ updateClicked, setUpdateClicked ] = useState(false); // update btn click
    const [ isDelete, setIsDelete ] = useState(false);
    const [ isModify, setIsModify ] = useState(false);
    const [ isSubmit, setIsSubmit ] = useState(false);

    const [ controllAuth, setControllAuth ] = useState( // pw input
        {
            pwAuth: ''
        }
    );
    
    const [ authClear, setAuthClear ] = useState(false); // pw auth

    const postDeletedHandler = async e => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/posts/${pid}`, {
                method: 'DELETE'
            });
            const responseData = await response.json();
            history.push('/')
            return responseData;
        } catch (err) { }
    };

    const modifyHandler = e => { // update or delete btn click handle
        e.preventDefault();
        setUpdateClicked(true);
        setIsModify(true);
    }

    const deleteHandler = e => {
        e.preventDefault();
        setUpdateClicked(true);
        setIsDelete(true);
    }

    const handleChange = e => { // pw input
        const { name, value } = e.target;
        setControllAuth((prevControllAuths) => {
            return {
              ...prevControllAuths,
              [name]: value
            };
          });
    }

    const authHander = async e => { // pw auth handle
        e.preventDefault();
        setIsSubmit(true);
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/posts/:pid`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: controllAuth.pwAuth
                })
            });
            const responseData = await response.json();
            if(responseData){
                setAuthClear(true);
            }else {
                alert("ID / PW가 다릅니다.");
            }
            return responseData;
        } catch (err) { }
    }

    return(
        <React.Fragment>
        <div className="board-container">
            <div className="board-name-box">
                <h2 className="board-name">{props.item.title}</h2>
            </div>
            <div className="post-frame">
                <div className="title-box">
                    <p>{props.item.title}</p>
                </div>
                <div className="writer-box">
                    <p className="post-writer">작성자 : {props.item.writer}</p>
                </div>
                <div className="content-box">
                    <pre>{props.item.content}</pre>
                </div>
                <div className="post-btn-box"> 
                {/* component로 수정하면 좋겠는데 */}
                    {updateClicked 
                    ?
                        isModify
                        ?
                        <div className="auth-input">
                            <input className="auth-pw" type="password" name="pwAuth" value={controllAuth.pwAuth} placeholder="비밀번호" onChange={handleChange}></input>
                            {/* auth state is true, then Link*/}
                            <button className="auth-button" onClick={authHander}>확인</button>
                            {/* auth ? link : error */}
                            {isSubmit
                                ?
                                authClear
                                    ?
                                    <Link to={`/${pid}/update`}><button>수정</button></Link>
                                    :
                                    <p></p>
                                :
                                <p></p>
                            }
                        </div>
                        :
                        <div className="auth-input">
                            <input className="auth-pw" type="password" name="pwAuth" value={controllAuth.pwAuth} placeholder="비밀번호" onChange={handleChange}></input>
                            {/* auth state is true, then Link*/}
                            <button className="auth-button" onClick={authHander}>확인</button>
                            {/* auth ? link : error */}
                            {isSubmit
                                ?
                                authClear
                                    ?
                                    <button onClick={postDeletedHandler}>삭제</button>
                                    :
                                    <p></p>
                                :
                                <p></p>
                            }
                        </div>
                    :
                        <div className="btn-div"> 
                            <button className="update-btn" onClick={modifyHandler}>수정</button>
                            <button className="delete-btn" onClick={deleteHandler}>삭제</button>
                        </div>
                    }
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}

export default React.memo(Post);

// if(updateClicked){
//     if(update){
//         if(pwinput){
//             link updatepage
//         }else {
//             alert
//         }
//     }else {
//         if(pwinput){
//             fetch delete
//         }else {
//             alert
//         }
//     }
// }else {
//     upd && del btn
// }

// {updateClicked
//     ?
//         isupdate
//         ?
//             pw
//             ?
//             <Link></Link>
//             :
//             alert
//         :
//             pw
//             ?
//             fetch
//             :
//             alert
//     :

// }
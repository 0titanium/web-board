import React, { useState, useEffect } from "react";
import {
    Link
  } from "react-router-dom";

import BoardHeader from "../components/BoardHeader";
import BoardList from "../components/BoardList";
import BoardFooter from "../components/BoardFooter";

import './Board.css';

function Board() {

    const [ loadedPosts, setLoadedPosts ] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(18);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/posts`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
                );
                const responseData = await response.json();
                setLoadedPosts(responseData.posts);
            } catch (err) {}
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const reversePosts = () => {
            setPosts(loadedPosts.reverse());
        };
        reversePosts();
    }, [loadedPosts]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <div className="board-container">
                <div className="board-name-box">
                    <h2 className="board-name">Board</h2>
                </div>
                <div className="button-div">
                    <Link to="/writing">
                        <button className="write-button">작성</button>
                    </Link>
                </div>
                <div className="board-frame">
                    <BoardHeader />
                    <BoardList item={currentPosts} />
                </div>
                <div className="board-page-box">
                    <BoardFooter 
                        postsPerPage={postsPerPage}
                        totalPosts={loadedPosts.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Board;
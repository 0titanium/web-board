import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Post from "../components/Post";

function  PostPage() {

    const pid = useParams().pid;
    const [loadedPost, setLoadedPost] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/posts/${pid}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
            );
            const responseData = await response.json();
            setLoadedPost(responseData.post);
        } catch (err) {}
        };
        fetchPost();
    }, []);

    useEffect(() => {
        const fetchPostView = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/posts/${pid}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' }
                });
                const responseData = await response.json();
                return responseData;
            } catch (err) { }
        };
        fetchPostView();
    }, []);

    return(
        <Post item={loadedPost}/>
    );
}

export default PostPage;
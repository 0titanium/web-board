import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Update from "../components/Update";

function UpdatePage() {

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

    return(
        <Update item={loadedPost} />
    );
};

export default UpdatePage;
import React, { Suspense } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Board from "./board/pages/Board";
// import Write from "./write/Write";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
// import PostPage from "./post/pages/PostPage";
// import UpdatePage from "./post/pages/UpdatePage";

const Write = React.lazy(() => import("./write/Write"));
const PostPage = React.lazy(() => import("./post/pages/PostPage"));
const UpdatePage = React.lazy(() => import("./post/pages/UpdatePage"));

function App(){

    return (
        <Router>
            <Header />
            <main>
            <Suspense fallback={<div><h1>Loading...</h1></div>}>
                <Switch>
                    <Route exact path="/">
                        <Board />
                    </Route>
                    <Route exact path="/writing">
                        <Write />
                    </Route>
                    <Route exact path="/:pid">
                        <PostPage />
                    </Route>
                    <Route path="/:pid/update">
                        <UpdatePage />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Suspense>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
import React from "react";

import "./BoardHeader.css";

function BoardHeader(){
    return (
        <div className="board-header">
            <div className="num">번호</div>
            <div className="title">제목</div>
            <div className="writer">글쓴이</div>
            <div className="writeDate">날짜</div>
            <div className="viewNum">조회수</div>
        </div>
        
    );
}

export default BoardHeader;
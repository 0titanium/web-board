import React from "react";

import ListItem from "./ListItem"

import './BoardList.css'

function BoardList(props) {

    if(!props.item){
        return(
            <div>
            </div>
        );
    }

    return (
        <div className="board-list">
            {props.item.map(item => (
                <ListItem 
                    key={item.id}
                    id={item.id}
                    num={item.num}
                    writer={item.writer} 
                    title={item.title}
                    date={item.date}
                    viewNum={item.viewNum}
                />
            ))}
        </div>
    );
}

export default React.memo(BoardList);
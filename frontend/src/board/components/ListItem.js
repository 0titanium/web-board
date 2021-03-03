import React from "react";
import {
    Link
  } from "react-router-dom";

import './ListItem.css';

function ListItem(props) {
    return (
        <div className="item">
            <div className="num"> {props.num} </div>
            <Link to={`/${props.id}`}>
                <div className="title">{props.title}</div>
            </Link>
            <div className="writer">{props.writer}</div>
            <div className="writeDate">{props.date}</div>
            <div className="viewNum">{props.viewNum}</div>
        </div>
    );
}

export default ListItem;
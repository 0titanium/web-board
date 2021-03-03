import React from 'react';

import './BoardeFooter.css'

function BoardFooter({ postsPerPage, totalPosts, paginate }) {
    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="page-nav">
        <ul className="page-ul">
            <li className="page-li" onClick={() => paginate(pageNumbers[0])}>&laquo;</li>
            {pageNumbers.map(number => (
            <li key={number} className="page-li" onClick={() => paginate(number)}>
                {number}
            </li>
            ))}
            <li className="page-li" onClick={() => paginate(pageNumbers[pageNumbers.length-1])}>&raquo;</li>
        </ul>
        </nav>
    );
}

export default BoardFooter;
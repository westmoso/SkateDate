import React from 'react';
import "./Header.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import ForumIcon from '@material-ui/icons/Forum';

function Header() {
    return (
        <div className='header'>
            <img className="header__logo"
                src="https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_960_720.png"
                alt="temp logo" />
            <IconButton>
                <AccountCircleIcon fontSize="large" className="header__icon" />
            </IconButton>
            <IconButton>
                <MapIcon fontSize="large" className="header__icon" />
            </IconButton>

            <IconButton>
                <ForumIcon fontSize="large" className="header__icon" />
            </IconButton>
        </div>
    )
}

export default Header

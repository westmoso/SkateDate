import React from 'react';
import "./Header.css";
import IconButton from '@material-ui/core/IconButton';
// import { HeaderMenu } from './HeaderMenu';
// import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';  //home icon
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'; //profile and account page (the account page will have log in and out for logging in and out)
import SearchIcon from '@material-ui/icons/Search'; //search skaters and places
import ExitToAppIcon from '@material-ui/icons/ExitToApp'; // sign up/log in
import MailOutlineIcon from '@material-ui/icons/MailOutline'; //messages

function Header() {


    return (
        <div className='header'>
            <IconButton path='/'>
                <HomeIcon fontSize="large" className="header__icon" />
            </IconButton>
            <IconButton>
                <PersonOutlineIcon fontSize="large" className="header__icon" />
            </IconButton>
            <IconButton>
                <SearchIcon fontSize="large" className="header__icon" />
            </IconButton>
            <IconButton>
                <ExitToAppIcon fontSize="large" className="header__icon" />
            </IconButton>
            <IconButton>
                <MailOutlineIcon fontSize="large" className="header__icon" />
            </IconButton>
            {/* {HeaderMenu.map((item, index) => {
                return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                );
            })} */}
        </div >
    )
}

export default Header
import React from 'react';
import "./SwipeButtons.css";
import IconButton from '@material-ui/core/IconButton';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import CloseIcon from '@material-ui/icons/Close'; //essentially swipe left
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded'; //message/invite
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded'; //view their profile

function SwipeButtons() {


    return (
        <div className='swipeButtons'>
            <IconButton className="swipeButtons__previous">
                <FastRewindIcon fontSize="large" className="header__icon" />
            </IconButton>
            <IconButton className="swipeButtons__reject">
                <CloseIcon fontSize="large" className="header__icon" />
            </IconButton>
            <IconButton className="swipeButtons__message">
                <ContactMailRoundedIcon fontSize="large" className="header__icon" />
            </IconButton>
            <IconButton className="swipeButtons__profile">
                <LoyaltyRoundedIcon fontSize="large" className="header__icon" />
            </IconButton>
        </div >
    )
}

export default SwipeButtons;

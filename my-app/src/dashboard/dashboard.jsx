import React from 'react';
import Axios from 'axios';
import './Dashboard.css';
import Modal from 'react-awesome-modal';
import Navbar from '../components/nav/navbar';
import SkaterCard from '../components/card/SkaterCard';
import openSocket from 'socket.io-client';


function Dashboard() {
    constructor(props){
        super(props);
        this.state={
            skater: [],
            visible : false,
            message: '',
            url: '',
            loggedSkater:{},
            blocked: []
        }
        this.loggedSkater={blocked: []};
        this.socket={};
    }
    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }
    
componentDidMount(){
        this.loggedSkater=this.props.location.state[0];
        this.setState({
            loggedSkater: this.loggedSkater
        })
        console.log('loggedSkater', this.loggedSkater);
        this.socket=openSocket('http://localhost:1234');
        console.log('socket id test', this.socket.id);
        this.socket.on('connection',()=>{
            console.log('socket id', this.socket.id);
            localStorage.setItem('socket', this.socket);
            this.socket.emit('login',{
                socketid: this.socket.id,
                email: this.state.loggedSkater.email
        });
            
        });

         this.socket.on('sendLike',(data)=>{
            console.log('sendLike event called  on frontend..', data);
            
            this.setState({
                message: data.message,
                url: ''
            });
            this.openModal();
        });

    return (
        <div>
            test
        </div>
    )
}

export default Dashboard

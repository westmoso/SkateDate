import React from 'react';
import Axios from 'axios';
import './Dashboard.css';
import Modal from 'react-awesome-modal';
import Navbar from '../components/nav/navbar';
import SkaterCard from '../components/card/SkaterCard';
import openSocket from 'socket.io-client';


export default class Dashboard extends React.Component() {
    constructor(props){
        super(props);
        this.state={
            skater: [],
            visible : false,
            message: '',
            url: '',
            loggedSkater:{},
        }
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
        this.socket=openSocket('http://localhost:3000');
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
            console.log('sent like on frontend..', data);
            
            this.setState({
                message: data.message,
                url: ''
            });
            this.openModal();
        });
        


    Axios('http://localhost:3000/api/getSkaters',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            withCredentials: true
            }).then(data=>{
                console.log('data', data.data);
                if(data.data.status==403){
                    console.log('unauth skater, redirecting..');
                    this.props.history.push('/');
                    localStorage.clear();
                }
                    else{
                        this.loggedSkater=data.data.content.filter(skater=>this.state.loggedSkater.email===skater.email)[0];
                        console.log('updated loggedSkater details', this.loggedSkater);
                        this.setState({
                            loggedSkater: this.loggedSkater
                        });

                        data.data.content=data.data.content.filter(skaterObject=>skaterObject.email!=this.loggedSkater.email);
                        console.log('modified data.data.content', data.data.content);
                        data.data.content.forEach(skater=>{
                                    
                        });
                        console.log('blocked array', this.state.blocked);
                        this.setState({
                            skaters: data.data.content,
                            blocked: this.state.blocked
                        });
                        console.log('skaters', this.state.skaters);
      
                    }
            });
    }

    return (
        <div>
            test
        </div>
    )
}

import React from 'react';
import Axios from 'axios';
import './Dashboard.css';
import Modal from 'react-awesome-modal';
import Navbar from '../components/nav/navbar';
import SkaterCard from '../components/card/SkaterCard';
import openSocket from 'socket.io-client';


export default class dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            skaters: [],
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
            console.log('sendLike event called  on frontend..', data);
            
            this.setState({
                message: data.message,
                url: ''
            });
            this.openModal();
        });

        this.socket.on('sendBlock',(data)=>{
            console.log('send Block event called  on frontend..', data);
            this.loggedSkater.blocked.push(data.blockedEmail);
            this.setState({
                message: data.message,
                loggedSkater: this.loggedSkater
            });
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
                if(data.data.status===403){
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

                        data.data.content=data.data.content.filter(skaterObject=>skaterObject.email!==this.loggedSkater.email);
                        console.log('modified data.data.content', data.data.content);
                        data.data.content.forEach(skater=>{
                                    
                        });
                        console.log('bloked array', this.state.blocked);
                        this.setState({
                            skaters: data.data.content,
                            blocked: this.state.blocked
                        });
                        console.log('skaters', this.state.skaters);
      
                    }
            });
    }
    render(){
        return (
            <div>
                <Navbar {...this.props}/>
               {
                   this.state.skaters.length!==0?(this.state.skaters.map((skater,index)=>{
                       return <SkaterCard  key={index} skater={skater} socket={this.socket} email={this.loggedSkater.email} loggedSkater={this.state.loggedSkater} src={this.state.loggedSkater.blocked.indexOf(skater.email)>=0?'https://cdn0.iconfinder.com/data/icons/uesrs-2/512/e27-512.png' : skater.profile_image_url}/>
                   })): <div>loading content....</div>
               }
                <section className="mx-auto my-auto" >
                <Modal visible={this.state.visible} width="800" height="auto" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 className="text-white">
                            {this.state.message}
                            </h1>
                        {this.state.url!==''? <img src={this.state.url}  style={{width: '20%', height: '20%', borderRadius: '50%'
                        }} className="image mx-auto" alt=""/>: <span></span>}
                       <br/><br/>
                        <a href="#top" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
            </div>
        )
    }
}
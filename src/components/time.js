import React, { Component } from 'react';
import '../styles/time.css';

export class Time extends Component {
    constructor(props) {
        super(props)
        let date = this.getTimeString()
        this.state = { time: date }
    }

    getTimeString() {

        var date = new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12:false});
        return date;
       
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let date = this.getTimeString();
            this.setState({
                time: date
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render() {

        return (
            <div className="time">
                <h1>{this.state.time}</h1>
                
            </div>
        )
    }
}

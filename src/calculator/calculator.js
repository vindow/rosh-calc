import React from 'react';
import Clipboard from 'react-clipboard.js';
import "./calculator.css";

export default class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            killTime: 0,
            expireTime: "",
            respawnMinTime: "",
            respawnMaxTime: "",
            heroWithAegis: "",
            submitted : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        if (e.target.id === "time") {
            let time = e.target.value.replace(':', "");
            let deathTime = parseInt(time, 10);
            this.setState({killTime: deathTime});
        } else {
            let hero = e.target.value;
            this.setState({heroWithAegis: hero});
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let newExpTime = this.createTimeString(this.state.killTime + 500)
        let newRespawnMinTime = this.createTimeString(this.state.killTime + 800);
        let newRespawnMaxTime = this.createTimeString(this.state.killTime + 1100);
        this.setState({
            expireTime: newExpTime,
            respawnMinTime: newRespawnMinTime,
            respawnMaxTime: newRespawnMaxTime,
            submitted: true
        });
    }

    createTimeString = (num) => {
        let stringNum = num.toString();
        return stringNum.slice(0, stringNum.length - 2) + ":" + stringNum.slice(stringNum.length - 2);
    }

    render() {
        const submitted = this.state.submitted;
        const textToCopy = this.state.heroWithAegis + " Aegis expires at " + this.state.expireTime + ". Roshan respawns between " + this.state.respawnMinTime + " and " + this.state.respawnMaxTime + ".";
        const copyStyle = {
            "background-color" : "#28a745",
            "color" : "#FFFFFF",
            "border-radius" : "0.25em",
            "border" : "0px",
            "padding" : "0.375rem 0.75rem",
            "margin" : "0 0.5em",
            "vertical-align" : "top"
        }
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="time" 
                            name="time" 
                            className="form-control"
                            placeholder="Roshan kill time (XX:XX or XXXX only)" 
                            onChange={this.handleChange} 
                            pattern="\d+:?\d{2}" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="pickedBy" 
                            name="pickedBy"
                            className="form-control"
                            placeholder="Aegis picked up by (Optional)" 
                            onChange={this.handleChange} 
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit"></input>
                </form>
                {submitted ? (
                    <div id="copyLine">
                        <span id="textToCopy">{textToCopy}</span>
                        <Clipboard style={copyStyle} data-clipboard-text={textToCopy}>Copy</Clipboard>
                    </div>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }
}
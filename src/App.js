import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import './App.css';
import "font-awesome/css/font-awesome.css"
var accurateInterval = require('accurate-interval');


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            time: 1500,
            session: 25, 
            break: 5,
            interval: ''
        };
        this.decrementTime = this.decrementTime.bind(this);
        this.displayTime = this.displayTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.reset = this.reset.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.updateBreak = this.updateBreak.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.updateTimerControls = this.updateTimerControls.bind(this);
    }
    decrementTime() {
        this.setState({
            time: this.state.time - 1
        });
    }
    displayTime() {
        let minutes = Math.floor(this.state.time / 60);
        let seconds = this.state.time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }
    reset() {
        this.setState({
            isActive: false,
            time: 1500,
            session: 25, 
            break: 5,
            interval: ''
        });
        this.state.interval && this.state.interval.cancel();
    }
    startTimer() {
        if (this.state.isActive) return;
        this.setState({
            isActive: true,
            interval: accurateInterval(() => {
                this.decrementTime();
            }, 1000)
        });
    }
    toggleActive() {
        this.setState({
            isActive: !this.state.isActive
        });
    }
    updateSession(e) {
        this.updateTimerControls('session', e.target.dataset.value);
    }
    updateBreak(e) {
        this.updateTimerControls('break', e.target.dataset.value);
    }
    updateTimerControls(timerCategory, value) {
        if (this.state.isActive) return;
        const num = value === '+' ? 1 : -1;
        this.setState({
            [timerCategory]: this.state[timerCategory] + num
        });
    }
     render() {
        return (
        <div>
            <Container className="App" fluid={true}>
                <Row className='row1'>
                    <Col className='clock'>
                        <Row className='timer' id='time-left'>
                            {this.displayTime()}
                        </Row>
                    </Col>
                </Row>
                <Row className='row2'>
                    <TimerControl name='Session Length' nameId='session-label' increment='session-increment' decrement='session-decrement' length='session-length' time={this.state.session} onClick={this.updateSession}/>
                    <Col>
                        <Row onClick={this.startTimer} className='circularButton' id='start_stop'>Start</Row>
                        <Row onClick={this.reset} className='circularButton' id='reset'>Reset</Row>
                    </Col>
                    <TimerControl name='Break Length' nameId='break-label' increment='break-increment' decrement='break-decrement' length='break-length' time={this.state.break} onClick={this.updateBreak}/>
                </Row>
            </Container>
        </div>
  );
}
}

const TimerControl = (props) => {
    return (
        <Col className='timerControl'>
            <Row id={props.nameId}>{props.name}</Row>
            <Row><i className="fa fa-arrow-up fa-2x" id={props.increment} data-value='+' onClick={props.onClick}/></Row>
            <Row id={props.length}>{props.time}</Row>
            <Row><i className="fa fa-arrow-down fa-2x" id={props.decrement} data-value='-' onClick={props.onClick}/></Row>
        </Col>
    )
}

// need a seconds to mm::ss function

export default App;

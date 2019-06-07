import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import './App.css';
var accurateInterval = require('accurate-interval');


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: true,
            time: 1500, 
            breakTime: 300,
            interval: ''
        };
        this.decrementTime = this.decrementTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.reset = this.reset.bind(this);
        this.timeToMMSS = this.timeToMMSS.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }
    startTimer() {
        this.setState({
            interval: accurateInterval(this.decrementTime, 1000)
        });
    }
    decrementTime() {
        this.setState({
            time: this.state.time - 1
        });
    }
    reset() {
        this.setState({
            interval: ''
        });
    }
    toggleActive() {
        this.setState({
            isActive: !this.state.isActive
        });
    }
    timeToMMSS() {
        let minutes = Math.floor(this.state.time / 60);
        let seconds = this.state.time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }
    render() {
        return (
        <div>
            <Container className="App" fluid={true}>
                <Row className='row1'>
                    <Col className='clock'>
                        <Row className='timer' id='time-left'>
                            {this.timeToMMSS()}
                        </Row>
                    </Col>
                </Row>
                <Row className='row2'>
                    <TimerControl name='Session Length' nameId='session-label' time='25:00'/>
                    <TimerControl name='Break Length' nameId='break-label' time='5:00'/>
                </Row>
            <div onClick={this.startTimer}>Start</div>
            <div onClick={this.reset}>Reset</div>
            </Container>
        </div>
  );
}
}

const TimerControl = (props) => {
    return (
        <Col className='TimerControl'>
            <Row id={props.nameId}>{props.name}</Row>
            <Row>Up arrow</Row>
            <Row>{props.time}</Row>
            <Row>Down Arrow</Row>
        </Col>
    )
}

// need a seconds to mm::ss function

export default App;

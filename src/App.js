import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            time: 1500, 
            breakTime: 300
        };
    }
    render() {
        return (
        <div>
            <Container className="App" fluid={true}>
                <Row className='row1'>
                    <Col className='clock'>
                        <Row className='timer'>
                            25:00
                        </Row>
                    </Col>
                </Row>
                <Row className='row2'>
                    <ControllerColumn name='Interval' time='25:00'/>
                    <ControllerColumn name='Break Time' time='5:00'/>
                </Row>
            </Container>
        </div>
  );
    }
}

const ControllerColumn = (props) => {
    return (
        <Col className='controllerColumn'>
            <Row>{props.name}</Row>
            <Row>Up arrow</Row>
            <Row>{props.time}</Row>
            <Row>Down Arrow</Row>
        </Col>
    )
}

// need a seconds to mm::ss function

export default App;

/* eslint-disable */
import React, {useState} from 'react'
import './App.css';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/js/popper.min.js';
import Data from './data.js';
import Detail from './Detail';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom'

function App() {

    let [shoes, shoes변경] = useState(Data);

  return (
    <div>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/detail'>Detail</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Switch>
            <Route exact path="/">
                <div className="background">
                    <h1>20% season Off</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <p>
                        <Button variant={"primary"}>Learn more</Button>
                    </p>
                </div>
                <div className="container">
                    <div className="row">
                        {
                            shoes.map((a,i) => {
                                return <Card shoes={shoes[i]} i={i}></Card>
                            })
                        }
                    </div>
                    <button className="btn btn-primary" onClick={()=>{
                        axios.get('https://codingapple1.github.io/shop/data2.json')
                            .then((result)=>{
                                shoes변경([...shoes, ...result.data])
                            })
                            .catch(()=>{
                                console.log('실패!!!!!!!!!');
                            })
                    }}>더보기</button>

                </div>
            </Route>

            <Route path="/detail/:id">
                <Detail shoes={shoes}></Detail>
            </Route>

            <Route path="/:id">
                <div>아무거나적으면 이게 나옴</div>
            </Route>
        </Switch>



    </div>
  );
}

function Card(props) {
    return (
        <div className="col-md-4">
            <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="100%" />
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content} </p>
            <h6>{props.shoes.price}</h6>
        </div>
    )
}



export default App;

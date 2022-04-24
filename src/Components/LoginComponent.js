import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { login, GetLoggedInUserData } from '../Services/DataService';

function LoginComponent() {

    let navigate = useNavigate();
   
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    
    const handleSubmit = async () => {
        let userData = {
            Username,
            Password
        }
        let token = await login(userData);
        if(token.token != null){
            localStorage.setItem("Token", token.token);
            GetLoggedInUserData(Username);
            navigate("/Dashboard");
        }
        // console.log(userData);
    }

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col md={9} className="mt-5" style={{ backgroundColor: 'gray', borderRadious: 5, padding: 50 }}>
                    <h1>Login</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={({ target }) => setUsername(target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={({ target: { value } }) => setPassword(value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                    <h5>Don't have an account?</h5>
                    <Button onClick={() => navigate("/CreateAccount")}>Create Account</Button>
                </Col>
            </Row>
        </Container>

        // Jesse's Layout of the Create account page
        // <Container fluid>
        //     <Row>
        //         <Col className="text-center mt-3" md={12}>
        //             <h1>Create An Account</h1>
        //         </Col>
        //     </Row>
        //     <Row className="d-flex justify-content-center">
        //         <Col md={5}>
        //             <Form>
        //                 <Form.Group className="mb-3" controlId="formBasicEmail" onChange={onChangeUsername}>
        //                     <Form.Label>Username</Form.Label>
        //                     <Form.Control type="text" placeholder="Username" />
        //                     <Form.Text className="text-muted">
        //                         Enter a username.
        //                     </Form.Text>
        //                 </Form.Group>

        //                 <Form.Group className="mb-3" controlId="formBasicPassword" onChange={onChangePassword}>
        //                     <Form.Label>Password</Form.Label>
        //                     <Form.Control type="password" placeholder="Password" />
        //                     <Form.Text className="text-muted">
        //                         Enter a password.
        //                     </Form.Text>
        //                 </Form.Group>
        //                 <Button variant="primary" type="submit" onClick={handleCreateAccount}>
        //                     Create An Account
        //                 </Button>
        //             </Form>
        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default LoginComponent
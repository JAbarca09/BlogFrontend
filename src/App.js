import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ViewBlogItemsComponent from './Components/ViewBlogItemsComponent';
import DashboardComponent from './Components/DashboardComponent';
import LoginComponent from './Components/LoginComponent';
import CreateAccountComponent from './Components/CreateAccountComponent';

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="p-0">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/" className="p-0">View Blog Items</Navbar.Brand>
            <Nav className="me-auto">
              {/* <Nav.Link href="/">View Blog Items</Nav.Link> */}
              <Nav.Item>
                <Nav.Link as={Link} to="/Dashboard" className="Links">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/Login" className="Links">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/CreateAccount" className="Links">Create Account</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
      </Container>
      <Routes>
        <Route path="/" element={<ViewBlogItemsComponent />} />
        <Route path="/Login" element={<LoginComponent />} />
        <Route path="/CreateAccount" element={<CreateAccountComponent />} />
        <Route path="/Dashboard" element={<DashboardComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

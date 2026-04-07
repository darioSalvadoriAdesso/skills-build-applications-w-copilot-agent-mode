import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

export default function App() {
  return (
    <div>
      <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="brand-name">
            <img src="/octofitapp-small.svg" alt="OctoFit" className="octo-logo" />
            <span>OctoFit Tracker</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/activities">Activities</Nav.Link>
            <Nav.Link as={NavLink} to="/workouts">Workouts</Nav.Link>
            <Nav.Link as={NavLink} to="/teams">Teams</Nav.Link>
            <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
            <Nav.Link as={NavLink} to="/leaderboard">Leaderboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/" element={<div className="page-title"><h3>Welcome to OctoFit Tracker</h3><p className="text-muted">Use the navigation to explore activities, workouts, teams and users.</p></div>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Container>
    </div>
  );
}

import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import RedditLogo from 'assets/reddit.svg'
import { useHistory } from 'react-router-dom'

export default function Header (props) {
  const { subName } = props
  let history = useHistory();

  const home = () => {
    history.push('/')
  }
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="mx-2 d-flex">
        <img className="reddit-logo mx-1" src={RedditLogo} alt='Reddit Logo' />
        <div className="align-self-center">Reddit</div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={home}>r/{subName}</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2}>
            u/username
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
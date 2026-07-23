import React from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import heroImg from '../assets/hero.png'

export default function Home({ onNavigate = () => {} }) {
  return (
    <header className="hero-section home-section d-flex align-items-center">
      <Container className="h-100 d-flex align-items-center">
        <Row className="align-items-center w-100">
          <Col md={6} className="text-md-start text-center">
            <h1 className="display-5"><strong>Protecting systems. Securing futures.</strong></h1>
            <p className="lead home-lead">I'm Gabriele Trainiti, a cybersecurity expert focusing on secure designs, reverse engineering, and incident response. I help organizations improve resilience and reduce risk.</p>
            <div className="mt-4">
              <Button onClick={() => onNavigate('contact')} variant="primary" className="me-2">Work with me</Button>
              <Button onClick={() => onNavigate('blog')} variant="outline-light">Read my blog</Button>
            </div>
          </Col>
          <Col md={6} className="mt-4 mt-md-0 text-center">
            <Image src={heroImg} alt="cybersecurity hero" fluid rounded className="hero-image" />
          </Col>
        </Row>
      </Container>
    </header>
  )
}


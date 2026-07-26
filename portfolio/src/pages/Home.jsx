import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Home({ onNavigate = () => {} }) {
  return (
    <header className="hero-section home-section d-flex align-items-center">
      <Container className="h-100 d-flex align-items-center">
        <Row className="align-items-center w-100">
          <Col md={6} className="text-md-start text-center">
            <h1 className="display-5"><strong>Protecting systems. Securing futures.</strong></h1>
            <p className="lead home-lead">I'm Gabriele, a cybersecurity expert focusing on secure designs, reverse engineering, and incident response. I help organizations improve resilience and reduce risk.</p>
            <div className="mt-4">
              <Button onClick={() => onNavigate('contact')} variant="primary" className="me-2">Work with me</Button>
              <Button onClick={() => onNavigate('works')} variant="outline-light">Read my works</Button>
            </div>
          </Col>
          <Col md={6} className="mt-4 mt-md-0 d-flex justify-content-end">
            <div className="hot-topic-box">
              <h2 className="text-uppercase text-center text-muted">🔥HOT TOPIC🔥</h2>
              <p className="mb-0 mt-2">The European Parliament has recently approved the Chat Control Act, a dangerous attack on the privacy and digital rights of EU citizens. Mass surveillance must not become the price of living in a free society.
                I urge you to <a
                    href="https://fightchatcontrol.eu/"
                    target="_blank"
                    rel="noreferrer"
                    className="paper-read-link"
                >learn more, speak out, and defend your right</a> to private communication before it is too late.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  )
}


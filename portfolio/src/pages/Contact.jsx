import React from 'react'
import { Container, Row, Col, Button, Card, ListGroup, Badge } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Contact() {
  return (
    <section id="contact" className="py-5 contact-section page-section d-flex align-items-center">
      <Container className="h-100 d-flex align-items-center">
        <Row className="w-100 g-4 align-items-stretch">
          <Col lg={5} className="d-flex">
            <Card className="w-100 shadow-sm border-0 bg-dark text-light">
              <Card.Body className="p-4 p-md-5 d-flex flex-column justify-content-between">
                <div>
                  <Badge bg="light" text="dark" className="mb-3">Available for consultancy</Badge>
                  <h2 tabIndex={-1} className="mb-3 text-light">Contact me</h2>
                  <p className="section-text mb-0">
                    If you need support with incident response, cloud security, risk assessments or secure architecture, reach out.
                    I usually reply quickly.
                  </p>
                </div>

                <div className="mt-4 d-grid gap-2">
                  <Button href="mailto:gabriele.trainiti@proton.me" variant="light" className="fw-semibold">
                    <i className="bi bi-envelope-at-fill me-2"></i>
                    Send an email
                  </Button>
                  <Button
                    href="https://github.com/gabri1212"
                    target="_blank"
                    rel="noreferrer"
                    variant="outline-light"
                    className="fw-semibold"
                  >
                    <i className="bi bi-github me-2"></i>
                    GitHub profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7} className="d-flex">
            <Card className="w-100 shadow-sm border-0 bg-body-tertiary">
              <Card.Body className="p-4 p-md-5">
                <h3 className="mb-3">Quick links</h3>
                <ListGroup variant="flush" className="rounded-3 overflow-hidden">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent text-light border-0 px-0 py-3">
                    <span><i className="bi bi-envelope me-2"></i>Email</span>
                    <a className="link-light text-decoration-none" href="mailto:gabriele.trainiti@proton.me">gabriele.trainiti@proton.me</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent text-light border-0 px-0 py-3">
                    <span><i className="bi bi-github me-2"></i>GitHub</span>
                    <a className="link-light text-decoration-none" href="https://github.com/gabri1212" target="_blank" rel="noreferrer">github.com/gabri1212</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent text-light border-0 px-0 py-3">
                    <span><i className="bi bi-telegram me-2"></i>Telegram</span>
                    <a className="link-light text-decoration-none" href="https://t.me/gabri1212" target="_blank" rel="noreferrer">@gabri1212</a>
                  </ListGroup.Item>
                </ListGroup>

                <div className="mt-4 p-3 rounded-3 bg-dark bg-opacity-25">
                  <p className="mb-0 section-text">
                    Need an even faster reply? DM me on Telegram!
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}


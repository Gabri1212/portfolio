import React from 'react'
import { Container, Row, Col, Button, Badge } from 'react-bootstrap'

export default function About({ onNavigate = () => {} }) {
  return (
    <section className="py-5 about-section page-section d-flex align-items-center">
      <Container className="h-100 d-flex align-items-center">
        <Row className="w-100 align-items-center g-5">
          <Col lg={6}>
            <Badge bg="light" text="dark" className="mb-3 px-3 py-2 rounded-pill about-badge">
              Cybersecurity specialist
            </Badge>

            <h2 tabIndex={-1} className="about-title mb-3">
              Who am I
            </h2>

            <p className="about-intro mb-4">
              I like security that feels clear and simple. The kind that helps people move faster instead of slowing them down.
            </p>

            <p className="section-text about-copy mb-4">
              I graduated in computer engineering (bachelor) and cybersecurity engineering (master) at Politecnico di Torino in Italy.
            </p>
            <p className="section-text about-copy mb-4">
              I can fluently speak italian and english. Currently working on japanese and german.
            </p>

            <p className="section-text about-copy mb-4">
              I enjoy playing the piano and the guitar, but my favorite hobby is playing videogames with friends
            </p>

            <div className="about-mini-grid mb-4">
              <div className="about-mini-item">
                <span className="about-mini-value">10+</span>
                <span className="about-mini-label">years in IT</span>
              </div>
              <div className="about-mini-item">
                <span className="about-mini-value">4</span>
                <span className="about-mini-label">main focus areas</span>
              </div>
              <div className="about-mini-item">
                <span className="about-mini-value">∞</span>
                <span className="about-mini-label">curiosity for improvement</span>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Button onClick={() => onNavigate('contact')} variant="primary" className="fw-semibold">
                Contact me
              </Button>
              <Button onClick={() => onNavigate('blog')} variant="outline-light" className="fw-semibold">
                Read the blog
              </Button>
              <Button
                href="https://github.com/gabri1212"
                target="_blank"
                rel="noreferrer"
                variant="outline-light"
                className="fw-semibold"
              >
                GitHub
              </Button>
            </div>
          </Col>

          <Col lg={6}>
            <div className="about-rail p-4 p-md-5 rounded-4">
              <div className="about-quote mb-4">
                “Security should feel like a strength multiplier, not a roadblock.”
              </div>

              <div className="about-sections">
                <div className="about-item">
                  <span className="about-label">Threat modeling</span>
                  <span className="about-text">Find the risks early and make better decisions before issues become expensive.</span>
                </div>
                <div className="about-item">
                  <span className="about-label">Secure Design</span>
                  <span className="about-text">Bake security into the workflow so teams can ship with confidence.</span>
                </div>
                <div className="about-item">
                  <span className="about-label">Cloud security</span>
                  <span className="about-text">Protect identities, services and deployments in modern cloud environments.</span>
                </div>
                <div className="about-item">
                  <span className="about-label">Incident response</span>
                  <span className="about-text">Prepare, detect, contain and recover with clear playbooks and calm execution.</span>
                </div>
              </div>

              <div className="about-footer mt-4 pt-4">
                <p className="section-text mb-3">
                  Want a deeper dive into how I think about security? Start with the blog or send me a message.
                </p>
                <Button onClick={() => onNavigate('contact')} variant="light" className="fw-semibold">
                  Let's talk
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}




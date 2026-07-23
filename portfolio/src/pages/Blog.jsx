import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

export default function Blog() {

  return (
    <section className="py-5 blog-section page-section d-flex align-items-center">
      <Container className="h-100 d-flex align-items-center">
        <Row className="w-100">
          <Col md={8} className="mx-auto">
            <h2 tabIndex={-1} className="text-center">Blog</h2>

            <Row className="g-3">
                <Col key="1" md={12}>
                  <article className="card">
                    <div className="card-body">
                      <h5>Title</h5>
                      <small className="text-muted">Date</small>
                      <p className="mt-2">Content</p>
                    </div>
                  </article>
                </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}


import { Card, Button, Badge } from 'react-bootstrap'
import { Download, Eye } from 'react-bootstrap-icons'

export default function PaperCard({ title, date, abstract, preview, path }) {
  return (
    <Card className="shadow-sm border-0 overflow-hidden rounded-3 hover-shadow transition-all">
      <div className="row g-0">
        {preview && (
          <div className="col-md-3 col-lg-2 bg-light d-flex align-items-center justify-content-center p-1">
            <img
              src={preview}
              alt={`${title} preview`}
              className="img-fluid rounded shadow-sm object-fit-contain"
              style={{ maxHeight: '180px' }}
            />
          </div>
        )}

        <div className={preview ? "col-md-9 col-lg-10" : "col-12"}>
          <Card.Body className="d-flex flex-column h-100 p-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title as="h3" className="h5 mb-0 fw-bold text-primary">
                {title}
              </Card.Title>
              <Badge bg="secondary" className="fw-normal px-2 py-1 fs-7">
                {date}
              </Badge>
            </div>

            <Card.Text className="text-muted flex-grow-1 small lh-base mb-3">
              {abstract}
            </Card.Text>

            <div className="d-flex gap-2 pt-2 border-top">
              <Button
                variant="outline-primary"
                size="sm"
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-1"
              >
                <Eye size={16} /> View PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                href={path}
                download
                className="d-flex align-items-center gap-1"
              >
                <Download size={16} /> Download
              </Button>
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  )
}

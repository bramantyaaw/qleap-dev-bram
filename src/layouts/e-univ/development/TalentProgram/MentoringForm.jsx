import React from "react";
import { TalentProgram } from "./TalentProgram";
import { Button, Card, Form } from "react-bootstrap";

const MentoringForm = () => {
  return (
    <>
      <TalentProgram>
        <Card>
          <Card.Header>
            <h4 className="display-7 fw-bold">Form Mentoring for Mentee</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold"> Specific </span>
                  <span className="text-secondary">
                    Improvement : Pengembangan seperti apa yang ingin
                    diperbaiki?
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold">Measurable </span>
                  <span className="text-secondary">
                    Outcomes : Hasil speerti apa yang diharapkan?
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold"> Actionable </span>
                  <span className="text-secondary">
                    Project Activity : Action apa saja yang diperlukan untuk
                    pengembangan tersebut?
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold"> Reliable </span>
                  <span className="text-secondary">
                    Impact : Action apa saja yang diperlukan untuk pengembangan
                    tersebut?
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold"> Time Based </span>
                  <span className="text-secondary">
                    Waktu yang diperlukan untuk mencapai goal tersebut
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        <Card className="my-4">
          <Card.Header>
            <h4 className="display-7 fw-bold">Set PDCA</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold"> Plan </span>
                  <span className="text-secondary">
                    Rencana seperti apakah untuk memberikan improvement terhadap
                    goals di inginkan?
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold">Do </span>
                  <span className="text-secondary">
                    Bagaimana cara mengeksekusi dari plan yang sudah dibuat?
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold"> Check </span>
                  <span className="text-secondary">
                    Apakah realisasi dari plan sudah berjalan sesuai dengan yang
                    dinginkan (Evaluation)
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold"> Action </span>
                  <span className="text-secondary">
                    Alternatif apa jika plan yang dibuat belum memenuhi
                    ekspetasi ? atau bisa melanjutkan plan jika sudah berhasil ?
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="fw-bold"> Time Based </span>
                  <span className="text-secondary">
                    Waktu yang diperlukan untuk mencapai goal tersebut
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-1"
                  placeholder="Tuliskan penjelasan anda disini"
                />
                <span className="fs-6">Maks 500 karakter</span>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <div className="d-flex align-items-end justify-content-end">
          <Button variant="primary" size="sm">
            Submit
          </Button>
        </div>
      </TalentProgram>
    </>
  );
};

export default MentoringForm;

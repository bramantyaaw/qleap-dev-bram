import React, { useState } from "react";
import { Col, Card, Row, Form, Button } from "react-bootstrap";
import TextForm from "../../components/components/dashboard/ticketing/elements/text/TextForm";
import DisabledInput from "../../components/components/dashboard/ticketing/elements/input/DisabledInput";
import IssueDropdown from "../../components/components/dashboard/ticketing/elements/dropdown/IssueDropdown";
import SignaturePreview from "../../components/components/dashboard/ticketing/signature/SignaturePreview";
import PreviewFile from "../../components/components/dashboard/ticketing/elements/modal/PreviewFile";
import ImgPerkawinan from "../../assets/images/svg/akta-perkawinan.svg";
import ImgKK from "../../assets/images/svg/kartu-keluarga.svg";
import ViewFileClick from "../../components/components/dashboard/ticketing/elements/input/ViewFileClick";

const DetailPengajuan = ({ className }) => {
  const [show, setShow] = useState(false);
  const [kk, setKK] = useState(false);

  return (
    <Card className={`${className} border-0 me-0 me-md-4`}>
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">Detail Pengajuan</h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form.Group className="d-sm-flex w-100 ">
              <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
                <TextForm text="Jenis Tunjangan" />
                <IssueDropdown
                  disable="true"
                  defaultValue="Sukacita Pernikahan Pertama"
                />
              </Form.Group>
              <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
                <TextForm text="ID Pengajuan" />
                <DisabledInput
                  type="text"
                  placeholder="#100010001"
                  value="#100010001"
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="d-sm-flex w-100 ">
              <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
                <TextForm text="Tanggal Kejadian" />
                <DisabledInput
                  type="text"
                  placeholder="22/02/2023"
                  value="22/02/2023"
                />
              </Form.Group>
              <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
                <TextForm text="Tanggal Submit" />
                <DisabledInput
                  type="text"
                  placeholder="25/02/2023"
                  value="25/02/2023"
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="d-sm-flex w-100">
              <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
                <TextForm htmlFor="employee-nik" text="Nama Bank" />
                <DisabledInput
                  type="text"
                  placeholder="123456789123"
                  value="123456789123"
                  id="bank-account"
                  name="bank-account"
                />
              </Form.Group>
              <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
                <TextForm text="Nama Rekening" />
                <DisabledInput
                  type="text"
                  placeholder="Bank Central Asia"
                  value="Bank Central Asia"
                  id="bank-name"
                  name="bank-name"
                />
              </Form.Group>
              <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
                <TextForm text="Pemilik Rekening" />
                <DisabledInput
                  type="text"
                  placeholder="Albertus Haryo S"
                  value="Albertus Haryo S"
                  id="bank-owner"
                  name="bank-owner"
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="w-100 mb-3">
              <ViewFileClick
                text="Foto Akta Kelahiran"
                setShow={setShow}
                placeholder="Akta Perkawinan.jpg"
                value="Akta Perkawinan.jpg"
                className="preview-file-btn"
              />
            </Form.Group>
            <Form.Group className="w-100 mb-3">
              <TextForm text="Foto Kartu Keluarga" />
              <Form.Group className="d-flex preview-file-btn">
                <Button onClick={() => setKK(true)}>Lihat File</Button>
                <DisabledInput
                  type="text"
                  placeholder="Kartu Keluarga.jpg"
                  value="Kartu Keluarga.jpg"
                />
              </Form.Group>
            </Form.Group>
            <SignaturePreview />
            <Form.Group className="mt-3 d-flex justify-content-end">
              <Button variant="secondary" className="me-1" disabled>
                Edit & Change
              </Button>
              <Button variant="secondary" disabled>
                Save
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
      <PreviewFile setShow={setShow} show={show} src={ImgPerkawinan} />
      <PreviewFile setShow={setKK} show={kk} src={ImgKK} />
    </Card>
  );
};

export default DetailPengajuan;

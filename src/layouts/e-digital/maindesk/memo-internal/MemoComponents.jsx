import React, {Fragment} from 'react'
import { Breadcrumb, Col, Row } from "react-bootstrap";
import MemoList from './MemoList';
import { Link } from "react-router-dom";

export default function MemoComponents() {
  return (
    <>
      <Fragment>
        <Row>
          <Col>
            <div className="border-bottom pb-2 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Memo Internal</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">Main Desk</Breadcrumb.Item>
                  <Breadcrumb.Item active>Memo Internal</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <Link
                  to="/main-desk/memo-internal/create"
                  className="btn btn-primary btn-sm rounded-3 w-100"

                >
                  Add Memo
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Fragment>

      <MemoList />
    </>
  );
}

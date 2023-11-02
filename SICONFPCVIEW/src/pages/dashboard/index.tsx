'use client';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { Col, Row } from 'antd';

export default function Dashboard() {
  const auth = useAuth();

  return (
    <>
      <Row>
        <Col>
          <h1></h1>
        </Col>
      </Row>
    </>
  );
}

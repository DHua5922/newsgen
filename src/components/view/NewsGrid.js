import { News } from './News';
import { Container, Row, Col } from 'react-bootstrap';

export default function NewsGrid({ list }) {
  return (
    <Container fluid>
      <Row>
        { 
          list.map((news, index) => 
            <Col key={index} 
              sm={12} md={6} 
              lg={4} xl={3}>
                <News {...news} />
            </Col>)
        }
      </Row>
    </Container>
  );
}
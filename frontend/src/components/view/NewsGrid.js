import { News } from './News';
import { Row, Col } from 'react-bootstrap';
import tw from "twin.macro";

const TCol = tw(Col)`pb-8`;

export default function NewsGrid({ list }) {
  return (
    <Row>
      { 
        list.map((news, index) => 
          <TCol key={index} 
            sm={12} md={6} 
            lg={4} xl={3}>
              <News {...news} />
          </TCol>)
      }
    </Row>
  );
}
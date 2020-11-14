import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectSections } from '../../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import { StyledTable } from './sections_table.styles';
import { Container, Row, Col, Table } from 'react-bootstrap';

const SectionsTable = ({ sections }) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Table striped bordered>
              <tbody>
                <tr>
                  <th>Раздел</th>
                  <th>Количество безработных</th>
                </tr>
                {sections.map((s) => {
                  return (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>
                        {(() => {
                          let cnt = 0;
                          for (let i = 0; i < s.joblesses.length; i++) {
                            cnt += s.joblesses[i].number;
                          }
                          return cnt;
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  sections: selectSections,
});
export default connect(mapStateToProps, null)(SectionsTable);

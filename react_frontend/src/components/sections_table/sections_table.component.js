import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectSections } from '../../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import { StyledTable, StyledLink } from './sections_table.styles';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const SectionsTable = ({ history, sections }) => {
  useEffect(() => {
    console.log('changed');
  });
  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>Раздел</th>
          <th>Количество безработных</th>
          <th>Количество вакансий</th>
        </tr>
        {sections.map((s) => {
          return (
            <tr key={s.id}>
              <td>
                <StyledLink onClick={() => history.push(`/section/${s.id}`)}>
                  {s.name}
                </StyledLink>
              </td>
              <td>
                {(() => {
                  let cnt = 0;
                  for (let i = 0; i < s.joblesses.length; i++) {
                    cnt += s.joblesses[i].number;
                  }
                  return cnt;
                })()}
              </td>
              <td>
                {(() => {
                  let cnt = 0;
                  for (let i = 0; i < s.vacancies.length; i++) {
                    cnt += s.vacancies[i].number;
                  }
                  return cnt;
                })()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
const mapStateToProps = createStructuredSelector({
  sections: selectSections,
});
export default connect(mapStateToProps, null)(withRouter(SectionsTable));

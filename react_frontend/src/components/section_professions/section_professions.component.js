import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  selectProfessions,
  selectSection,
} from '../../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import { StyledTable, StyledLink } from './section_professions.styles';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const SectionProfessions = ({ history, section, professions }) => {
  useEffect(() => {
    console.log('changed');
  });
  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>Профессия</th>
          <th>Количество вакансий</th>
          <th>Количество безработных</th>
        </tr>
        {professions.map((p) => {
          return (
            <tr key={p.id}>
              <td>
                <StyledLink onClick={() => history.push(`/profession/${p.id}`)}>
                  {p.name}
                </StyledLink>
              </td>
              <td>
                {(() => {
                  if (section) {
                    for (let i = 0; i < section.vacancies.length; i++) {
                      if (section.vacancies[i].profession.id == p.id) {
                        return section.vacancies[i].number;
                      }
                    }
                  }
                })()}
              </td>
              <td>
                {(() => {
                  if (section) {
                    for (let i = 0; i < section.joblesses.length; i++) {
                      if (section.joblesses[i].profession.id == p.id) {
                        return section.joblesses[i].number;
                      }
                    }
                  }
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
  section: selectSection,
  professions: selectProfessions,
});
export default connect(mapStateToProps, null)(withRouter(SectionProfessions));

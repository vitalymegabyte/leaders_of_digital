import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  selectProfession,
  selectSections,
} from '../../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import { StyledTable, StyledLink } from './profession_sections.styles';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const SectionProfessions = ({ history, sections, profession }) => {
  useEffect(() => {
    console.log('changed');
  });
  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>Раздел</th>
          <th>Количество вакансий</th>
          <th>Количество безработных</th>
        </tr>
        {sections.map((s) => {
          let jobless_count = 0;
          let vacancy_count = 0;

          if (profession) {
            for (let i = 0; i < s.vacancies.length; i++) {
              if (s.vacancies[i].profession.id == profession.id) {
                vacancy_count = s.vacancies[i].number;
              }
            }
            for (let i = 0; i < s.joblesses.length; i++) {
              if (s.joblesses[i].profession.id == profession.id) {
                jobless_count = s.joblesses[i].number;
              }
            }
          }
          if (jobless_count != 0 || vacancy_count != 0) {
            return (
              <tr key={s.id}>
                <td>
                  <StyledLink onClick={() => history.push(`/section/${s.id}`)}>
                    {s.name}
                  </StyledLink>
                </td>
                <td>{vacancy_count}</td>
                <td>{jobless_count}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </StyledTable>
  );
};
const mapStateToProps = createStructuredSelector({
  sections: selectSections,
  profession: selectProfession,
});
export default connect(mapStateToProps, null)(withRouter(SectionProfessions));

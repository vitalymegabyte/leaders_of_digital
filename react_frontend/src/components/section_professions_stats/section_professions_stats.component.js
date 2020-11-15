import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  selectProfessions,
  selectSections,
} from '../../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { RadialChart, DiscreteColorLegend } from 'react-vis';

const SectionProfessionsStats = ({ history, professions, sections }) => {
  const [joblessData, setJoblessData] = useState([]);
  const [vacanciesData, setVacanciesData] = useState([]);

  useEffect(() => {
    console.log('changed');
  });
  /*useEffect(() => {
    let joblessData = professions.map((s) => {
      let cnt = 0;
      for (let i = 0; i < s.joblesses.length; i++) {
        cnt += s.joblesses[i].number;
      }
      return { angle: cnt, label: `${s.name} - ${cnt}` };
    });
    joblessData.sort((a, b) => {
      return a.angle < b.angle;
    });
    let otherAngle = 0;
    let elements = joblessData.length / 2;
    for (let i = 0; i < elements; i++) {
      otherAngle += joblessData[0].angle;
      console.log(i);
      joblessData.splice(0, 1);
    }
    joblessData.push({ angle: otherAngle, label: `Другое - ${otherAngle}` });
    setJoblessData(joblessData);
  }, [professions, setJoblessData]);

  useEffect(() => {
    let vacanciesData = professions.map((s) => {
      let cnt = 0;
      for (let i = 0; i < s.vacancies.length; i++) {
        cnt += s.vacancies[i].number;
      }
      return { angle: cnt, label: `${s.name} - ${cnt}` };
    });
    vacanciesData.sort((a, b) => {
      return a.angle < b.angle;
    });
    let otherAngle = 0;
    let elements = vacanciesData.length / 2;
    for (let i = 0; i < elements; i++) {
      otherAngle += vacanciesData[0].angle;
      vacanciesData.splice(0, 1);
    }
    vacanciesData.push({ angle: otherAngle, label: `Другое - ${otherAngle}` });
    setVacanciesData(vacanciesData);
  }, [professions, setVacanciesData]);
*/
  return (
    <Container>
      <h2>Статистика по профессиям</h2>
      <Row>
        <Col>
          <h3>Безработица</h3>
          <RadialChart data={joblessData} width={300} height={300} />
          <DiscreteColorLegend items={joblessData.map((d) => d.label)} />
        </Col>
        <Col>
          <h3>Вакансии</h3>
          <RadialChart data={vacanciesData} width={300} height={300} />
          <DiscreteColorLegend items={vacanciesData.map((d) => d.label)} />
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = createStructuredSelector({
  professions: selectProfessions,
  sections: selectSections,
});
export default connect(
  mapStateToProps,
  null
)(withRouter(SectionProfessionsStats));

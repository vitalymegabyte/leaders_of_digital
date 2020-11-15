import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  selectProfession,
  selectSections,
} from '../../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { RadialChart, DiscreteColorLegend } from 'react-vis';

const ProfessionSectionStats = ({ history, sections, profession }) => {
  const [joblessData, setJoblessData] = useState([]);
  const [vacanciesData, setVacanciesData] = useState([]);

  useEffect(() => {
    console.log('changed');
  });
  useEffect(() => {
    let joblessData = sections.map((s) => {
      let cnt = 0;
      for (let i = 0; i < s.joblesses.length; i++) {
        if (s.joblesses[i].profession.id == profession.id)
          cnt += s.joblesses[i].number;
      }
      return { angle: cnt, label: `${s.name} - ${cnt}` };
    });
    joblessData.sort((a, b) => {
      if (a.angle > b.angle) return 1;
      else return -1;
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
  }, [sections, setJoblessData, profession]);

  useEffect(() => {
    let vacanciesData = sections.map((s) => {
      let cnt = 0;
      for (let i = 0; i < s.vacancies.length; i++) {
        if (s.vacancies[i].profession.id == profession.id)
          cnt += s.vacancies[i].number;
      }
      return { angle: cnt, label: `${s.name} - ${cnt}` };
    });
    vacanciesData.sort((a, b) => {
      if (a.angle > b.angle) return 1;
      else return -1;
    });
    let otherAngle = 0;
    let elements = vacanciesData.length / 2;
    for (let i = 0; i < elements; i++) {
      otherAngle += vacanciesData[0].angle;
      vacanciesData.splice(0, 1);
    }
    vacanciesData.push({ angle: otherAngle, label: `Другое - ${otherAngle}` });
    setVacanciesData(vacanciesData);
  }, [sections, setVacanciesData, profession]);

  return (
    <Container>
      <h2>Статистика по профессии {profession ? profession.name : ''}</h2>
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
  sections: selectSections,
  profession: selectProfession,
});
export default connect(
  mapStateToProps,
  null
)(withRouter(ProfessionSectionStats));

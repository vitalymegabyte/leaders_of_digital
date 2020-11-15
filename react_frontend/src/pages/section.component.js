import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setSections,
  setProfessions,
} from '../redux/sections/sections.actions';
import { selectSection } from '../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import SectionProfessions from '../components/section_professions/section_professions.component';
import SectionProfessionStats from '../components/section_professions_stats/section_professions_stats.component';
import { Tab, Tabs, Container } from 'react-bootstrap';

const SectionPage = ({ match, section, setSections, setProfessions }) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASEURL}/section`)
      .then((response) => {
        console.log(response.data);
        setSections(response.data);
      });
  }, [setSections]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/professions?section_id=${match.params.sectionId}`
      )
      .then((response) => {
        console.log(response.data);
        setProfessions(response.data);
      });
  }, [setProfessions]);
  return (
    <>
      <Container>
        <Tabs defaultActiveKey='data'>
          <Tab eventKey='data' title='Данные'>
            <h2>Профессии раздела "{section ? section.name : ''}"</h2>
            <SectionProfessions match={match} />
          </Tab>
          <Tab eventKey='stats' title='Статистика'>
            <SectionProfessionStats match={match} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  section: selectSection,
});

const mapDispatchToProps = (dispatch) => ({
  setSections: (sections) => dispatch(setSections(sections)),
  setProfessions: (professions) => dispatch(setProfessions(professions)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SectionPage);

import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setSections,
  setProfessions,
} from '../redux/sections/sections.actions';
import {
  selectProfession,
  selectSections,
} from '../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import ProfessionSections from '../components/profession_sections/profession_sections.component';
import { Tab, Tabs, Container } from 'react-bootstrap';
import ProfessionSectionStats from '../components/profession_sections_stats/profession_section_stats.component';

const ProfessionPage = ({
  match,
  sections,
  setSections,
  setProfessions,
  profession,
}) => {
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
      .get(`${process.env.REACT_APP_BACKEND_BASEURL}/professions`)
      .then((response) => {
        console.log(response.data);
        setProfessions(response.data);
      });
  }, [setProfessions]);
  return (
    <>
      <Container>
        <Tabs defaultActiveKey='data' id='uncontrolled-tab-example'>
          <Tab eventKey='data' title='Данные'>
            <h2>
              Данные о потребностях и ресурсах профессии{' '}
              {profession ? profession.name : ''}
            </h2>
            <ProfessionSections match={match} />
          </Tab>
          <Tab eventKey='stats' title='Статистика'>
            <ProfessionSectionStats match={match} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  profession: selectProfession,
  sections: selectSections,
});

const mapDispatchToProps = (dispatch) => ({
  setSections: (sections) => dispatch(setSections(sections)),
  setProfessions: (professions) => dispatch(setProfessions(professions)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfessionPage);

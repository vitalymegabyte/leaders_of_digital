import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSections } from '../redux/sections/sections.actions';
import { selectSections } from '../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import SectionsTable from './sections_table/sections_table.component';
import { Tab, Tabs, Container } from 'react-bootstrap';
import SectionStats from '../components/sections_stats/section_stats.component';

const Main = ({ setSections }) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASEURL}/section`)
      .then((response) => {
        console.log(response.data);
        setSections(response.data);
      });
  }, [setSections]);
  return (
    <>
      <Container>
        <Tabs defaultActiveKey='jobless' id='uncontrolled-tab-example'>
          <Tab eventKey='jobless' title='Данные'>
            <SectionsTable />
          </Tab>
          <Tab eventKey='home' title='Статистика'>
            <SectionStats />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setSections: (sections) => dispatch(setSections(sections)),
});
export default connect(null, mapDispatchToProps)(Main);

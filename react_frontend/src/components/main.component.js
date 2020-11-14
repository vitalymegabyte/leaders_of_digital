import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSections } from '../redux/sections/sections.actions';
import { selectSections } from '../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import SectionsTable from './sections_table/sections_table.component';
import { Tab, Tabs, Container } from 'react-bootstrap';

const Main = ({ setSections }) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASEURL}/section`)
      .then((response) => {
        console.log(response.data);
        setSections(response.data);
      });
  });
  return (
    <>
      <Container>
        <Tabs defaultActiveKey='jobless' id='uncontrolled-tab-example'>
          <Tab eventKey='jobless' title='Безработные'>
            <SectionsTable />
          </Tab>
          <Tab eventKey='home' title='Home'>
            Хоум
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

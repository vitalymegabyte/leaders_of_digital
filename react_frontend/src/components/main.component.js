import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSections } from '../redux/sections/sections.actions';
import { selectSections } from '../redux/sections/sections.selectors';
import { createStructuredSelector } from 'reselect';
import SectionsTable from './sections_table/sections_table.component';

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
      <SectionsTable />
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setSections: (sections) => dispatch(setSections(sections)),
});
export default connect(null, mapDispatchToProps)(Main);

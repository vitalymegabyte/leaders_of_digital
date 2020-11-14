import styled from 'styled-components';

import { Table } from 'react-bootstrap';

export const StyledTable = styled(Table).attrs((props) => ({
  striped: true,
  bordered: true,
}))`
  text-align: left;
`;

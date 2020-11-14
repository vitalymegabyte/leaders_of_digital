import styled from 'styled-components';

import { Table } from 'react-bootstrap';

export const StyledTable = styled(Table).attrs((props) => ({
  bordered: true,
}))`
  text-align: left;
`;

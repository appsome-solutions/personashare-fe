import React, { FunctionComponent } from 'react';

import styled from 'styled-components';
import { Row, Col } from 'antd';
import { media } from 'global/RWD';

const LinksWrapper = styled.div`
  min-height: 242px;
  display: flex;

  align-items: center;
  background-color: ${props => props.theme.colors.utils.text.dark};

  ${media.xs`
    padding: 57px 0 10px 0;
  `}
  ${media.md`
    padding: 0;
  `}
`;

const StyledRow = styled(Row)`
  width: 100%;
`;

const StyledCol = styled(Col)`
  ${media.xs`
    margin-bottom: 47px;
  `}
  ${media.md`
    margin: 0;
  `}
`;

export const Links: FunctionComponent = () => {
  return (
    <LinksWrapper>
      <StyledRow>
        <StyledCol md={6} />
      </StyledRow>
    </LinksWrapper>
  );
};

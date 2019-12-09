import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Icon } from 'components/Icon/Icon';
import QrCodeNavSvg from 'assets/qr-code-nav.svg';

const StyledRow = styled(Row)`
  background-color: white;
  height: 48px;
`;

export const StickyNavigation = () => {
  return (
    <StyledRow type="flex" justify="center">
      <Col span={8}>
        col-4
        <Icon svgLink={QrCodeNavSvg} color={'black'} />
      </Col>
      <Col span={8}>col-4</Col>
      <Col span={8}>col-4</Col>
    </StyledRow>
  );
};

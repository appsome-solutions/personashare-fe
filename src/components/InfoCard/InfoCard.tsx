import React, { FC, ReactChild } from 'react';
import styled from 'styled-components';

import InfoIcon from 'assets/info.svg';
import { Icon } from 'components/Icon';
import { BoxProps } from 'components/FlexBox/FlexBox';
import { Card } from 'components/Card/Card';

const TopBar = styled.div`
  color: ${props => props.theme.colors.utils.text.light};
  background-color: ${props => props.theme.colors.main.primary};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 4px 0 0;
`;

const CardBody = styled.div`
  padding: 17px;
`;

type InfoCardProps = {
  title: ReactChild;
};

const ChildrenWrapper = styled.span(props => props.theme.typography.body1);

export const InfoCard: FC<InfoCardProps & BoxProps> = ({ children, title, ...rest }) => (
  <Card {...rest}>
    <TopBar>
      <Icon svgLink={InfoIcon} cursor="normal" color="white" />
    </TopBar>
    <CardBody>
      <h6>{title}</h6>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </CardBody>
  </Card>
);

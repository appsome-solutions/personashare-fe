import React, { FC, ReactChild } from 'react';
import styled from 'styled-components';

import InfoIcon from 'assets/info.svg';
import { Icon } from 'components/Icon';

const TopBar = styled.div`
  color: ${props => props.theme.colors.utils.text.light};
  background-color: ${props => props.theme.colors.main.primary};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 4px 0 0;
`;

const CardWrapper = styled.div`
  background-color: ${props => props.theme.colors.utils.background.light};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-bottom: 173px;
`;

const CardBody = styled.div`
  padding: 17px;
`;

type InfoCardProps = {
  title: ReactChild;
};

const ChildrenWrapper = styled.span(props => props.theme.typography.body1);

export const InfoCard: FC<InfoCardProps> = ({ children, title }) => (
  <CardWrapper>
    <TopBar>
      <Icon svgLink={InfoIcon} cursor="normal" color="white" />
    </TopBar>
    <CardBody>
      <h6>{title}</h6>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </CardBody>
  </CardWrapper>
);

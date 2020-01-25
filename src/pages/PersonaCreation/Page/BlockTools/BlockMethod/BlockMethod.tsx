import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';

const BlockMethodWrapper = styled.div`
  border-top: 1px solid ${props => props.theme.colors.functional.disabled};
  border-bottom: 1px solid ${props => props.theme.colors.functional.disabled};
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  margin: 12px;
  border: 1px solid ${props => props.theme.colors.functional.disabled};

  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

type BlockMethodType = {
  svgLink: string;
  title: string;
};

export const BlockMethod = ({ svgLink, title }: BlockMethodType) => {
  return (
    <BlockMethodWrapper>
      <IconWrapper>
        <Icon svgLink={svgLink} />
      </IconWrapper>
      {title}
    </BlockMethodWrapper>
  );
};

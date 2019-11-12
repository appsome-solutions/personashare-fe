import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Copyrights } from './Copyrights/Copyrights';
import { Links } from './Links/Links';

const FooterWrapper = styled.div`
  height: 322px;
  background-color: ${props => props.theme.colors.utils.text.dark};
  color: ${props => props.theme.colors.utils.text.light};

  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const Footer: FunctionComponent = () => (
  <FooterWrapper>
    <Links />
    <Copyrights />
  </FooterWrapper>
);

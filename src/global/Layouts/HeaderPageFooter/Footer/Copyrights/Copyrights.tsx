import React, { FunctionComponent } from 'react';
import { useCompanyData } from './useCompanyData';

import styled from 'styled-components';
const CopyrightsWrapper = styled.div`
  height: 79px;
  border-top: 1px solid ${props => props.theme.colors.utils.border.dark};
  background-color: ${props => props.theme.colors.utils.text.dark};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppsomeLink = styled.a`
  margin-left: 5px;
  color: inherit;
`;

export const Copyrights: FunctionComponent = () => {
  const { href, companyName } = useCompanyData(`mailto:${process.env.REACT_APP_COPYRIGHT_EMAIL}`, 'Appsome');

  return (
    <CopyrightsWrapper>
      © {new Date().getFullYear()}, made with ♥ by <AppsomeLink href={href}>{companyName}</AppsomeLink>.
    </CopyrightsWrapper>
  );
};

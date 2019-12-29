import React from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/lib/input';
import LockIcon from 'assets/lock.svg';
import { Icon as IconComponent } from 'components/Icon';

export const Container = styled.span`
  margin: 0;
  padding: 0;
  background: ${props => props.theme.colors.utils.background.light};
  border: 1px solid ${props => props.theme.colors.utils.border.mid};
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  display: inline-block;
  width: 100%;
  text-align: start;
`;

const Icon = styled(IconComponent)`
  position: absolute;
  top: 50%;
  right: 12px;
  z-index: 2;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  background-color: ${props => props.theme.colors.utils.border.mid};
`;

export const Input = styled(AntInput.Password)`
  && {
    padding-right: 30px;
  }
`;

export const PasswordInput = ({ className, ...rest }: InputProps) => (
  <Container className={className}>
    <Icon svgLink={LockIcon} />
    <Input {...rest} visibilityToggle={false} />
  </Container>
);
